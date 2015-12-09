var DAO = require('../DAO');
var gridder = require('../DAO/gridder');
var updateMani = require('./updateManifest');
functions = {};

functions.handleAddNotice = function(fields){
  DAO.insert('notices', fields);
  updateMani();
};

module.exports = functions;