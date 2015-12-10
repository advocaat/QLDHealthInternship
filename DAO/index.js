var mongoose = require('mongoose');
var Notice = require('../models/Notice');
var Video = require('../models/Video');

var functions = {};

var mongoURI = "mongodb://localhost/myData";
var dbConnect = mongoose.connect(mongoURI);
functions.conn = mongoose.connection;

functions.insert = function(tableName, insertObject){
    var timeslimer = new Date().getTime();
    if(tableName === "notices"){
        var newNotice = new Notice();
        newNotice.noticeTitle = insertObject.noticeTitle;
        newNotice.noticeContent = insertObject.noticeContent;
        newNotice.noticeAuthor = insertObject.noticeAuthor;
        newNotice.noticeTimestamp = timeslimer;
        newNotice.noticeFeatured = insertObject.noticeFeatured;
        newNotice.save(function(err){
            if(err){
                throw err;
            }
            console.log("Inserted New Notice");
        });
    }
};

functions.pullTable = function(callback){
    var sort = {'noticeTimestamp': -1};
    Notice.find({}, function(err, notices){
        if(err){
            throw err;
        }



        callback(notices);
    }).sort(sort);
};

functions.pullVids = function(callback){
    var sort = {'_id': -1};
    Video.find({}, function(err, videos){
        if(err){
            throw err;
        }
        console.log("YOURE HERE");
        callback(videos)
    }).sort(sort);
};

functions.pullFeatured = function(callback){
    var docs = {};
    Video.find({videoFeatured: true}, function(err, vidDocs){
        if(err){
            throw err;
        }
        docs.myVidArray = vidDocs;
    });
    Notice.find({noticeFeatured: true}, function(err, noteDocs){
        if(err){
            throw err;
        }
        docs.myNoticeArray = noteDocs;
        callback(docs);
    });

};
module.exports = functions;