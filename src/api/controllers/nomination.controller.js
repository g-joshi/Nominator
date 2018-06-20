const Nomination = require('../models/nomination.model.js');
const notificationController = require('../controllers/notification.controller');
const excel = require('node-excel-export');

// Export to Excel
exports.exportToExcel = (req, res) => {
    // You can define styles as json object
    const styles = {
        headerDark: {
            fill: {
                fgColor: {
                    rgb: 'FF000000'
                }
            },
            font: {
                color: {
                    rgb: 'FFFFFFFF'
                },
                sz: 14,
                bold: true,
                underline: true
            }
        }
    };

    //Here you specify the export structure
    const specification = {
        name: {
            displayName: 'Nominee Name',
            headerStyle: styles.headerDark,
            width: '16'
        },
        priority: {
            displayName: 'Priority',
            headerStyle: styles.headerDark,
            width: '8'
        },
        flightRisk: {
            displayName: 'Flight Risk',
            headerStyle: styles.headerDark,
            width: '15'
        },
        status: {
            displayName: 'Status',
            headerStyle: styles.headerDark,
            width: '9'
        },
        emailId: {
            displayName: 'Nominee Email Id',
            headerStyle: styles.headerDark,
            width: '20'
        },
        supervisorName: {
            displayName: 'Supervisor Name',
            headerStyle: styles.headerDark,
            width: '20'
        },
        supervisorEmailId: {
            displayName: 'Supervisor Email Id',
            headerStyle: styles.headerDark,
            width: '20'
        },
        homeLocation: {
            displayName: 'Home Location',
            headerStyle: styles.headerDark,
            width: '16'
        },
        currentTitle: {
            displayName: 'Current Title',
            headerStyle: styles.headerDark,
            width: '30'
        },
        nextTitle: {
            displayName: 'Next Title',
            headerStyle: styles.headerDark,
            width: '30'
        },
        coreCapabilities: {
            displayName: 'Core Capabilities',
            headerStyle: styles.headerDark,
            width: '20'
        },
        projectName: {
            displayName: 'Project Name',
            headerStyle: styles.headerDark,
            width: '15'
        },
        businessImpact: {
            displayName: 'Business Impact',
            headerStyle: styles.headerDark,
            width: '18'
        },
        projectFeedback: {
            displayName: 'Project Feedback',
            headerStyle: styles.headerDark,
            width: '18'
        },
        performanceSummary: {
            displayName: 'Performance Summary',
            headerStyle: styles.headerDark,
            width: '24'
        },
        developmentAreas: {
            displayName: 'Development Areas',
            headerStyle: styles.headerDark,
            width: '20'
        },
        communityContributions: {
            displayName: 'Community Contributions',
            headerStyle: styles.headerDark,
            width: '26'
        },
        anyOtherHistory: {
            displayName: 'Any Other History',
            headerStyle: styles.headerDark,
            width: '20'
        },
        timeInTitle: {
            displayName: 'Time In Title',
            headerStyle: styles.headerDark,
            width: '13'
        },
        isDifferentiatorComment: {
            displayName: 'Is he/she a differentiator ?',
            headerStyle: styles.headerDark,
            width: '26'
        },
        whatWillChange: {
            displayName: 'What will change for him/her in the next role ?',
            headerStyle: styles.headerDark,
            width: '30'
        },
        discussionPoints: {
            displayName: 'Any discussion points',
            headerStyle: styles.headerDark,
            width: '24'
        }
    };

    Nomination.find().then(nominations => {
        const report = excel.buildExport(
            [
                {
                    name: 'Nominations.xlsx', // <- Specify sheet name (optional)
                    heading: [], // <- Raw heading array (optional)
                    merges: [],
                    specification: specification, // <- Report specification
                    data: nominations // <-- Report data
                }
            ]
        );

        res.send(report);
    });
};


// Create and Save a new Nomination
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
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
            res.send({ message: "Nomination Created Successfully!!!" });
            notificationController.notify({ 'title': `New nomination: ${nominee.name}` });
        }).catch(err => {
            let message = "Some error occurred while creating the User.";
            if (err.code) {
                if (err.code === 11000) {
                    message = 'Duplicate nomination';
                }
            }
            res.status(500).send({
                message: message,
                code: err.code
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
    Nomination.find({ supervisorEmailId: req.body.supervisorEmailId })
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
            if (!nomination) {
                return res.status(404).send({
                    message: "Nomination not found with id " + req.params.nominationId
                });
            }
            res.send(nomination);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
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
    if (!req.body) {
        return res.status(400).send({
            message: "Something need to be there in request to update."
        });
    }

    // Find note and update it with the request body
    Nomination.findByIdAndUpdate(req.params.nominationId, req.body, { new: true })
        .then(nominee => {
            if (!nominee) {
                return res.status(404).send({
                    message: "Nominee not found with id " + req.params.nominationId
                });
            }
            res.send(nominee);
            let notificationMsg = '';
            if (nominee.status == 'In Progress') {
                notificationMsg = `Nomination deffered: ${nominee.name}`;
            } else if (nominee.status == 'Approved') {
                notificationMsg = `Nomination approved: ${nominee.name}`;
            } else if (nominee.status == 'Declined') {
                notificationMsg = `Nomination declined: ${nominee.name}`;
            } else {
                notificationMsg = `Nomination updated: ${nominee.name}`;
            }
            notificationController.notify({ 'title': notificationMsg });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
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
            if (!nominee) {
                return res.status(404).send({
                    message: "Nominee not found with id " + req.params.nominationId
                });
            }
            res.send({ message: "Nominee deleted successfully!" });
            notificationController.notify({ 'title': `Nomination deleted: ${nominee.name}` });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Nominee not found with id " + req.params.nominationId
                });
            }
            return res.status(500).send({
                message: "Could not delete Nominee with id " + req.params.nominationId
            });
        });
};