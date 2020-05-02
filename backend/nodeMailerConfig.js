const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: process.env.NODE_ENV !== 'production' ? 587 : undefined,
    secure: false,
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.EMAIL_PASSWORD
    },
    
});

module.exports = { transporter };