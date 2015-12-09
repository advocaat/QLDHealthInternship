var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var DAO = require('../DAO');
var noticeHandler = require('../control/noticeHandler.js');

router.get("/manifest.appcache", function (req, res) {
    res.set("Content-Type", "text/cache-manifest");
    res.set("Cache-Control", "no-store, no-cache");
    res.set("Expires", "-1");
    res.sendFile("/public/manifest.appcache", {root: __dirname});
});


router.get('/', function(req, res, next) {

        res.render('index');


});



router.get('/notice', function(req, res, next) {
    DAO.pullTable(function(myDocs){
        console.log("slutbird " + JSON.stringify(myDocs[0]));
        res.render('notice', {myArray : myDocs});
    });
});




router.get('/upload', function(req, res, next) {
    res.render('upload');
});

router.post('/upload', function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields){
    if(err){
      throw err;
    }
      noticeHandler.handleAddNotice(fields);
      res.redirect('/');
  })
});



module.exports = router;
