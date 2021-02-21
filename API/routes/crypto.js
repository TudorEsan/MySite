const Crypto = require("./../models/Crypto")
require('dotenv/config');
const router = require('express').Router();
const { getIcon, addAmount, getCryptoKeys, calcStatistics } = require("../functions/cryptoFunctions")

router.post('/', async (req, res) => {
    const user = await Crypto.findOne({ user: 'Tudor' }, (err, resp) => {
        if (!resp) {
            res.send('User not found');
        }
        return resp
    })
    const icon = await getIcon(req.body.abbreviation);
    if (icon === undefined) {
        return res.status(404).send('invalid abbreviation');
    }
    req.body.icon = icon;
    addAmount(user, req.body);
    res.status(200).send('Updated')
    
});

router.get("/", async (req, res) => {
    try {
        const user = await Crypto.findOne({ user: "Tudor" });
        const keys = getCryptoKeys(user)
        const statistics = await calcStatistics(user, keys)
        console.log(statistics)
        return res.status(200).json({...statistics});
    } catch (er) {
        return res.status(400).json({ message: er })
    }
});


module.exports = router;