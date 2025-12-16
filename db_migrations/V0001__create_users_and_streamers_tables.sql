CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS streamers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    display_name VARCHAR(100) NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    youtube_url VARCHAR(255),
    twitch_url VARCHAR(255),
    telegram_url VARCHAR(255),
    vk_url VARCHAR(255),
    followers_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.0,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS streams (
    id SERIAL PRIMARY KEY,
    streamer_id INTEGER REFERENCES streamers(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    video_id VARCHAR(100),
    thumbnail_url TEXT,
    category VARCHAR(100),
    viewer_count INTEGER DEFAULT 0,
    is_live BOOLEAN DEFAULT FALSE,
    started_at TIMESTAMP,
    ended_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_streamers_user_id ON streamers(user_id);
CREATE INDEX IF NOT EXISTS idx_streams_streamer_id ON streams(streamer_id);
CREATE INDEX IF NOT EXISTS idx_streams_is_live ON streams(is_live);
