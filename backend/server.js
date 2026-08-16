require('dotenv').config();
const express = require('express');
const cors = require('cors');

const newsRoutes = require('./routes/news');
const categoriesRoutes = require('./routes/categories');
const newsController = require('./controllers/newsController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', newsController.getHealth);

// API Routes
app.use('/api/news', newsRoutes);
app.use('/api/categories', categoriesRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Mini Haber Portali API' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
