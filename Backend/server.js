require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// 2. Middleware
// Allow frontend origin (set FRONTEND_URL in .env if different)
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

// 3. Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// 4. Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// 5. Test Route to check if server is working at all
app.get('/', (req, res) => {
  res.send("Where's my Toilet Backend is live! 🚀");
});

// 6. Start
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is live on http://localhost:${PORT}`);
});