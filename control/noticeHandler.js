var DAO = require('../DAO');
var gridder = require('../DAO/gridder');
functions = {};

functions.handleAddNotice = function(fields){
  console.log("fuckface" + JSON.stringify(fields));
  DAO.insert('notices', fields);
};


module.exports = functions;