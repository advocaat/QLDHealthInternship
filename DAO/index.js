var mongoose = require('mongoose');
var Notice = require('../models/Notice');
var Video = require('../models/Video');
var Page = require('../models/Page');

var functions = {};

var mongoURI = "mongodb://localhost/myData";
var dbConnect = mongoose.connect(mongoURI);
functions.conn = mongoose.connection;

functions.insert = function (tableName, insertObject) {
    var timeslimer = new Date().getTime();

    var newNotice = new Notice();
    newNotice.noticeTitle = insertObject.noticeTitle;
    newNotice.noticeContent = insertObject.noticeContent;
    newNotice.noticeAuthor = insertObject.noticeAuthor;
    newNotice.noticeTimestamp = timeslimer;
    newNotice.noticeFeatured = insertObject.noticeFeatured;
    newNotice.save(function (err) {
        if (err) {
            throw err;
        }
        console.log("Inserted New Notice");
    });
};

functions.pullTable = function (callback) {
    var sort = {'noticeTimestamp': -1};
    Notice.find({}, function (err, notices) {
        if (err) {
            throw err;
        }
        callback(notices);
    }).sort(sort);
};

functions.pullPageInfo = function (pageName, callback) {

    Page.findOne({'pageName': pageName}, function (err, page) {
        try {
            if (err) {
                throw err;
            }

            var keys = Object.keys(page.pageContent),
                i, len = keys.length;

            keys.sort();
            var pageContent = {};
            for (i = 0; i < len; i++) {
                pageContent[keys[i]] = page.pageContent[keys[i]];
            }
            page.pageContent = pageContent;
            callback(page);
        } catch (err) {
            callback({'pageName': pageName, 'pageTitle': "Bad URL", 'pageContent': {}})
        }
    });

    //var page = new Page();
    //page.name = pageName;
    //page.save(function(err){
    //    if(err){
    //        throw err;
    //    }

    //});

};


functions.pullNotice = function (id, callback) {
    console.log("id " + id);
    Notice.findOne({'_id': id}, function (err, data) {
        if (err) {
            throw err
        }
        console.log("id " + id);
        callback(data)

    });

};

functions.pullVids = function (callback) {
    var sort = {'_id': -1};
    Video.find({}, function (err, videos) {
        if (err) {
            throw err;
        }
        console.log("YOURE HERE");
        callback(videos)
    }).sort(sort);
};

functions.updatePage = function (pageObj) {

    Page.findOne({pageName: pageObj.pageName}, function (err, doc) {
        if (err) {
            throw err;
        }
        try {
            doc.pageName = pageObj.pageName;
            doc.pageTitle = pageObj.pageTitle;
            doc.pageContent = pageObj.pageContent;
            doc.save();
        } catch (err) {
            var page = new Page();
            page.pageName = pageObj.pageName;
            page.pageTitle = pageObj.pageTitle;
            page.pageContent = pageObj.pageContent;
            page.save(function (err) {
                throw err;
            });
        }
    });
};

functions.getNameList = function(callback){
    Page.find({}, function(err, names){
        if(err){
            throw err;
        }
        var nameArray = [];
        names.forEach(function(name){
            console.log("fcukskks" + JSON.stringify(name));
            nameArray.push(name.pageName);
        });
        callback(nameArray);
    });
}

functions.pullFeatured = function (callback) {
    var docs = {};
    Video.find({videoFeatured: true}, function (err, vidDocs) {
        if (err) {
            throw err;
        }
        docs.myVidArray = vidDocs;
    });

    Notice.find({noticeFeatured: true}, function (err, noteDocs) {
        if (err) {
            throw err;
        }
        docs.myNoticeArray = noteDocs;
        callback(docs);
    });

};
module.exports = functions;