CREATE TABLE IF NOT EXISTS donations (
    id SERIAL PRIMARY KEY,
    streamer_id INTEGER REFERENCES streamers(id),
    donor_name VARCHAR(100) NOT NULL,
    donor_email VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'RUB',
    message TEXT,
    payment_id VARCHAR(255) UNIQUE,
    payment_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_donations_streamer_id ON donations(streamer_id);
CREATE INDEX IF NOT EXISTS idx_donations_payment_id ON donations(payment_id);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at DESC);
