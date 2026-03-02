import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDb } from './database.js';
import apiRoutes from './routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || true,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Trust proxy for IP tracking
app.set('trust proxy', true);

// Health check
app.get('/api/health', async (req, res) => {
    const { getTotalVotes } = await import('./database.js');
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

// Static pages
app.get('/monitor', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/monitor.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/admin.html'));
});

app.get('/docs', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/docs.html'));
});

// API Routes
app.use('/api', apiRoutes);

// Export for Vercel
export default app;
