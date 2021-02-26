const mongoose = require('mongoose');
const { getFormatedDate2 } = require('../formaters/dateFormater');



const CryptoSchema = mongoose.Schema({
    user: {
        type: String,
        default: 'tudor'
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
    ether: {
        type: {
            amountInvested: {
                type: Number,
                default: 0
            },
            actualAmount: {
                type: Number,
                default: 0
            },
            transactions: {
                type: [{
                    date: {
                        type: String
                    },
                    price: {
                        type: Number
                    }
                }]
            },
            amountSold: {
                type: Number
            },
        }
    },
    bitcoin: {
        type: {
            amountInvested: {
                type: Number
            },
            actualAmount: {
                type: Number
            },
            transactions: {
                type: [{
                    date: {
                        type: String
                    },
                    price: {
                        type: Number
                    }
                }]
            },
            priceCalculatedAt: {
                type: Number
            },
            amountSold: {
                type: Number
            },
        }
    },
    xlm: {
        type: {
            amountInvested: {
                type: Number
            },
            actualAmount: {
                type: Number
            },
            transactions: {
                type: [{
                    date: {
                        type: String
                    },
                    price: {
                        type: Number
                    }
                }]
            },
            priceCalculatedAt: {
                type: Number
            },
            amountSold: {
                type: Number
            },
        }
    }
})

module.exports = mongoose.model("Crypto", CryptoSchema); 