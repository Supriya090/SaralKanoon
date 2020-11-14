var mongoose = require('mongoose');

const SearchCardsSchema = mongoose.Schema({
    title: String,
    actName: String,
    description: String,
    tags: [String],
    link: String
})

module.exports = mongoose.model('SearchCards', SearchCardsSchema);