module.exports = (app) => {
    const notifications = require('../controllers/notification.controller.js');

    // Subscribe to push notifications
    app.post('/subscribe', notifications.subscribeAndSave);
}