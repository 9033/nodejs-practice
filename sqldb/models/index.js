const db={};

const Sequelize = require('sequelize');
db.sequelize=new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: 'db.sqlite',
    // logging: false,
});

//user테이블 설정.
const defineUser={
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        unique: true,
    },
    comment:{
        type:Sequelize.STRING,        
    },
};
db.user=db.sequelize.define('user',defineUser,{
    //timestamps:true,
});

module.exports = db;
