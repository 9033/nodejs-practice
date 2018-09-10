const express=require('express');
const {isLoggedIn, isNotLoggedIn}=require('./middlewares');
const router=express.Router();
const {Post,User}=require('../models');

router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('profile',{title:'내 정보 - Nodebird',user:req.user});
});
router.get('/join',isNotLoggedIn,(req,res)=>{
    res.render('join',{
        title:'회원가입 - Nodebird',
        user:req.user,
        joinError:req.flash('joinError'),
    });
});
router.get('/',(req,res)=>{
    console.log('page.js');
    Post.findAll({
        include:{
            model:User,
            attributes:['id','nick'],
        },
        order:[['createdAt', 'DESC'],],
    })
    .then((posts)=>{
        res.render('main',{
            title:'Nodebird',
            twits:posts,        
            user:req.user,
            loginError:req.flash('loginError'),
        });
    })
    .catch(e=>{
        console.error('page.js',e);
        next(e);
    });
});


module.exports=router;