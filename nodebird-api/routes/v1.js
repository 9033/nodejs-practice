const express=require('express');
const router=express.Router();

// const passport=require('passport');
// const bcrypt=require('bcrypt');
const middlewares=require('./middlewares');
const models=require('../models');

const jwt=require('jsonwebtoken');


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

module.exports=router;
