const axios = require('axios').default;
const cryptoValidation = require('../Validation/CryptoValidation');
const Crypto = require("./../models/Crypto")
require('dotenv/config');
const router = require('express').Router();
const cryptoApiLink = "https://api.nomics.com/v1/currencies";

const getEtherPrice = async () => {
    const etherData = await axios.get("https://api.nomics.com/v1/currencies/ticker?key=dc19a861549a04d292ead162f2dc07e1&ids=ETH");
    console.log(etherData.data);
    return 1 / etherData.data[0].price;
}

const getBitcoinPrice = async () => {
    const etherData = await axios.get("https://api.nomics.com/v1/currencies/ticker?key=dc19a861549a04d292ead162f2dc07e1&ids=BTC");
    return 1 / etherData.data[0].price;
}

router.post('/', async (req, res) => {
    const { error } = cryptoValidation(req.body);
    if (error)  
        return res.status(400).send(error.details[0].message)
    try {
        const crypto = new Crypto({
            type: req.body.type,
            bought: req.body.bought,
            cryptoBuyingPrice: req.body.cryptoBuyingPrice,
            date: req.body.date
        })
        const savedCrypto = await crypto.save();
        res.send({ crypto: savedCrypto._id });
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get('/', async (req, res) => {
    let amount = 0, actualAmount = 0, profit = 0;
    let currentEtherPrice = await getEtherPrice(), currentBitcoinPrice = await getEtherPrice();
    console.log(currentEtherPrice)
    const etherTransactions = await Crypto.find({ type: "Ether" }, (err, res) => {
        res.forEach(transaction => {
            amount = amount + transaction.bought;
            const changedPercentage = transaction.cryptoBuyingPrice * 100 / currentEtherPrice - 100;
            const currentPrice = transaction.bought * (100 + changedPercentage) / 100;
            actualAmount = actualAmount + currentPrice;
        })
        return res;
    })
    const bitcoinTransactions = await Crypto.find({ type: "Bitcoin" }, ((err, res) => {
        res.forEach(transaction => {
            amount = amout + transaction.bought;
        })
        return res;
    }))
    percentageGrowth = actualAmount * 100 / amount - 100;
    res.status(200).json({
        transactions: {
            ether: [...etherTransactions],
            bitcoin: [...bitcoinTransactions]
        },
        amount: amount,
        actualAmount: actualAmount,
        percentageGrowth: percentageGrowth
    })
})



module.exports = router;