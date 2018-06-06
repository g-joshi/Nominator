const mongoose = require('mongoose');

const NominationSchema = mongoose.Schema({
    status: String,
    name: String,
    emailId: String,
    supervisorName: String,
    supervisorEmailId: String,
    homeLocation: String,
    currentTitle: String,
    nextTitle: String,
    coreCapabilities: String,
    projectName: String,
    businessImpact: String,
    projectFeedback: String,
    performanceSummary: String,
    developmentAreas: String,
    communityContributions: String,
    flightRisk: String,
    anyOtherHistory: String,
    timeInTitle: String,
    isDifferentiatorComment: String,
    whatWillChange: String,
    discussionPoints: String,
    priority: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Nomination', NominationSchema);