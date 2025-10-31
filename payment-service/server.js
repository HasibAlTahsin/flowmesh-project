// payment-service/server.js

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3003;

// MongoDB কানেকশন
mongoose.connect('mongodb://localhost:27017/flowmesh', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

// পেমেন্ট মডেল
const Payment = mongoose.model('Payment', new mongoose.Schema({
  orderId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  status: { type: String, default: 'pending' },
}));

// পেমেন্ট তৈরি API
app.post('/create-payment', express.json(), async (req, res) => {
  const { orderId, amount } = req.body;
  const payment = new Payment({ orderId, amount });
  await payment.save();
  res.status(201).json({ message: 'Payment created successfully', payment });
});

// পেমেন্ট স্ট্যাটাস আপডেট API
app.put('/update-payment/:id', express.json(), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const payment = await Payment.findByIdAndUpdate(id, { status }, { new: true });
  if (!payment) {
    return res.status(404).json({ message: 'Payment not found' });
  }
  res.json({ message: 'Payment status updated successfully', payment });
});

// পেমেন্ট তালিকা API
app.get('/payments', async (req, res) => {
  const payments = await Payment.find();
  res.json(payments);
});

// সার্ভার শুরু
app.listen(port, () => {
  console.log(`Payment service running on http://localhost:${port}`);
});
