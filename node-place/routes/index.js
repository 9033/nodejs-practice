const express=require('express');
const util=require('util');

const googleMaps=require('@google/maps');

const History=require('../schemas/history');

const router=express.Router();
const googleMapsClient=googleMaps.createClient({
    key:process.env.PLACES_API_KEY,
});

router.get('/', (req,res)=>{
    res.render('index');
});
router.get('/autocomplete/:query', (req,res,next)=>{
    googleMapsClient.placesQueryAutoComplete({
        input:req.params.query,
        language:'ko',
    },(e,r)=>{
        if(e)return next(e);
        return res.json(r.json.predictions);
    });
});
router.get('/search/:query', async (req,res,next)=>{
    const googlePlaces=util.promisify(googleMapsClient.places);
    try{
        const history=new History({query:req.params.query});
        await history.save();
        const response=await googlePlaces({
            query:req.params.query,
            language:'ko',
        });
        res.render('result',{
            title:`${req.params.query} 검색 결과`,
            results:response.json.results,
            query:req.params.query,
            apikey:process.env.PLACES_API_KEY,
        });
    }
    catch(e){
        console.error(e);
        next(e);
    }
});

module.exports=router;
