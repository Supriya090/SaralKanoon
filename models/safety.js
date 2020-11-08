var mongoose = require('mongoose');

const SafetyTipsSchema = mongoose.Schema({
    title: String,
    image: String,
})

module.exports = mongoose.model('SafetyTips', SafetyTipsSchema);