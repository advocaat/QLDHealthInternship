var DAO = require('../DAO');
var updateMani = require('./updateManifest');
functions = {};

functions.handleUpdate = function(pageObj){
    DAO.updatePage(pageObj);
    updateMani();
};

module.exports = functions;