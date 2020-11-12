var mongoose = require('mongoose');

const DomesticViolenceSchema = mongoose.Schema({
    title: String,
    actName: String,
    definition: [Object],
    lawText: [String],
    filingComplaintText: [String],
    protectionText: [String],
    cameraText: [String],
    perpetratorExpensesText: [String],
    compensationText: [String],
    serviceCentreText: [String],
    serviceFundText: [String],
    penaltyText: [String],
    limitation: [String],
    organization: [Object],
    tags:[String]
})

module.exports = mongoose.model('SingleCategory', DomesticViolenceSchema);
