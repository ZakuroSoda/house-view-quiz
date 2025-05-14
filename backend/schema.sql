DROP TABLE IF EXISTS user, session, quiz, question, quiz_attempt, attempt_questions;

CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sub INTEGER UNIQUE NOT NULL,
    email TEXT NOT NULL,
    name TEXT,
    created_at INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE session (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    session_token TEXT NOT NULL,
    created_at INTEGER DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- CREATE TABLE quiz (
--     id SERIAL PRIMARY KEY,
--     title VARCHAR(255) NOT NULL,
--     week_number INTEGER,  -- for weekly drops
--     is_active BOOLEAN DEFAULT TRUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- lets format for YYYYMMDD
-- );

-- CREATE TABLE question (
--     id SERIAL PRIMARY KEY,
--     quiz_id INTEGER REFERENCES quiz(id) ON DELETE CASCADE,
--     category VARCHAR(50) NOT NULL,  -- e.g., "crypto", "macro", etc.AFTER
--     question_text TEXT NOT NULL,
--     options TEXT[] NOT NULL,  -- array of options
--     correct_option INTEGER NOT NULL,  -- index of correct option
-- );

-- CREATE TABLE quiz_attempt (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
--     quiz_id INTEGER REFERENCES quiz(id) ON DELETE CASCADE,
--     portfolio_allocation JSONB,  -- e.g. {"crypto": 0.3, "macro": 0.2, ...}
--     final_score FLOAT,
--     finished_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE attempt_questions (
--     id SERIAL PRIMARY KEY,
--     attempt_id INTEGER REFERENCES quiz_attempts(id) ON DELETE CASCADE,
--     question_id INTEGER REFERENCES questions(id),
--     chosen_option INTEGER,
--     leverage_multiplier FLOAT DEFAULT 1.0,
--     is_correct BOOLEAN,
--     impact_score FLOAT  -- how much it changed the portfolio value
-- );
