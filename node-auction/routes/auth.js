const express=require('express');
const router=express.Router();

const passport=require('passport');
const bcrypt=require('bcrypt');
const {isLoggedIn, isNotLoggedIn}=require('./middlewares');
const {User}=require('../models');

router.post('/join',isNotLoggedIn, async (req,res,next)=>{
    const {email, nick, password, money}=req.body;
    try{
        const exUser=await User.find({where:{email}});
        if(exUser){
            req.flash('joinError', '이미 가입함.');
            return res.redirect('/join');
        }
        const hash=await bcrypt.hash(password,12);
        await User.create({
            email,
            nick,
            password:hash,
            money,
        });       
        return res.redirect('/') ;
    }
    catch(e){
        console.error(e);
        return next(e);
    }
});

router.post('/login',isNotLoggedIn, async (req,res,next)=>{
    passport.authenticate('local', (authError, user, info)=>{
        if(authError){
            console.error('auth.js',authError);
            return next(authError);
        }
        if(!user){
            req.flash('loginError', info.message);
            return res.redirect('/');
        }
        return req.login(user, (loginError)=>{
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        })
    })(req, res,next);
});

router.get('/logout', isLoggedIn, (req,res)=>{
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

// router.get('/kakao', passport.authenticate('kakao'));

// router.get('/kakao/callback', passport.authenticate('kakao', {
//     failureRedirect:'/',
// }), (req, res)=>{
//     res.redirect('/');
// });

module.exports=router;

