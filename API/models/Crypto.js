const mongoose = require('mongoose');
const { getFormatedDate2 } = require('../formaters/dateFormater');



const CryptoSchema = mongoose.Schema({
    type: {
        type: String,
        enum: [ 'Ether', "Bitcoin", "Stellar"],
        required: true
    },
    cryptoBuyingPrice: {
        type: Number,
        required: true
    },
    bought: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number,
        required: false
    },
    date: {
        type: String,
        default: getFormatedDate2(Date.now()),
        required: false
    },
    soldAt: {
        type: Date,
        required: false,
        default: null

    },
    sold: {
        type: Number,
        required: false,
        default: null
    },
    soldCryptoPrice: {
        type: Number,
        required: false,
        default: null
    }
})

module.exports = mongoose.model("Crypto", CryptoSchema); 