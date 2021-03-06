const express=require('express');
const router=express.Router();

// const passport=require('passport');
// const bcrypt=require('bcrypt');
const middlewares=require('./middlewares');
const models=require('../models');

const jwt=require('jsonwebtoken');

router.use(middlewares.deprecated);
router.post('/token', async (req,res)=>{
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
                expiresIn:'1m',
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

router.get('/test', middlewares.verifyToken,(req,res)=>{
    res.json(req.decoded);
});

router.get('/posts/my', middlewares.verifyToken,async (req,res)=>{
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

router.get('/posts/hashtag/:title', async (req,res,next)=>{
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
