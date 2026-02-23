const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// In test environment, we can use an in-memory database to avoid touching the filesystem
const isTestEnv = process.env.NODE_ENV === 'test';
const dbPath = isTestEnv ? ':memory:' : path.join(dataDir, 'poll.sqlite');

const db = new sqlite3.Database(dbPath);

const initDb = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS options (
                id TEXT PRIMARY KEY,
                text TEXT NOT NULL
            )`, (err) => { if (err) return reject(err); });

            db.run(`CREATE TABLE IF NOT EXISTS votes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                option_id TEXT NOT NULL,
                client_ip TEXT,
                client_cookie TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(option_id) REFERENCES options(id)
            )`, (err) => { if (err) return reject(err); });

            db.get(`SELECT COUNT(*) as count FROM options`, (err, row) => {
                if (err) return reject(err);
                if (row.count === 0) {
                    const stmt = db.prepare(`INSERT INTO options (id, text) VALUES (?, ?)`);
                    stmt.run('a', '0 to 1');
                    stmt.run('b', '2 to 3');
                    stmt.run('c', '4 or more', (err) => {
                        if (err) return reject(err);
                        stmt.finalize();
                        resolve();
                    });
                } else {
                    resolve();
                }
            });
        });
    });
};

const getResults = () => {
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT o.id, o.text, COUNT(v.id) as votes 
            FROM options o
            LEFT JOIN votes v ON o.id = v.option_id
            GROUP BY o.id
            ORDER BY o.id
        `, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const hasVoted = (ip, cookie) => {
    return new Promise((resolve, reject) => {
        if (!ip && !cookie) return resolve(false);
        db.get(
            `SELECT COUNT(*) as count FROM votes WHERE (client_ip = ? AND client_ip IS NOT NULL) OR (client_cookie = ? AND client_cookie IS NOT NULL)`,
            [ip, cookie],
            (err, row) => {
                if (err) reject(err);
                else resolve(row.count > 0);
            }
        );
    });
};

const addVote = (optionId, ip, cookie) => {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO votes (option_id, client_ip, client_cookie) VALUES (?, ?, ?)`,
            [optionId, ip, cookie],
            function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
};

const resetVotes = () => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM votes`, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

// Expose a closeDB for testing
const closeDb = () => {
    return new Promise((resolve, reject) => {
        db.close(err => {
            if (err) reject(err);
            else resolve();
        });
    });
}

module.exports = {
    db,
    initDb,
    getResults,
    hasVoted,
    addVote,
    resetVotes,
    closeDb
};
