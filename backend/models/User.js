var mongoose = require('mongoose');

module.exports = mongoose.model('UserData', {
    email: String,
    password: String
})


