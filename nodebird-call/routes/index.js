const express=require('express');
const router=express.Router();
const axios=require('axios');
const URL='http://localhost:8002/v2';

const request=async(req,api)=>{
    try{
        if(!req.session.jwt){
            const tokenResult=await axios.post(`${URL}/token`,{
                clientSecret:process.env.CLIENT_SECRET,
            });
            if(tokenResult.data&&tokenResult.data.code===200){
                console.log('토큰 받음');
                req.session.jwt=tokenResult.data.token;
            }
            else{
                return res.json(tokenResult.data);
            }
        }
        return await axios.get(`${URL}${api}`,{
            headers:{authorization:req.session.jwt},
        });        
    }
    catch(e){
        console.error(e);
        if(e.response.status<500){
            return e.response;
        }
        throw e;
    }
};

// router.get('/test', async (req,res,next)=>{
// });

router.get('/mypost', async(req,res,nest)=>{
    try{
        const result=await request(req, '/posts/my');
        res.json(result.data);
    }
    catch(e){
        console.error(e);
        next(e);
    }
});

router.get('/search/:hashtag', async(req,res,nest)=>{
    try{
        const result=await request(req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`);
        res.json(result.data);
    }
    catch(e){
        if(e.code){
            console.error(e);
            next(e);
        }
    }
});
router.get('/', async (req,res,next)=>{
    res.render('main',{key:process.env.CLIENT_SECRET});
});

module.exports=router;

