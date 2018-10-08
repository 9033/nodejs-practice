const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require( path.join(__dirname,'..','config','config.json')) [env];
const db = {};

const sequelize=new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User=require('./user')(sequelize, Sequelize);
db.Good=require('./good')(sequelize, Sequelize);
db.Auction=require('./auction')(sequelize, Sequelize);

db.Good.belongsTo(db.User,{as:'owner'});
db.Good.belongsTo(db.User,{as:'sold'});

db.User.hasMany(db.Auction);
db.Good.hasMany(db.Auction);

db.Auction.belongsTo(db.User);
db.Auction.belongsTo(db.Good);

// sequelize.query("SELECT * FROM goods").spread((r,m)=>{
//     console.log(r);
//     console.log(m);
//     // sequelize.close();
// });

// sequelize.transaction(t=>{
//     return db.User.find({},{transaction:t})
//     .then(r=>{
//         console.log(r.id,r.email,r.nick);
//         return db.User.find({},{transaction:t}).then(r=>{
//             console.log(r.id,r.email,r.nick);
//             sequelize.close();
//         });        
//     });
// });
// setTimeout(() => {
//     sequelize.close(); 
// }, 3000);
// console.log(a);

f=async ()=>{
    // const users=await db.User.findAll({});
    // users.forEach(user => {
    //     console.log(user.email,user.nick,user.money);    
    // });    
    try{
        const t=await sequelize.transaction(async t=>{
            const u=await db.User.findAll({},{transaction:t});
            const g=await db.Good.findAll({},{transaction:t});
            return {u,g};
        });
        // await t.commit();
        t.u.forEach(user => {
            console.log(user.email,user.nick,user.money);    
        });    
        t.g.forEach(good => {
            console.log(good.name,good.price,good.createdAt);    
        });    
    }
    catch(e){
        // await 
    }

    sequelize.close();
};
f();
