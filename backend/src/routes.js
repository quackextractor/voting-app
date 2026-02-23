const express = require('express');
const { getResults, hasVoted, addVote, resetVotes } = require('./database');
const crypto = require('crypto');

const router = express.Router();

router.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const getClientIdentifiers = (req, res) => {
    const ip = req.ip || req.connection.remoteAddress;
    let cookie = req.cookies.clientId;
    if (!cookie) {
        cookie = crypto.randomUUID();
        // Sets a cookie for 1 year
        res.cookie('clientId', cookie, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true });
    }
    return { ip, cookie };
};

router.get('/results', async (req, res) => {
    try {
        const results = await getResults();
        res.json({ options: results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.post('/vote', async (req, res) => {
    try {
        const { optionId } = req.body;
        if (!['a', 'b', 'c'].includes(optionId)) {
            return res.status(400).json({ success: false, message: 'Invalid option' });
        }

        const { ip, cookie } = getClientIdentifiers(req, res);

        const voted = await hasVoted(ip, cookie);
        if (voted) {
            return res.status(403).json({ success: false, message: 'You have already voted' });
        }

        await addVote(optionId, ip, cookie);
        const results = await getResults();

        res.json({ success: true, options: results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.post('/reset', async (req, res) => {
    try {
        const { token } = req.body;
        const adminToken = process.env.ADMIN_RESET_TOKEN || 'admin123';

        if (token !== adminToken) {
            return res.status(403).json({ success: false, message: 'Invalid token' });
        }

        await resetVotes();
        res.json({ success: true, message: 'Poll reset' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
