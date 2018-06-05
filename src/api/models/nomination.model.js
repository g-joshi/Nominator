const mongoose = require('mongoose');

const NominationSchema = mongoose.Schema({
    name: String,
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
    priority: String,
    homeLocation: String,
    currentTitle: String,
    nextTitle: String,
	status: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Nomination', NominationSchema);