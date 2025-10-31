// order-service/server.js

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3002;

// MongoDB কানেকশন
mongoose.connect('mongodb://localhost:27017/flowmesh', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

// অর্ডার মডেল
const Order = mongoose.model('Order', new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  productId: mongoose.Schema.Types.ObjectId,
  quantity: Number,
  totalPrice: Number,
  status: { type: String, default: 'pending' },
}));

// অর্ডার তৈরি API
app.post('/create-order', express.json(), async (req, res) => {
  const { userId, productId, quantity, totalPrice } = req.body;
  const order = new Order({ userId, productId, quantity, totalPrice });
  await order.save();
  res.status(201).json({ message: 'Order created successfully', order });
});

// অর্ডারের স্ট্যাটাস আপডেট API
app.put('/update-order/:id', express.json(), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json({ message: 'Order status updated successfully', order });
});

// অর্ডারের তালিকা API
app.get('/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// সার্ভার শুরু
app.listen(port, () => {
  console.log(`Order service running on http://localhost:${port}`);
});
