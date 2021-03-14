const e = require('express');
const nodemailer = require('nodemailer');
require('dotenv/config');

const sendEmail = (message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const { subject, email, name, body, date } = message;
    
    const mailOptions = {
        from: email? email : "Didn't share Email",
        to: 'tudor.esan@icloud.com',
        subject: subject? subject : "Empty Sumbject",
        text: body
    }
    
    transporter.sendMail(mailOptions, (err) => {
        if(err) {
            console.log(err) 
        }
    })
}

module.exports = sendEmail;