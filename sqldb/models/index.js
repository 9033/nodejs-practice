const db={};

const Sequelize = require('sequelize');
db.sequelize=new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: 'db.sqlite',
    // logging: false,
});

/*
user 1:N car
*/

//user테이블 설정.
const defineUser={
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    address:{
        type:Sequelize.STRING,        
    },
    comment:{
        type:Sequelize.STRING,        
    },
};
db.user=db.sequelize.define('user',defineUser,{
    timestamps:true,
    pananoid:true//set using deleteAt
});

//car테이블 설정.
const defineCar={
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    comment:{
        type:Sequelize.STRING,        
    },
};
db.car=db.sequelize.define('car',defineCar,{
    timestamps:true,
    pananoid:true//set using deleteAt
});

//relationship
const relationship={}
relationship["1:N"]=(db1,sourceKey,dbN,foreignKey)=>{
    db1.hasMany(dbN,{foreignKey,sourceKey});
    dbN.belongsTo(db1,{foreignKey,targetKey:sourceKey});    
}
relationship["1:1"]=(db1,sourceKey,db2,foreignKey)=>{
    db1.hasOne(db2,{foreignKey,sourceKey});
    db2.belongsTo(db1,{foreignKey,targetKey:sourceKey});    
}
relationship["N:M"]=(dbN,dbM,through)=>{
    dbN.belongsToMany(dbM,{through});
    dbM.belongsToMany(dbN,{through});    
}

relationship["1:N"](db.user,'id',db.car,'user_id');

module.exports = db;
