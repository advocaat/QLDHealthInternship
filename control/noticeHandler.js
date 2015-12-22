var DAO = require('../DAO');
var updateMani = require('./updateManifest');
functions = {};

functions.handleAddNotice = function(fields){
  DAO.insertNotice('notices', fields);
  updateMani();
};

functions.handleAddVideo = function(fields){
  DAO.insertVideo(fields);
  updateMani();
};

module.exports = functions;