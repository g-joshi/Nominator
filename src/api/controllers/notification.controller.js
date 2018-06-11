const webpush = require('web-push');
const Subscription = require('../models/subscription.model');

const publicVapidKey = 'BAMk7loC8oRci8CsezXqjk7H777nM08RbJsT8J87THq1Qgf7Udgv8awrjSZhYAOgWZRiucrCgowXzawDsZGYcHg';
const privateVapidKey = '-sXeqYPyPEE2GwflGg-nUypYLhXpKk6WVWH6heAa7L4';
webpush.setVapidDetails('mailto:gjoshi7@sapient.com', publicVapidKey, privateVapidKey);

exports.subscribeAndSave = (req, res) => {
    // Get push subsciption object
    const _subscription = req.body;
    const subscriptionModel = new Subscription({
        subscription: JSON.stringify(_subscription)
    });

    subscriptionModel.save().then(data => {
        // send 201
        res.status(201).json({});
    });
};

exports.notify = function (payload) {
    Subscription.find().then(subscriptionList => {
        for (var i = 0; i < subscriptionList.length; i++) {
            webpush.sendNotification(JSON.parse(subscriptionList[i].subscription), JSON.stringify(payload));
        }
    });
}