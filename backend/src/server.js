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

app.use('/api', apiRoutes);

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
