const express=require('express');
const multer=require('multer');
const path=require('path');
const fs=require('fs');

const models=require('../models');
const midware=require('./middlewares');

const router=express.Router();

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
        await models.Good.create({
            ownerId:req.user.id,
            name,
            img:req.file.filename,
            price,
        });
        res.redirect('/');
    }
    catch(e){
        console.error(e);
        next(e);
    }
});

module.exports=router;