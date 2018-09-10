const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require( '../config/config') [env];
const db = {};

const sequelize=new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User=require('./user')(sequelize, Sequelize);
db.Post=require('./post')(sequelize, Sequelize);
db.Hashtag=require('./hashtag')(sequelize, Sequelize);

//users:posts 1:N
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

//posts:hashtags N:M, by postHashtags
db.Post.belongsToMany(db.Hashtag,{through:'postHashtag'});
db.Hashtag.belongsToMany(db.Post,{through:'postHashtag'});

//users:users N:M, by Follows
db.User.belongsToMany(db.User,{
  foreignKey:'followingId',
  as:'Followers',
  through:'Follow',
});
db.User.belongsToMany(db.User,{
  foreignKey:'followerId',
  as:'Followings',
  through:'Follow',
});

module.exports = db;
