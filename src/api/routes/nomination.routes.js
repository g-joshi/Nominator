module.exports = (app) => {
    const nominations = require('../controllers/nomination.controller.js');

    // Create a new nomination
    app.post('/nomination', nominations.create);

    // Retrieve all nominations
    app.get('/nomination', nominations.findAll);

    // Export nominations to excel
    app.get('/nomination/export', nominations.exportToExcel);

    // Retrieve a single nomination with nomination id
    app.get('/nomination/:nominationId', nominations.findOne);

    // Retrieve all nomination submitted by supervisor
    app.post('/nomination/supervisee', nominations.findAllSupervisee);

    // Update a nomination with nominationId
    app.put('/nomination/:nominationId', nominations.update);

    // Delete a Nomination with nominationId
    app.delete('/nomination/:nominationId', nominations.delete);
}