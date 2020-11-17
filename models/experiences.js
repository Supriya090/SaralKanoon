var mongoose = require('mongoose');

const ExperiencesSchema = mongoose.Schema({
    content: String,
    tag: [String],
    anonymous: Boolean,
})

module.exports = mongoose.model('experiences', ExperiencesSchema);