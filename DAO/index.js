var mongoose = require('mongoose');
var Notice = require('../models/Notice');
var Video = require('../models/Video');
var Page = require('../models/Page');

var functions = {};

var mongoURI = "mongodb://localhost/myData";
//var mongoURI = "mongodb://@ds027509.mongolab.com:27509/qldhealth";
var dbConnect = mongoose.connect(mongoURI);
functions.conn = mongoose.connection;

functions.insertNotice = function (tableName, insertObject) {
    var myTime = new Date().getTime();

    var newNotice = new Notice();
    newNotice.noticeTitle = insertObject.noticeTitle;
    newNotice.noticeContent = insertObject.noticeContent;
    newNotice.noticeAuthor = insertObject.noticeAuthor;
    newNotice.noticeTimestamp = myTime;
    newNotice.noticeFeatured = insertObject.noticeFeatured;
    if(insertObject.noticeImage === ""){
        newNotice.noticeImage === null;
    }else {
        newNotice.noticeImage = "/images/" + insertObject.noticeImage;
    }
    newNotice.save(function (err) {
        if (err) {
            throw err;
        }
        console.log("Inserted New Notice");
    });
};

functions.insertVideo = function(insertObject){
    var myTime = new Date().getTime();
    var newVideo = new Video();
    newVideo.videoTitle = insertObject.videoTitle;
    newVideo.videoURL = "/images/"+ insertObject.videoURL;
    newVideo.videoBlurb = insertObject.videoBlurb;
    newVideo.videoFeatured = insertObject.videoFeatured;
    newVideo.videoTimestamp = myTime;
    newVideo.save(function (err) {
        if (err) {
            throw err;
        }
        console.log("Inserted New Notice");
    });
}

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
            doc.footNote = pageObj.footNote;
            doc.save();
        } catch (err) {
            var page = new Page();
            page.pageName = pageObj.pageName;
            page.pageTitle = pageObj.pageTitle;
            page.pageContent = pageObj.pageContent;
            page.footNote = pageObj.footNote;
            page.save();
        }
    });
};

functions.deletePage = function(pageName){
    Page.find({ pageName : pageName }).remove().exec();
};

functions.deleteNotice = function(noticeTitle){
    Notice.find({ noticeTitle : noticeTitle}).remove().exec();
};

functions.deleteVideo = function(videoTitle){
    console.log("fsdsdsdf "+ videoTitle );
    Video.find({videoTitle: videoTitle}).remove().exec();
};


functions.getNameList = function(callback){
    Page.find({}, function(err, names){
        if(err){
            throw err;
        }
        var nameArray = [];
        names.forEach(function(name){
            nameArray.push(name.pageName);
        });
        callback(nameArray);
    });
}

//functions.getNoticeNames = function(callback){
//    Page.find({}, function(err, names){
//        if(err){
//            throw err;
//        }
//        var nameArray = [];
//        names.forEach(function(name){
//            nameArray.push(name.noticeTitle);
//        });
//        callback(nameArray);
//    });
//}


//functions.getVideoNames = function(callback){
//    Page.find({}, function(err, names){
//        if(err){
//            throw err;
//        }
//        var nameArray = [];
//        names.forEach(function(name){
//            nameArray.push(name.videoTitle);
//        });
//        callback(nameArray);
//    });
//}

functions.getAllNameLists = function(callback){
    var notices = [];
    var videos = [];
    var nameArray = [];
    Page.find({}, function(err, names){
        if(err){
            throw err;
        }

        names.forEach(function(name){
            nameArray.push(name.pageName);
        });

    });
   Video.find({}, function(err, names){
        if(err){
            throw err;
        }

        names.forEach(function(name){
            videos.push(name.videoTitle);
        });

    });
    Notice.find({}, function(err, names){
        if(err){
            throw err;
        }
        names.forEach(function(name){
            notices.push(name.noticeTitle);
        });
        callback(nameArray, videos, notices);
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
    });
    Page.find({}, function(err, names) {
        if (err) {
            throw err;
        }
        docs.nameArray = [];
        docs.titleArray = [];
        docs.footArray = [];
        names.forEach(function (name) {
            docs.nameArray.push(name.pageName);
            docs.titleArray.push(name.pageTitle);
        });
        callback(docs);
    });
};
module.exports = functions;