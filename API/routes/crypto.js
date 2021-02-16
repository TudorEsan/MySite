const axios = require('axios').default;
const cryptoValidation = require('../Validation/CryptoValidation');
const Crypto = require("./../models/Crypto")
require('dotenv/config');
const router = require('express').Router();
const cryptoApiLink = "https://api.nomics.com/v1/currencies";

const getEtherPriceAndIcon = async () => {
    const etherData = await axios.get("https://api.nomics.com/v1/currencies/ticker?key=dc19a861549a04d292ead162f2dc07e1&ids=ETH");
    return [1 / etherData.data[0].price, etherData.data[0].logo_url];
}

const getBitcoinPriceAndIcon = async () => {
    const bitcoinData = await axios.get("https://api.nomics.com/v1/currencies/ticker?key=dc19a861549a04d292ead162f2dc07e1&ids=BTC");
    return [1 / bitcoinData.data[0].price, bitcoinData.data[0].logo_url];
}

const getStellarPriceAndIcon = async () => {
    const stellarData = await axios.get("https://api.nomics.com/v1/currencies/ticker?key=dc19a861549a04d292ead162f2dc07e1&ids=XLM");
    return [1 / stellarData.data[0].price, stellarData.data[0].logo_url];
}

const twoDigits = (n) => {
    return Math.trunc(n * 100) / 100;
}



router.post('/', async (req, res) => {
    const { error } = cryptoValidation(req.body);
    if (error)  
        return res.status(400).send(error.details[0].message)
    try {
        let icon;
        switch (req.body.type) {
            case 'Ether':
                icon = "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/eth.svg";
                break;
            case 'Bitcoin':
                icon = "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg";
                break;
            case 'Stellar':
                icon = "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/xlm.svg";
                break;
        }
        const crypto = new Crypto({
            type: req.body.type,
            bought: req.body.bought,
            cryptoBuyingPrice: req.body.cryptoBuyingPrice,
            date: req.body.date,
            icon: icon
        })
        const savedCrypto = await crypto.save();
        res.send({ crypto: savedCrypto._id });
    } catch (e) {
        return res.status(400).send(e);
    }
});


router.get('/', async (req, res) => {
    debugger;
    let amount = 0, actualAmount = 0, profit = 0, etherAmount = 0, bitcoinAmount = 0, actualEtherAmount = 0, actualBitcoinAmount = 0, etherPercentageGrowth = 0, bitcoinPercentageGrowth = 0, stellarAmount = 0, actualStellarAmount = 0;
    let [currentEtherPrice, etherIcon] = await getEtherPriceAndIcon(), [currentBitcoinPrice, bitcoinIcon] = await getBitcoinPriceAndIcon(), [currentStellarPrice, stellarIcon] = await getStellarPriceAndIcon();
    console.log(currentBitcoinPrice, bitcoinIcon)
    await Crypto.find({ type: "Ether" }, (err, res) => {
        res.forEach(transaction => {
            etherAmount = etherAmount + transaction.bought;
            amount = amount + transaction.bought;
            const changedPercentage = transaction.cryptoBuyingPrice * 100 / currentEtherPrice - 100;
            const currentPrice = transaction.bought * (100 + changedPercentage) / 100;
            actualEtherAmount = actualEtherAmount + currentPrice;
        })
        return res;
    })
    await Crypto.find({ type: "Stellar" }, (err, res) => {
        res.forEach(transaction => {
            stellarAmount = stellarAmount + transaction.bought;
            amount = amount + transaction.bought;
            const changedPercentage = transaction.cryptoBuyingPrice * 100 / currentStellarPrice - 100;
            const currentPrice = transaction.bought * (100 + changedPercentage) / 100;
            actualStellarAmount = actualStellarAmount + currentPrice;
        })
        return res;
    })
    await Crypto.find({ type: "Bitcoin" }, ((err, res) => {
        res.forEach(transaction => {
            bitcoinAmount = bitcoinAmount + transaction.bought;
            amount = amount + transaction.bought
            const changedPercentage = transaction.cryptoBuyingPrice * 100 / currentBitcoinPrice - 100;
            const currentPrice = transaction.bought * (100 + changedPercentage) / 100;
            actualBitcoinAmount = actualBitcoinAmount + currentPrice;
        })
        return res;
    }))
    const allTransactions = await Crypto.find({}, (err, res) => {
        return res;
    })
    actualAmount = actualEtherAmount + actualBitcoinAmount + actualStellarAmount;
    etherPercentageGrowth = actualEtherAmount * 100 / etherAmount - 100;
    bitcoinPercentageGrowth = actualBitcoinAmount * 100 / bitcoinAmount - 100;
    stellarPercentageGrowth = actualStellarAmount * 100 / stellarAmount - 100;
    totalPercentageGrowth = actualAmount * 100 / amount - 100;
    res.status(200).json({
        transactions: allTransactions,
        amount: twoDigits(amount),
        actualAmount: twoDigits(actualAmount),
        totalPercentageGrowth: twoDigits(totalPercentageGrowth),
        profit: twoDigits(actualAmount - amount),
        cryptoAmount: [
            { name: 'Ether', amount: twoDigits(actualEtherAmount), growth: twoDigits(etherPercentageGrowth), profit: twoDigits(actualEtherAmount - (actualEtherAmount * (100 - etherPercentageGrowth) / 100)), icon: etherIcon },
            { name: 'Bitcoin', amount: twoDigits(actualBitcoinAmount), growth: twoDigits(bitcoinPercentageGrowth), profit: twoDigits(actualBitcoinAmount - (actualBitcoinAmount * (100 - bitcoinPercentageGrowth) / 100)), icon: bitcoinIcon },
            { name: 'Stellar', amount: twoDigits(actualStellarAmount), growth: twoDigits(stellarPercentageGrowth), profit: twoDigits(actualStellarAmount - (actualStellarAmount * (100 - stellarPercentageGrowth) / 100)), icon: stellarIcon }
        ]
    })
})



module.exports = router;