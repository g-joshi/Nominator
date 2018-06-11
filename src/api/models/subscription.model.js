const mongoose = require('mongoose');

const SubscriptionSchema = mongoose.Schema({ subscription: String }, { timestamps: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);