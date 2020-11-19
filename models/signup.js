var mongoose = require('mongoose');

const SignUpSchema = mongoose.Schema({
    username: String,
    password: String,
    gmail: String,
})

module.exports = mongoose.model('signup', SignUpSchema);