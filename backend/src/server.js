require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { initDb } = require('./database');
const apiRoutes = require('./routes');

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Trust proxy to get real IP if behind a reverse proxy (useful for production)
app.set('trust proxy', true);

const path = require('path');

app.get('/health', async (req, res) => {
    const { getTotalVotes } = require('./database');
    try {
        const totalVotes = await getTotalVotes();
        res.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            totalVotes
        });
    } catch (err) {
        res.json({ status: 'ok', timestamp: new Date().toISOString(), uptime: process.uptime() });
    }
});

app.get('/monitor', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/monitor.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/admin.html'));
});

app.use('/api', apiRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Catch-all route to serve the React app for non-API requests
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

// Define startServer function to allow easy testing
const startServer = async (port = process.env.PORT || 3000) => {
    await initDb();

    return new Promise((resolve) => {
        const server = app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            resolve(server);
        });
    });
};

// If run directly, start the server
if (require.main === module) {
    startServer();
}

module.exports = { app, startServer };
