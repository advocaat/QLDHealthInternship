var mongoose = require('mongoose');
module.exports = mongoose.model('User', {
    local: {
        id: String,
        username: String,
        password: String,
        email: String,
        firstName: String,
        lastName: String
    }
});