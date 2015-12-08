var DAO = require('../DAO');
var gridder = require('../DAO/gridder');
functions = {};

functions.handleAddNotice = function(fields){
  DAO.insert('notices', fields);
};

module.exports = functions;