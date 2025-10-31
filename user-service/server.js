// user-service/server.js

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

// MongoDB কানেকশন
mongoose.connect('mongodb://localhost:27017/flowmesh', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

// ইউজার মডেল
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String
}));

// JWT টোকেন জেনারেটর
const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, 'your-secret-key', { expiresIn: '1h' });
};

// রেজিস্ট্রেশন রুট
app.post('/register', express.json(), async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  const token = generateToken(user);
  res.json({ token });
});

// লগইন রুট
app.post('/login', express.json(), async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = generateToken(user);
  res.json({ token });
});

// সার্ভার শুরু
app.listen(port, () => {
  console.log(`User service running on http://localhost:${port}`);
});
