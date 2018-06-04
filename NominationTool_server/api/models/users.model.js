const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name: String,
    email: String,
    role: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UsersSchema);