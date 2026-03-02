import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    console.error('DATABASE_URL not found in .env');
    process.exit(1);
}

const db = new Pool({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }
});

const schema = `
-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT,
    saveData JSONB DEFAULT '{}'::jsonb,
    netWorth INT8 DEFAULT 0,
    kills INT8 DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
`;

console.log('Applying web-game schema to Supabase project...');

db.query(schema)
    .then(() => {
        console.log('Web-game schema (profiles table) successfully applied!');
        db.end();
    })
    .catch(err => {
        console.error('Failed to apply web-game schema:', err);
        db.end();
        process.exit(1);
    });
