const express = require('express');
const Message = require('../models/Message')
const router = express.Router();
const sendEmail = require('../Email/email');
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch(err) {

    }
});

router.get('/:messageId', async (req, res) => {
    try {
        const id = req.params.messageId;
        const message = await Message.findById(id);
        res.json(message);
    } catch(err) {
        res.json({message: err});
    }
});

router.post('/', (req, res) => {
    const message = new Message({
        subject: req.body.subject,
        name: req.body.name,
        body: req.body.body,
        email: req.body.email
    })
    console.log(req.body);
    message.save()
    .then((data => {
        console.log('Request recived!');
        res.json(data);
        // sendEmail(message);
    }))
    .catch(err => {
        res.json({ message: err });
        res.status(400);
    });
    
});

router.delete('/:messageId', async (req, res) => {
    try {
        const id = req.params.messageId;
        const message = await (await Message.findById(id)).deleteOne();
        res.status(200);
    } catch(err) {
        res.json({message: err});
    }
});

router.patch('/:messageId', async (req, res) => {
    try {
        const id = req.params.messageId;
        const updatedData = req.body;
        const updatedMessage = await Message.updateOne(
            { _id: id },
            { $set: updatedData }
        );
        console.log(updatedData);
        res.json(updatedMessage);
    } catch(err) {
        console.log("ERRRRRRRRRRRRORRRRR");
        console.log(err)
        res.json({message: err});
    }
});

module.exports = router;