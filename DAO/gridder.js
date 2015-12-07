var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require('fs');
var DAO = require('../DAO');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs;
var conn = DAO.conn;

conn.once('open', function () {
    console.log('open');
   gfs = Grid(conn.db);
});

var functions = {};
functions.doGrid = function (file, fileName) {


            var writestream = gfs.createWriteStream({
                filename: fileName
            });
            fs.createReadStream(file).pipe(writestream);

            writestream.on('close', function (file) {
                // do something with `file`
                console.log(file.filename + 'Written To DB');
            });




    };

module.exports = functions;