const mongoose = require('mongoose');
const { getFormatedDate2 } = require('../formaters/dateFormater');



const CryptoSchema = mongoose.Schema({
    user: {
        type: String,
        default: ''
    },
    ballance: {
        type: Number,
        default: 0.0
    },
    portofolioAmount: {
        type: Number,
        default: 0
    },
    amountInvested: {
        type: Number,
        default: 0
    },
    actualAmount: {
        type: Number,
        default: 0
    },
    profit: {
        type: Number,
        default: 0
    },
    amountSold: {
        type: Number,
        default: 0
    },
})

module.exports = mongoose.model("Crypto", CryptoSchema); 