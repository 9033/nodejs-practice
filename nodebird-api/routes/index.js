const express=require('express');
// const {isLoggedIn, isNotLoggedIn}=require('./middlewares');
const router=express.Router();
const {Domain,User}=require('../models');

const uuidv4=require('uuid/v4');

router.get('/',(req,res, next)=>{
    User.find({
        where:{id:req.user&&req.user.id},
        include:{model:Domain},
    })
    .then(user=>{
        res.render('login',{
            user,
            loginError:req.flash('loginError'),
            doamins:user&&user.doamins,
        })
    })
    .catch(e=>{
        console.error(e);
        next(e);
    });
});

router.post('/domain',(req,res, next)=>{
    Domain.create({
        userId:req.user.id,
        host:req.body.host,
        type:req.body.type,
        clientSecret:uuidv4(),
    })
    .then(()=>{
        res.redirect('/');
    })
    .catch(e=>{
        console.error(e);
        next(e);
    });
});
module.exports=router;