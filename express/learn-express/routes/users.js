var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/flash', function(req, res, next) {
  req.session.message='session msg';
  req.flash('message','flash msg');
  res.redirect('/users/flash/result');
});

router.get('/flash/result', function(req, res, next) {
  res.send(`${req.session.message} ${req.flash('message')}`);
});

module.exports = router;
