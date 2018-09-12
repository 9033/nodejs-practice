const express=require('express');
const router=express.Router();
const axios=require('axios');

router.get('/test', async (req,res,next)=>{
    try{
        if(!req.session.jwt){
            const tokenResult=await axios.post('http://localhost:8002/v1/token',{
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
        const result=await axios.get('http://localhost:8002/v1/test',{
            headers:{authorization:req.session.jwt},
        });
        console.log('토큰 test');
        return res.json(result.data);
    }
    catch(e){
        console.error(e);
        if(e.response.status===419){
            return res.json(e.response.data);
        }
        return next(e);
    }

});

module.exports=router;

