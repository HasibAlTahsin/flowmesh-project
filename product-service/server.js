// product-service/server.js

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001;

// MongoDB কানেকশন
mongoose.connect('mongodb://localhost:27017/flowmesh', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

// পণ্য মডেল
const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
}));

// পণ্য যুক্ত করার API
app.post('/add-product', express.json(), async (req, res) => {
  const { name, description, price, stock } = req.body;
  const product = new Product({ name, description, price, stock });
  await product.save();
  res.status(201).json({ message: 'Product added successfully', product });
});

// পণ্য তালিকা দেখানোর API
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// পণ্য স্টক আপডেট করার API
app.put('/update-product/:id', express.json(), async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;
  const product = await Product.findByIdAndUpdate(id, { stock }, { new: true });
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json({ message: 'Product stock updated successfully', product });
});

// পণ্য মুছে ফেলার API
app.delete('/delete-product/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json({ message: 'Product deleted successfully' });
});

// সার্ভার শুরু
app.listen(port, () => {
  console.log(`Product service running on http://localhost:${port}`);
});
