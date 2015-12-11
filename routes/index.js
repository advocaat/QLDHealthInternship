var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var DAO = require('../DAO');
var updateHandler = require('../control/updateHandler');
var noticeHandler = require('../control/noticeHandler.js');


router.get('/', function (req, res, next) {

    DAO.pullFeatured(function (data) {
        res.render('index', data);
    });

});


router.get('/notice', function (req, res, next) {
    DAO.pullTable(function (myDocs) {
        //myDocs = inverter(myDocs);
        res.render('notice', {myNoticeArray: myDocs});
    });
});

router.get('/trainning', function (req, res, next) {
    DAO.getPage("Training", function (pageDat) {
        res.render('trainning', {data: pageDat});
    });
});
    router.get('/contact', function (req, res, next) {
        res.render('contact');

});

router.get('/about', function (req, res, next) {

    DAO.getPage("About", function (pageDat) {

        console.log("slutPuncher " + pageDat.pageContent.block1);
        res.render('about', {fucker: pageDat});
    });
});


router.get('/upload', function (req, res, next) {
    res.render('upload', {p: ["Home", "Info", "Educate", "About", "Video", "Notice", "Testicles"]});
});

router.get('/upload/:name', function (req, res, next) {
    console.log("fuck cunt  " + req.params.name);
    DAO.pullPageInfo(req.params.name, function (data) {
        res.render('editPage', {dat: data});
    });
});

router.get('/video', function (req, res, next) {
    DAO.pullVids(function (myDocs) {
        res.render('viewer', {myVidArray: myDocs});
    });
});


router.post('/upload', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        if (err) {
            throw err;
        }
        noticeHandler.handleAddNotice(fields);
        res.redirect('/');
    })
});

router.post('/updater', function (req, res) {
    var form = formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        if (err) {
            throw err;
        }
        var sender = {};
        sender.pageName = fields.pageName;
        var pageContent = {};
        Object.keys(fields).forEach(function (objer) {
            if (objer !== "pageName") {
                pageContent[objer] = fields[objer];
            }

        })
        sender.pageContent = pageContent;
        console.log("docless martinez " + JSON.stringify(sender));
        updateHandler.handleUpdate(sender);
        res.redirect('/');
    })
});
module.exports = router;
