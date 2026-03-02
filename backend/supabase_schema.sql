-- Create options table
CREATE TABLE IF NOT EXISTS options (
    id TEXT PRIMARY KEY,
    text TEXT NOT NULL
);

-- Create votes table
CREATE TABLE IF NOT EXISTS votes (
    id SERIAL PRIMARY KEY,
    option_id TEXT NOT NULL REFERENCES options(id),
    client_ip TEXT,
    client_cookie TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial options
INSERT INTO options (id, text) VALUES ('a', '0 to 1') ON CONFLICT (id) DO NOTHING;
INSERT INTO options (id, text) VALUES ('b', '2 to 3') ON CONFLICT (id) DO NOTHING;
INSERT INTO options (id, text) VALUES ('c', '4 or more') ON CONFLICT (id) DO NOTHING;
