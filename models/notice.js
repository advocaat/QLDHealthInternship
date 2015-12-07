var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var noticeSchema = new Schema({
    noticeTitle: String,
    noticeContent: String,
    noticeAuthor: String,
    noticeTimestamp: Number
});
var collectionName = "myData";

module.exports = mongoose.model('Notice', noticeSchema);