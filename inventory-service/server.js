// inventory-service/server.js

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3004;


mongoose.connect('mongodb://localhost:27017/flowmesh', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log('MongoDB connection error:', err));


const Inventory = mongoose.model('Inventory', new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  quantity: Number,
}));


app.post('/add-inventory', express.json(), async (req, res) => {
  const { productId, quantity } = req.body;
  const inventory = new Inventory({ productId, quantity });
  await inventory.save();
  res.status(201).json({ message: 'Inventory added successfully', inventory });
});


app.put('/update-inventory/:id', express.json(), async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const inventory = await Inventory.findByIdAndUpdate(id, { quantity }, { new: true });
  if (!inventory) {
    return res.status(404).json({ message: 'Inventory not found' });
  }
  res.json({ message: 'Inventory stock updated successfully', inventory });
});


app.get('/inventory', async (req, res) => {
  const inventory = await Inventory.find();
  res.json(inventory);
});


app.listen(port, () => {
  console.log(`Inventory service running on http://localhost:${port}`);
});
