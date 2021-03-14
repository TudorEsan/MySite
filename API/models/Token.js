const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    refreshToken: {
        type: String,
    }
});

module.exports = mongoose.model("Token", tokenSchema);
