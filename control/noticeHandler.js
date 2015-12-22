var DAO = require('../DAO');
var gridder = require('../DAO/gridder');
var updateMani = require('./updateManifest');
functions = {};

functions.handleAddNotice = function(fields){
  DAO.insertNotice('notices', fields);
  updateMani();
};

functions.handleAddVideo = function(fields){
  DAO.insertVideo(fields);
  updateMani();
}

module.exports = functions;