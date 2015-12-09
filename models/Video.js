var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var videoSchema = new Schema({
    videoTitle: String,
    videoURL: String,
    videoBlurb: String,
    videoTimestamp: Number
});
var collectionName = "myData";

module.exports = mongoose.model('Video', videoSchema);