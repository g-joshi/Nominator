const Nomination = require('../models/nomination.model.js');

// Create and Save a new Nomination
exports.create = (req, res) => {
	// Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "User name can not be empty"
        });
    }

    // Create a Nomination
    const nominee = new Nomination({
        name: req.body.name,
        emailId: req.body.emailId,
        coreCapabilities: req.body.coreCapabilities,
        projectName: req.body.projectName,
        businessImpact: req.body.businessImpact,
        projectFeedback: req.body.projectFeedback,
        performanceSummary: req.body.performanceSummary,
        developmentAreas: req.body.developmentAreas,
        communityContributions: req.body.communityContributions,
        flightRisk: req.body.flightRisk,
        anyOtherHistory: req.body.anyOtherHistory,
        timeInTitle: req.body.timeInTitle,
        isDifferentiatorComment: req.body.isDifferentiatorComment,
        whatWillChange: req.body.whatWillChange,
        discussionPoints: req.body.discussionPoints,
        priority: req.body.priority,
        homeLocation: req.body.homeLocation,
        currentTitle: req.body.currentTitle,
        nextTitle: req.body.nextTitle,
        status: req.body.status || 'In Process',
        supervisorEmailId: req.body.supervisorEmailId,
        supervisorName: req.body.supervisorName
    });

    // Save Nomination in the database
    nominee.save()
    .then(data => {
        res.send({message:"Nomination Created Successfully!!!"});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

// Retrieve all nominations from the database.
exports.findAll = (req, res) => {
	Nomination.find()
    .then(nominations => {
        res.send(nominations);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving nominations."
        });
    });
};

// Retrieve all nominations from the database based on supervisor mail.
exports.findAllSupervisee = (req, res) => {
    Nomination.find({supervisorEmailId: req.body.supervisorEmailId})
    .then(nominations => {
        res.send(nominations);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving nominations."
        });
    });
};

// Find a nomination with a nominationId
exports.findOne = (req, res) => {
	Nomination.findById(req.params.nominationId)
    .then(nomination => {
        if(!nomination) {
            return res.status(404).send({
                message: "Nomination not found with id " + req.params.nominationId
            });            
        }
        res.send(nomination);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Nomination not found with id " + req.params.nominationId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving nomination with id " + req.params.nominationId
        });
    });
};

// Update nomination by the nominationId in the request
exports.update = (req, res) => {
	// Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Something need to be there in request to update."
        });
    }

    // Find note and update it with the request body
    Nomination.findByIdAndUpdate(req.params.nominationId, req.body, {new: true})
    .then(nominee => {
        if(!nominee) {
            return res.status(404).send({
                message: "Nominee not found with id " + req.params.nominationId
            });
        }
        res.send(nominee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Nominee not found with id " + req.params.nominationId
            });                
        }
        return res.status(500).send({
            message: "Error updating Nominee with id " + req.params.nominationId
        });
    });
};

// Delete Individual nominee nomination with the nominationId in the request
exports.delete = (req, res) => {
	Nomination.findByIdAndRemove(req.params.nominationId)
    .then(nominee => {
        if(!nominee) {
            return res.status(404).send({
                message: "Nominee not found with id " + req.params.nominationId
            });
        }
        res.send({message: "Nominee deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Nominee not found with id " + req.params.nominationId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Nominee with id " + req.params.nominationId
        });
    });
};