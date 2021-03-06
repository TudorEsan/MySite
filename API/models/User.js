const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', userSchema);
