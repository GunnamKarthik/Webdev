const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const budgetRoutes = require('./routes/budgets')
const authMiddleware = require('./middleware/authMiddleware');
const app = express();
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.log('MongoDB connection error:', error));

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes)
app.get('/', (req, res) => {
  res.send('SmartSpend BAckend Is Running!');
});
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({
    message: 'Protected route accessed successfully',
    userId: req.userId
  });
});

app.listen(PORT, () => {
  console.log(`SmartSpend server running on port ${PORT}`);
});