const mongoose = require('mongoose');
const { getFormatedDate2 } = require('../formaters/dateFormater');



const CryptoSchema = mongoose.Schema({
    user: {
        type: String
    },
    portofolioAmount: {
        type: Number
    },
    amountInvested: {
        type: Number
    },
    actualAmount: {
        type: Number
    },
    profit: {
        type: Number
    },
    amountSold: {
        type: Number
    },
    ether: {
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