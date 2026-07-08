const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let dataStore = {
  items: [
    { code: 'M001', name: 'Motor 6V' },
    { code: 'M002', name: 'Motor 12V' },
    { code: 'B001', name: 'Battery 6V' },
    { code: 'BS16', name: 'Blade Stand 16' }
  ],
  stock: {},
  issues: [],
  lastUpdated: new Date().toISOString()
};

app.get('/api/data', (req, res) => {
  res.json({ success: true, data: dataStore });
});

app.put('/api/data', (req, res) => {
  const { items, stock, issues } = req.body;
  if (items) dataStore.items = items;
  if (stock) dataStore.stock = stock;
  if (issues) dataStore.issues = issues;
  dataStore.lastUpdated = new Date().toISOString();
  res.json({ success: true, data: dataStore });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});
