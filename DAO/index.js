var mongoose = require('mongoose');
var Notice = require('../models/Notice');


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
        newNotice.noticeImage = insertObject.noticeImage;
        newNotice.save(function(err){
            if(err){
                throw err;
            }
            console.log("Inserted New Notice");
        });
    }
};

functions.pullTable = function(callback){
    Notice.find({}, function(err, notices){
        if(err){
            throw err;
        }
        callback(notices);
    });
};


module.exports = functions;