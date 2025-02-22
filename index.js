const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER || 'your_username', // replace with your database username
    host: 'localhost',
    database: process.env.DB_NAME || 'mirebcommercial', // replace with your database name
    password: process.env.DB_PASSWORD || 'your_password', // replace with your database password
    port: 5432,
});

// Test database connection
pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

// API endpoints
app.get('/api/services', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM services');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});