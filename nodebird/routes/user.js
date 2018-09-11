const express=require('express');
const {isLoggedIn, isNotLoggedIn}=require('./middlewares');
const router=express.Router();

const {Post, Hashtag, User}=require('../models');

router.post('/:id/follow',isLoggedIn,async (req,res,next)=>{
    try{
        // console.log('user.js');
        const user=await User.find({where:{id:req.user.id}});
        await user.addFollowing(parseInt(req.params.id,10));
        res.send('success');
    }
    catch(e){
        console.error(e);
        next(e);
    }
});
router.post('/:id/unfollow',isLoggedIn,async (req,res,next)=>{
    try{
        // console.log('user.js');
        const user=await User.find({where:{id:req.user.id}});
        // await user.addFollowing(parseInt(req.params.id,10));
        await user.removeFollowing(parseInt(req.params.id,10));
        res.send('success');
    }
    catch(e){
        console.error(e);
        next(e);
    }
});

module.exports=router;