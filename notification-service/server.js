// notification-service/server.js

const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3005;

// Nodemailer কনফিগারেশন
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // আপনার ইমেইল
    pass: 'your-email-password',   // আপনার ইমেইল পাসওয়ার্ড
  },
});

// ইমেইল পাঠানোর API
app.post('/send-email', express.json(), (req, res) => {
  const { to, subject, text } = req.body;
  const mailOptions = {
    from: 'your-email@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Email send failed', error });
    }
    res.status(200).json({ message: 'Email sent successfully', info });
  });
});

// সার্ভার শুরু
app.listen(port, () => {
  console.log(`Notification service running on http://localhost:${port}`);
});
