var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var fs=require('fs');
var myenv;
try{
  myenv=fs.readFileSync('9033.env');
  myenv=JSON.parse(myenv );
}
catch(e){
  myenv={};
}

router.get('/skyred', function(req, res, next) {
  res.render('skyred', myenv);
});

module.exports = router;
