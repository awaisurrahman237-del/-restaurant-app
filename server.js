require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// 1. Initialize Express App first
const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Register Routes (Only after app is initialized)
const menuRoutes = require('./routes/menuRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

app.use('/api/menu', menuRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// Root Route
app.get('/', (req, res) => {
    res.send('Backend Server Connected Successfully!');
});

// 404 Route Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error', error: err.message });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://192.168.0.108:${PORT}`);
});