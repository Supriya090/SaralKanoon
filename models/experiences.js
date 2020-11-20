var mongoose = require('mongoose');

const ExperiencesSchema = mongoose.Schema({
    content: String,
    tag: [String],
    user: String
})

module.exports = mongoose.model('experiences', ExperiencesSchema);