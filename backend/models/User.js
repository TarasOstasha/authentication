var mongoose = require('mongoose');

module.exports = mongoose.model('UserData', {
    created: { type: Date, default: Date.now },
    lastChange: { type: Date, default: Date.now },
    name: String,
    email: String,
    password: String
})


