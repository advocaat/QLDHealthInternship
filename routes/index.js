var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var DAO = require('../DAO');
var updateHandler = require('../control/updateHandler');
var noticeHandler = require('../control/noticeHandler.js');
var fs = require('fs');
var path = require('path');

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect them to the login page
    res.redirect('/login');
};

module.exports = function (passport) {
    /* GET login page. */
    router.get('/login', function (req, res) {
        // Display the Login page with any flash message, if any
        res.render('login', {message: req.flash('loginMessage')});
    });
    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/upload',
        failureRedirect: '/',
        failureFlash: true
    }));

    /* GET Registration Page */
    router.get('/signup', function (req, res) {
        res.render('signUp', {message: req.flash('signupMessage'), okMessage: req.flash('successMessage')});
    });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/login',
        failureRedirect: '/',
        failureFlash: true
    }));

    /* Handle Logout */
    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });


    router.get('/', function (req, res, next) {
        var pages;
        DAO.getNameList(function (names) {
            pages = names;
        })
        DAO.pullFeatured(function (data) {
            res.render('index', {data: data});
        });
    });


    router.get('/notice', function (req, res, next) {
        DAO.pullTable(function (myDocs) {
            res.render('notice', {myNoticeArray: myDocs});
        });
    });
    //
    //router.get('/training', function (req, res, next) {
    //    DAO.pullPageInfo("Training", function (pageDat) {
    //        res.render('training', {data: pageDat});
    //    });
    //});

    router.get('/contact', function (req, res, next) {
        res.render('contact');

    });

    //router.get('/about', function (req, res, next) {
    //
    //    DAO.pullPageInfo("About", function (pageDat) {
    //        res.render('about', {data: pageDat});
    //    });
    //});


    router.get('/upload', isAuthenticated, function (req, res) {
        DAO.getAllNameLists(function (nameList, vidList, noticeList) {
            res.render('upload', {p: nameList, v: vidList, n: noticeList});
        });
    });

    router.get('/upload/:name', isAuthenticated, function (req, res, next) {
        DAO.pullPageInfo(req.params.name, function (data) {
            if (data.pageName === "none") {
                res.redirect('/upload');
            } else {
                res.render('editPage', {dat: data});
            }
        });

    });

    router.get('/notice/:name', function (req, res, next) {

        if (req.params.name == "notice") {
            res.redirect('/notice');
        }
        DAO.pullNotice(req.params.name, function (data) {
            res.render('postView', {dat: data});
        })
    });

    router.get('/video', function (req, res, next) {
        DAO.pullVids(function (myDocs) {
            res.render('viewer', {myVidArray: myDocs});
        });
    });

    router.post('/newpage', function (req, res, next) {
        console.log('eeeeeeeeeeeeee');
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields) {
            if (err) {
                throw err;
            }

            console.log("addy " + fields.add);
            var url = "/upload/" + fields.add;
            res.redirect(url);
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


    router.post('/uploadVid', function (req, res) {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields) {
            if (err) {
                throw err;
            }
            noticeHandler.handleAddVideo(fields);
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
            sender.pageTitle = fields.pageTitle;
            sender.footNote = fields.footNote;
            var pageContent = {};
            Object.keys(fields).forEach(function (objer) {
                if (objer !== "pageName" && objer !== "pageTitle" && objer !== "footNote") {
                    pageContent[objer] = fields[objer];
                }

            });

            sender.pageContent = pageContent;
            console.log("docless martinez " + JSON.stringify(sender));
            updateHandler.handleUpdate(sender);
            res.redirect('/upload');
        })
    });

    router.get('/:name', function (req, res, next) {
        try {
            DAO.pullPageInfo(req.params.name, function (pageDat) {
                res.render('whatever', {data: pageDat});
            });
        } catch (err) {
            res.redirect('/');
        }
    });

    router.post('/fileupload', function(req, res) {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);
            fstream = fs.createWriteStream('c:/Users/Adam/Documents/GitHub/QLDHealthInternship/uploads/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                res.redirect('/upload');
            });
        });
    });

    router.get('/images/:name', function (req, res) {
        res.sendFile(path.resolve('../uploads/' + req.params.name));
    });

    router.get('/del/:name', function(req, res){
        DAO.deletePage(req.params.name);
        res.redirect('/upload');
    });
    router.get('/delnotice/:name', function(req, res){
        DAO.deleteNotice(req.params.name);
        res.redirect('/upload');
    });

    router.get('/delvideo/:name', function(req, res){
        console.log("name "+ req.params.name);
        DAO.deleteVideo(req.params.name);
        res.redirect('/upload');
    });
    return router;
};