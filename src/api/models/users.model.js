const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name: String,
    emailId: {type: String, unique: true },
    role: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UsersSchema);