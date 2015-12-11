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
    if (tableName === "notices") {
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
    }
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
    Page.findOne({ pageName: pageObj.pageName }, function (err, doc){
        doc.pageName = pageObj.pageName;
        doc.pageContent = pageObj.pageContent;
        doc.save();
    });
    //Page.update(
    //    {pageName: pageObj.pageName.trim()},
    //    {
    //        $set: {
    //            "pageName":  pageObj.pageName,
    //            "pageContent.block1": pageObj.pageContent.block1
    //        }
    //    }
   // );
console.log("cuntlee "+JSON.stringify(pageObj.pageContent));
};

functions.getPage = function(page, callback) {
    Page.find({pageName: page}, function(err, pageDat){
        if(err){
            throw err;
        }
        console.log("fart" + pageDat[0].pageName);
        callback(pageDat[0]);
    });
};


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