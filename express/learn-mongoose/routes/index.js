var express = require('express');
var router = express.Router();


var User=require('../schemas/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({})
  .then(users=>{
    res.render('mongoose',{users})
  })
  .catch(e=>{
    console.error(e);
    next(e);
  });
});

module.exports = router;
