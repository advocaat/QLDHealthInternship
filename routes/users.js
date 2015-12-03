var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/jdhj/ha',function(req, res, next){
 res.render('homepage', {something: "lhdsfkh"})
});	
module.exports = router;
