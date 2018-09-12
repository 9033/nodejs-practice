const express=require('express');
const router=express.Router();
const cors=require('cors');
const url=require('url');
// const passport=require('passport');
// const bcrypt=require('bcrypt');
const middlewares=require('./middlewares');
const models=require('../models');

const jwt=require('jsonwebtoken');

// router.use(cors());
router.use(async(req,res,next)=>{
    const domain = await models.Domain.find({
        where:{host:url.parse(req.get('origin')).host},
    });
    if(domain){
        cors({origin:req.get('origin')})(req,res,next);
    }
    else{
        next();
    }
});
router.post('/token', middlewares.apiLimiter,async (req,res)=>{
    const {clientSecret}=req.body;
    try{
        const domain=await models.Domain.find({
            where:{clientSecret},
            include:{
                model:models.User,
                attribute:['nick','id'],
            },            
        });
        if(!domain){
            return res.status(401).json({
                code:401,
                message:'등록되지 않은 도메인 입니다. 먼저 도메인을 등록하라고.',
            });
        }
        const token=jwt.sign({
                id:domain.user.id,
                nick:domain.user.nick,            
            }
            ,process.env.JWT_SECRET
            ,{
                expiresIn:'10m',
                issuer:'nodebird',
            }
        ); 
        console.log('token issued')
        return res.json({
            code:200,
            message:'토큰이 발급되었습니다.',
            token,
        });        
    }
    catch(e){
        console.error(e);
        return res.status(500).json({
            code:500,
            message:'서버 에러',
        });
    }
});

router.get('/test', middlewares.verifyToken,middlewares.apiLimiter,(req,res)=>{
    res.json(req.decoded);
});

router.get('/posts/my', middlewares.apiLimiter,middlewares.verifyToken,async (req,res)=>{
    models.Post.findAll({where:{userId:req.decoded.id}})
    .then((posts)=>{
        console.log(posts);
        res.json({
            code:200,
            payload:posts,
        });
    })
    .catch(e=>{
        console.error(e);
        return res.status(500).json({
            code:500,
            message:'서버 에러',
        });
    });
});

router.get('/posts/hashtag/:title', middlewares.verifyToken,middlewares.apiLimiter,async (req,res)=>{
    try{
        const hashtag=await models.Hashtag.find({ where:{title:req.params.title}});
        if(!hashtag){
            return res.status(404).json({
                code:404,
                message:'검색 결과가 없음.',
            });
        }
        //let posts=[];
        const posts=await hashtag.getPosts();
        return res.json({
            code:200,
            payload:posts,
        });
    }
    catch(e){
        console.error(e);
        return res.status(500).json({
            code:500,
            message:'서버 에러',
        });
    };
});

module.exports=router;
