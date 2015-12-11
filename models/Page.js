var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var pageSchema = new Schema({
    pageName: String,
    pageContent: Object
});

var collectionName = "myData";

module.exports = mongoose.model('Page', pageSchema);