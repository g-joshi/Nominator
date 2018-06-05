const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name: String,
    emailId: String,
    role: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UsersSchema);