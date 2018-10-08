const models=require('./models');

module.exports=async ()=>{
    try{
        const yesterday=new Date();
        yesterday.setDate(yesterday.getDate()-1);
        const targets=await models.Good.findAll({
            where:{
                soldId:null,
                createdAt:{$lte:yesterday},
            },                
        });
        targets.forEach(async (target)=>{
            const success=await models.Auction.find({
                where:{goodId:target.id},
                order:[['bid','DESC']],
            });
            await models.Good.update({soldId:success.userId},{where:{id:target.id}});
            await models.User.update(
                {money:models.sequelize.literal(`money-${success.bid}`)},
                {where:{id:success.userId}}
            );
        });
    }
    catch(e){
        console.error(e);
        // next(e);
    }
};
