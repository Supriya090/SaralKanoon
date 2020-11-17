var mongoose = require('mongoose');

const IndividualSchema = mongoose.Schema({
    title: String,
    image: String,
    lawText: String,
    interpretedText: String,
})

module.exports = mongoose.model('SingleCategory', IndividualSchema);