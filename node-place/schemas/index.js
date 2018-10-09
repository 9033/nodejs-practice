const mongoose=require('mongoose');

const { MONGO_ID, MONGO_PWD, NODE_ENV}=process.env;

const MONGO_URL=`mongodb://${MONGO_ID}:${MONGO_PWD}@localhost:27017/admin`;

module.exports=()=>{
    const connect=()=>{
        if(NODE_ENV!=='production'){
            mongoose.set('debug',true);
        }
        mongoose.connect(MONGO_URL,{
            dbName:'nodeplace',
        },e=>{
            if(e){
                console.error('db 연결 에러',e);
            }
            else{
                console.log('db 연결 성공');
            }
        });
    };
    connect();

    mongoose.connection.on('error',e=>{
        console.error('db 연결 에러',e);
    });
    mongoose.connection.on('disconnected',e=>{
        console.log('db 연결 재시도');
        connect();
    });

    require('./favorite');
    require('./history');
};
