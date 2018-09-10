var express = require('express');
var router = express.Router();

var User=require('../schemas/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({})
  .then(users=>{
    res.json(users);
  })
  .catch(e=>{
    console.error(e);
    next(e);
  });
});

router.post('/', function(req, res, next) {
  const user = new User({
    name:req.body.name,
    age:req.body.age,
    married:req.body.married,
  });
  user.save()
  .then(result=>{
    console.log(result);
    res.status(201).json(result);    
  })
  .catch(e=>{
    console.error(e);
    next(e);
  });
});

module.exports = router;
