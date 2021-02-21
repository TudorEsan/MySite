const axios = require('axios').default;
const { performance } = require('perf_hooks');
const getCryptoKeys = (obj) => {
    const keys = Object.keys(obj._doc);
    const filter = ['_id', 'user', 'portofolioAmount', 'actualAmount', 'amountInvested', 'profit', 'amountSold'];
    return keys.filter(key => !filter.includes(key))
} 

const getIcon = async (abbreviation) => {
    const data = await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=dc19a861549a04d292ead162f2dc07e1&ids=${abbreviation}`);
    if (data.data[0] === undefined) {
        return undefined
    }
    return data.data[0].logo_url;
    
}

const addAmount = async (document, obj) => {
    if (!(obj.abbreviation in document)) {
        document._doc[obj.abbreviation] = {
            icon: obj.icon,
            transactions: [],
            name: obj.type,
            amount: 0,
            usd: 0
        };
        console.log(document)
    }
    document._doc[obj.abbreviation].amount = document._doc[obj.abbreviation].amount + obj.amount;
    document._doc[obj.abbreviation].usd = document._doc[obj.abbreviation].usd + obj.usd;
    document._doc[obj.abbreviation].transactions.push({
        amount: obj.amount,
        usd: obj.usd,
        date: obj.date
    })
    document.markModified(obj.abbreviation);
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
            const currentUsdAmount = user._doc[key].amount * currentPrices[key];
            statistics.amountInvested = statistics.amountInvested + user._doc[key].usd;
            statistics[key] = { }
            statistics[key].growth = getGrowth(user._doc[key].usd, currentUsdAmount);
            statistics[key].getCurrentPrices = currentUsdAmount;
            statistics[key].transactions = user._doc[key].transactions;
            statistics.actualAmount = statistics.actualAmount + currentUsdAmount;
        })
        statistics.totalGrowth = getGrowth(statistics.amountInvested, statistics.actualAmount)
        return statistics;
    } catch (e) {
        return e;
    }
}

module.exports = { twoDigits, addAmount, getIcon, getCryptoKeys, calcStatistics };