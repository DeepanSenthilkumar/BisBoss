const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const salesRoutes = require('./routes/salesRoutes');
const moneyOutRoutes = require('./routes/moneyOutRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/moneyout', moneyOutRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
