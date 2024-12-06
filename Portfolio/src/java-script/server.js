require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
    const { name, phone, email, message, recipient } = req.body;

    console.log('Received data:', { name, phone, email, message, recipient });

    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false 
            }
        });

        console.log('Transporter created with email:', process.env.EMAIL_USER);

        await transporter.sendMail({
            from: email,
            to: recipient,
            subject: `New message from ${name}`,
            text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        console.log('Email sent successfully to:', recipient);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Email user:', process.env.EMAIL_USER);  
    console.log('Email pass:', process.env.EMAIL_PASS ? '****' : 'not set');  
});
