const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    subject: {
        type: String,
        required: false
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: false
    }
})

module.exports = mongoose.model("Message", MessageSchema);