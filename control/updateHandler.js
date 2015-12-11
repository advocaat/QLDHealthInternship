var DAO = require('../DAO');
var updateMani = require('./updateManifest');
functions = {};

functions.handleUpdate = function(pageObj){
    console.log("OI OI " + JSON.stringify(pageObj));
    DAO.updatePage(pageObj);
    updateMani();
};

module.exports = functions;