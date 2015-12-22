var DAO = require('../DAO');
var updateMani = require('./updateManifest');
functions = {};

functions.handleUpdate = function(pageObj){
    DAO.updatePage(pageObj);
    updateMani();
};
functions.noticeUpdate = function(noticeObj){
    DAO.updateNotice(noticeObj);
    updateMani();
};

functions.videoUpdate = function(videoObj){
    DAO.updateVideo(videoObj);
    updateMani();
};

module.exports = functions;