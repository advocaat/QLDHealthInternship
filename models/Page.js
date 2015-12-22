var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var pageSchema = new Schema({
    pageName: String,
    pageTitle: String,
    pageContent: Object,
    footNote: String

});

var collectionName = "myData";

module.exports = mongoose.model('Page', pageSchema);