import 'dotenv/config';
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;
const databaseUrl = process.env.DATABASE_URL;

if (databaseUrl) {
    const db = new Pool({
        connectionString: databaseUrl,
        ssl: { rejectUnauthorized: false }
    });
    const schemaPath = path.join(__dirname, 'api', 'supabase_schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    db.query(schema)
        .then(() => {
            console.log('Schema applied directly to Supabase');
            db.end();
        })
        .catch(err => {
            console.error('Failed to apply schema:', err);
            db.end();
            process.exit(1);
        });
} else {
    console.log('No DATABASE_URL found.');
}
