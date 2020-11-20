var mongoose = require('mongoose');

const CyberLawSchema = mongoose.Schema({
    title: String,
    actName: String,
    image: String,
    definition: [Object],
    lawText: [String],
    filingComplaintText: [String],
    compensationText: [String],
    limitation: [String],
    organization: [Object],
})

module.exports = mongoose.model('CyberLaw', CyberLawSchema);