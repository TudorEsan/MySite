const Crypto = require("./../models/Crypto")
require('dotenv/config');
const router = require('express').Router();
const { getIconAndName, addAmount, getCryptoKeys, calcStatistics, verifyType, verifyAmount, sellCrypto } = require("../functions/cryptoFunctions")

router.post('/', async (req, res) => {
    const user = await Crypto.findOne({ user: 'Tudor' }, (err, resp) => {
        if (!resp) {
            res.send('User not found');
        }
        return resp
    })
    const [icon, name] = await getIconAndName(req.body.type);
    if (icon === undefined) {
        return res.status(404).send('invalid abbreviation');
    }
    req.body.icon = icon;
    req.body.name = name;
    addAmount(user, req.body);
    res.status(200).send('Updated');
});

router.get("/", async (req, res) => {
    try {
        const user = await Crypto.findOne({ user: 'Tudor' });
        const keys = getCryptoKeys(user)
        const statistics = await calcStatistics(user, keys);
        
        return res.status(200).json({ ...statistics});
    } catch (er) {
        return res.status(400).send(er);
    }
});

router.post('/sell', async (req, res) => {
    if (!verifyType(req.body.type)) {
        return res.status(400).json({ message: 'Invalid type'})
    }
    const user = await Crypto.findOne({ user: "Tudor" });
    if (!verifyAmount(user, req.body.type, req.body.amount)) {
        return res.status(400).json({ message: 'Not enough funds' });
    }
    const resp = await sellCrypto(user, req.body);
    console.log(resp)
    if (!resp) {
        return res.status(200).json({ message: 'Successfull'})
    }
    return res.status(400).json({ message: resp })
});


module.exports = router;
