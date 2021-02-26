const axios = require('axios').default;
const { performance } = require('perf_hooks');
const getCryptoKeys = (obj) => {
    const keys = Object.keys(obj._doc);
    const filter = ['_id', 'user', 'portofolioAmount', 'actualAmount', 'amountInvested', 'profit', 'amountSold'];
    return keys.filter(key => !filter.includes(key))
}

const getIconAndName = async (abbreviation) => {
    const data = await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=dc19a861549a04d292ead162f2dc07e1&ids=${abbreviation}`);
    if (data.data[0] === undefined) {
        return [undefined, undefined]
    }
    return [data.data[0].logo_url, data.data[0].name];
    
}

const addAmount = async (document, obj) => {
    if (!(obj.type in document._doc)) {
        document._doc[obj.type] = {
            icon: obj.icon,
            transactions: [],
            name: obj.name,
            amount: 0,
            usd: 0,
            soldUsd: 0,
            soldAmount: 0,
        };
    }
    document._doc[obj.type].amount = document._doc[obj.type].amount + obj.amount;
    document._doc[obj.type].usd = document._doc[obj.type].usd + obj.usd;
    document._doc[obj.type].transactions.push({
        amount: obj.amount,
        usd: obj.usd,
        date: obj.date
    })
    document._doc[obj.type].usdInvested = document._doc[obj.type].usdInvested + obj.usd;
    document.markModified(obj.type);
    document.save();
}
const twoDigits = (n) => {
    return Math.trunc(n * 100) / 100;
}


const getCurrentPrices = async (keys) => {
    const data = await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=dc19a861549a04d292ead162f2dc07e1&ids=${keys}&sort=rank`);
    const prices = {};
    data.data.forEach(crypto => {
        prices[crypto.id] = crypto.price
    });
    return prices;
}

const getGrowth = (value, newValue) => {
    return (newValue * 100 / value - 100) / 100;
}

const calcStatistics = async (user, keys) => {
    const currentPrices = await getCurrentPrices(keys);
    let statistics = {
        amountInvested: 0,
        actualAmount: 0,
        totalGrowth: 0,
    };
    try {
        keys.forEach(key => {
            const currentUsdAmount = user._doc[key].amount * currentPrices[key] + user._doc[key].soldUsd;
            statistics.amountInvested = statistics.amountInvested + user._doc[key].usd;
            statistics[key] = {};
            statistics[key].growth = getGrowth(user._doc[key].usd, currentUsdAmount);
            statistics[key].getCurrentPrices = currentUsdAmount;
            statistics[key].transactions = user._doc[key].transactions;
            statistics.actualAmount = statistics.actualAmount + currentUsdAmount;
            statistics[key].name = user._doc[key].name;
            statistics[key].icon = user._doc[key].icon;
        })
        statistics.totalGrowth = getGrowth(statistics.amountInvested, statistics.actualAmount);
        console.log(statistics);
        return statistics;
    } catch (e) {
        console.log(e)
        return e;
    }
}

const verifyAmount = (user, key, amount) => {
    if (user._doc[key] === undefined)
        return false;
    if (user._doc[key].amount >= amount)
        return true;
    return false; 
}

const verifyType = async (type) => {
    const resp = await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=dc19a861549a04d292ead162f2dc07e1&ids=${type}`)
    return !(resp.data[0].name === undefined);
}

const sellCrypto = async (user, req) => {
    try {
        user._doc[req.type].soldUsd = user._doc[req.type].soldUsd + req.amount * req.price;
        user._doc[req.type].amountSold = user._doc[req.type].amountSold + req.amount;
        user._doc[req.type].amount = user._doc[req.type].amount - req.amount;
        user._doc[req.type].transactions.push({
            type: 'sold',
            amount: req.amount,
            date: req.date,
            price: req.price
        })
        await user.markModified(req.type);
        await user.save();
        return;
    } catch (e) {
        return e;
    }
}

module.exports = { twoDigits, addAmount, getIconAndName, getCryptoKeys, calcStatistics, verifyAmount, verifyType, sellCrypto };