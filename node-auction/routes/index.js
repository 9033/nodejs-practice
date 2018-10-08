const express=require('express');
const multer=require('multer');
const path=require('path');
const fs=require('fs');

const models=require('../models');
const midware=require('./middlewares');

const router=express.Router();

const schedule=require('node-schedule');

router.use((req,res,next)=>{
    res.locals.user=req.user;
    next();
});

router.get('/',async (req,res, next)=>{
    //res.render('index');
    try{
        const goods=await models.Good.findAll({where:{soldId:null}});
        res.render('main',{
            title:'node auction',
            goods,
            loginError:req.flash('loginError'),
        });
    }
    catch(e){
        console.error(e);
        next(e);
    }
});

router.get('/join',midware.isNotLoggedIn,(req,res)=>{
    res.render('join',{
        title:'회원가입 - Nodeauction',
        // user:req.user,
        joinError:req.flash('joinError'),
    });
});
router.get('/good',midware.isLoggedIn,(req,res)=>{
    res.render('good',{
        title:'상품등록 - Nodeauction',
        // user:req.user,
        // joinError:req.flash('joinError'),
    });
});
if( ! fs.existsSync('uploads') ){
    console.log('make directory "uploads"');
    fs.mkdirSync('uploads');
}
const upload=multer({
    storage:multer.diskStorage({
        destination(req, file, cb){
            cb(null,'uploads/');
        },
        filename(req,file,cb){
            const ext=path.extname(file.originalname);
            cb(null,path.basename(file.originalname, ext)+new Date().valueOf()+ext);            
        },        
    }),
    limits: {fileSize:5*1024*1024},
});
router.post('/good',midware.isLoggedIn,upload.single('img'),async (req,res,next)=>{
    try{
        const {name,price}=req.body;
        const good=await models.Good.create({
            ownerId:req.user.id,
            name,
            img:req.file.filename,
            price,
        });

        const end=new Date();
        end.setDate(end.getDate()+1);
        schedule.scheduleJob(end,async ()=>{
            const success=await models.Auction.find({
                where:{goodId:good.id},
                order:[['bid','DESC']],
            });
            await models.Good.update({soldId:success.userId},{where:{id:good.id}});
            await models.User.update(
                {money:models.sequelize.literal(`money-${success.bid}`)},
                {where:{id:success.userId}}
            );
        });

        res.redirect('/');
    }
    catch(e){
        console.error(e);
        next(e);
    }
});

router.get('/good/:id',midware.isLoggedIn,async (req,res,next)=>{
    try{
        const [good,auction]=await Promise.all([
            models.Good.find({
                where:{id:req.params.id},
                include:{
                    model:models.User,
                    as:'owner',
                },                
            }),
            models.Auction.findAll({
                where:{goodId:req.params.id},
                include:{model:models.User},
                order:[['bid','ASC']],
            }),            
        ]);
        res.render('auction',{
            title:good.name+' - Nodeauction',
            good,
            auction,
            auctionError:req.flash('auctionError'),
            // user:req.user,
            // joinError:req.flash('joinError'),
        });
    }
    catch(e){
        console.error(e);
        next(e);
    }
});

router.post('/good/:id/bid',midware.isLoggedIn,async (req,res,next)=>{
    try{
        const {bid, msg}=req.body;        
        const good=await models.Good.find({
            where:{id:req.params.id},
            include:{model:models.Auction},
            order:[[{model:models.Auction},'bid','DESC']],
        });
        if(good.price>bid){
            return res.status(403).send('시작 가격보다 높게 입찰해야 합니다');
        }
        if(new Date(good.createAt).valueOf()+(24*60*60*1000)<new Date()){
            return res.status(403).send('경매가 이미 종료되었습니다');
        }
        if(good.auctions[0]&&good.auctions[0].bid>=bid){
            return res.status(403).send('이전 가격보다 높게 입찰해야 합니다');
        }
        const result=await models.Auction.create({
            bid,
            msg,
            userId:req.user.id,
            goodId:req.params.id,
        });

        req.app.get('io').to(req.params.id).emit('bid',{
            bid:result.bid,
            msg:result.msg,
            nick:req.user.nick,
        });
        return res.send('ok');
    }
    catch(e){
        console.error(e);
        next(e);
    }
});

router.get('/list',midware.isLoggedIn,async (req,res,next)=>{
    try{
        const goods=await models.Good.findAll({
            where:{soldId:req.user.id},
            include:{model:models.Auction},
            order:[[{model:models.Auction},'bid','DESC']],
        });
        res.render('list',{
            title:'낙찰 목록 - NodeAuction',
            goods,
        });
    }
    catch(e){
        console.error(e);
        next(e);
    }
});

module.exports=router;
