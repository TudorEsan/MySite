const router = require('express').Router();
const verifyToken = require('./verifyToken');

router.get('/', (req, res) => {
    res.send('Radom Data you should not acces');
});

module.exports = router