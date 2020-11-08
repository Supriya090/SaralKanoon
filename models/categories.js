var mongoose = require('mongoose');

const CategoriesSchema = mongoose.Schema({
    title: String,
    image: String,
})

module.exports = mongoose.model('Categories', CategoriesSchema);