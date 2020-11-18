var mongoose = require('mongoose');

const SexualAssaultSchema = mongoose.Schema({
    title: String,
    actName: String,
    image: String,
    definition: [Object],
    lawText: [String],
    filingComplaintText: [String],
    compensationText: [String],
    punishmentText: [String],
    maritalRapeText:[String],
    maritalRapeProtectionText:[String],
    additionalPenaltyText:[String],
    limitation: [String],
    organization: [Object],
})

module.exports = mongoose.model('SexualAssault', SexualAssaultSchema);
