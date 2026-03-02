import sqlite3 from 'sqlite3';
import pg from 'pg';
const { Pool } = pg;
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isTestEnv = process.env.NODE_ENV === 'test';
const databaseUrl = process.env.DATABASE_URL;

let db;
let isPostgres = false;

if (databaseUrl && !isTestEnv) {
    db = new Pool({
        connectionString: databaseUrl,
        ssl: { rejectUnauthorized: false }
    });
    isPostgres = true;
    console.log('Using PostgreSQL');
} else {
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    const dbPath = isTestEnv ? ':memory:' : path.join(dataDir, 'poll.sqlite');
    db = new sqlite3.Database(dbPath);
    console.log(`Using SQLite (${isTestEnv ? 'memory' : 'file'})`);
}

const runQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        if (isPostgres) {
            db.query(sql, params, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        } else {
            db.run(sql, params, function (err) {
                if (err) reject(err);
                else resolve({ lastID: this.lastID, changes: this.changes });
            });
        }
    });
};

const getQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        if (isPostgres) {
            db.query(sql, params, (err, res) => {
                if (err) reject(err);
                else resolve(res.rows[0]);
            });
        } else {
            db.get(sql, params, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        }
    });
};

const allQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        if (isPostgres) {
            db.query(sql, params, (err, res) => {
                if (err) reject(err);
                else resolve(res.rows);
            });
        } else {
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        }
    });
};

export const initDb = async () => {
    if (isPostgres) {
        await db.query(`CREATE TABLE IF NOT EXISTS options (
            id TEXT PRIMARY KEY,
            text TEXT NOT NULL
        )`);

        await db.query(`CREATE TABLE IF NOT EXISTS votes (
            id SERIAL PRIMARY KEY,
            option_id TEXT NOT NULL REFERENCES options(id),
            client_ip TEXT,
            client_cookie TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )`);

        const { rows } = await db.query(`SELECT COUNT(*) as count FROM options`);
        if (parseInt(rows[0].count) === 0) {
            await db.query(`INSERT INTO options (id, text) VALUES 
                ('a', '0 to 1'),
                ('b', '2 to 3'),
                ('c', '4 or more')`);
        }
    } else {
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
    }
};

export const getResults = () => {
    const pgSql = `
        SELECT o.id, o.text, COUNT(v.id)::int as votes 
        FROM options o
        LEFT JOIN votes v ON o.id = v.option_id
        GROUP BY o.id, o.text
        ORDER BY o.id
    `;
    const sqliteSql = `
        SELECT o.id, o.text, COUNT(v.id) as votes 
        FROM options o
        LEFT JOIN votes v ON o.id = v.option_id
        GROUP BY o.id
        ORDER BY o.id
    `;
    return allQuery(isPostgres ? pgSql : sqliteSql);
};

export const hasVoted = async (ip, cookie) => {
    if (!ip && !cookie) return false;
    const pgSql = `SELECT COUNT(*) as count FROM votes WHERE (client_ip = $1 AND client_ip IS NOT NULL) OR (client_cookie = $2 AND client_cookie IS NOT NULL)`;
    const sqliteSql = `SELECT COUNT(*) as count FROM votes WHERE (client_ip = ? AND client_ip IS NOT NULL) OR (client_cookie = ? AND client_cookie IS NOT NULL)`;

    const row = await getQuery(isPostgres ? pgSql : sqliteSql, [ip, cookie]);
    return parseInt(row.count) > 0;
};

export const addVote = async (optionId, ip, cookie) => {
    if (isPostgres) {
        const res = await db.query(
            `INSERT INTO votes (option_id, client_ip, client_cookie) VALUES ($1, $2, $3) RETURNING id`,
            [optionId, ip, cookie]
        );
        return res.rows[0].id;
    } else {
        const res = await runQuery(
            `INSERT INTO votes (option_id, client_ip, client_cookie) VALUES (?, ?, ?)`,
            [optionId, ip, cookie]
        );
        return res.lastID;
    }
};

export const resetVotes = () => {
    return runQuery(`DELETE FROM votes`);
};

export const closeDb = () => {
    return new Promise((resolve, reject) => {
        if (isPostgres) {
            db.end(err => {
                if (err) reject(err);
                else resolve();
            });
        } else {
            db.close(err => {
                if (err) reject(err);
                else resolve();
            });
        }
    });
};

export const getTotalVotes = async () => {
    const row = await getQuery(`SELECT COUNT(*) as count FROM votes`);
    return parseInt(row.count);
};

export default {
    db,
    initDb,
    getResults,
    hasVoted,
    addVote,
    resetVotes,
    getTotalVotes,
    closeDb
};
