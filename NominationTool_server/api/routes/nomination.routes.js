module.exports = (app) => {
    const nominations = require('../controllers/nomination.controller.js');

    // Create a new nomination
    app.post('/nomination', nominations.create);

    // Retrieve all nominations
    app.get('/nomination', nominations.findAll);

    // Retrieve a single nomination with nomination id
    app.get('/nomination/:nominationId', nominations.findOne);

    // Update a nomination with nominationId
    app.put('/nomination/:nominationId', nominations.update);

    // Delete a Nomination with nominationId
    app.delete('/nomination/:nominationId', nominations.delete);
}