const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jaeger = require('jaeger-client');
const app = express();
const port = 3000;

// Jaeger tracing configuration
const config = {
  serviceName: 'user-service',
  reporter: {
    logSpans: true,
    agentHost: 'localhost', // Jaeger host
    agentPort: 5775, // Jaeger port
  },
  sampler: {
    type: 'const',
    param: 1,
  },
};

const tracer = jaeger.initTracer(config, {
  logger: console,
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/flowmesh', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

// User model
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String
}));

// JWT token generator
const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, 'your-secret-key', { expiresIn: '1h' });
};

// Register route
app.post('/register', express.json(), async (req, res) => {
  const span = tracer.startSpan('register-request');
  span.log({ event: 'User registration started' });

  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  
  const token = generateToken(user);
  res.json({ token });

  span.log({ event: 'User registration finished' });
  span.finish();
});

// Login route
app.post('/login', express.json(), async (req, res) => {
  const span = tracer.startSpan('login-request');
  span.log({ event: 'User login started' });

  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    span.log({ event: 'Invalid credentials' });
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user);
  res.json({ token });

  span.log({ event: 'User login finished' });
  span.finish();
});

// Server start
app.listen(port, () => {
  console.log(`User service running on http://localhost:${port}`);
});
