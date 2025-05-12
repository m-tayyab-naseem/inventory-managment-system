require('dotenv').config();
const cors = require('cors')
const express = require('express');
const connectDB = require('./config/db');
const productRoute = require('./routes/productRoute');
const individualLedgerRoutes = require('./routes/individualLedgerRoutes')

const app = express();
connectDB();
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}))
app.use(express.json());

// Routes
app.use('/api/products', productRoute);
app.use('/api',individualLedgerRoutes)

// Error handling
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
