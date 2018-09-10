const mongoose=require('mongoose');

module.exports=()=>{
    const connect=()=>{
        if(process.env.NODE_ENV!=='production'){
            mongoose.set('debug',true);
        }
        mongoose.connect('mongodb://root:rootrootroot1@localhost:27017/admin',{
            dbName:'nodejs',
        },(e)=>{
            if(e){
                console.log('connect error',e);
            }
            else{
                console.log('connected');
            }
        });
    };
    connect();
    mongoose.connection.on('error',(e)=>{
        console.error('db connect error',e);
    });
    mongoose.connection.on('disconnected',()=>{
        console.log('disconnected, try connect to db');
        connect();
    });
    require('./user');
    require('./comment');
};