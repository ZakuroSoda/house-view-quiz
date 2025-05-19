CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sub TEXT UNIQUE NOT NULL, -- sub cannot be INTEGER as it is too large
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    created_at INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS session (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    session_token TEXT NOT NULL,
    created_at INTEGER DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quiz (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at INTEGER DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS question (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quiz_id INTEGER NOT NULL,
    category TEXT NOT NULL,
    question_text TEXT NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quiz(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS option (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE
);

-- For development: sample quiz
INSERT INTO quiz (title) VALUES ('Weekend of May 3, 2025');

-- Question 1
INSERT INTO question (quiz_id, category, question_text) VALUES (1, 'rumours', '"This is a hostile and political act by Amazon." That was a quote from the White House press secretary in response to a rumor that the company planned to do what?');
INSERT INTO option (question_id, option_text) VALUES (1, 'Offer discounted shipping to Mexico and Canada');
INSERT INTO option (question_id, option_text) VALUES (1, 'Remove MAGA gear from Amazon marketplace');
INSERT INTO option (question_id, option_text) VALUES (1, 'Move the company''s headquarters to Toronto');
INSERT INTO option (question_id, option_text, is_correct) VALUES (1, 'Display the cost of Trump''s tariffs beside the total price', TRUE);

-- Question 2
INSERT INTO question (quiz_id, category, question_text) VALUES (1, 'economy', 'The Bank of Japan made headlines by doing what for the first time in 17 years?');
INSERT INTO option (question_id, option_text) VALUES (2, 'Cutting interest rates to zero');
INSERT INTO option (question_id, option_text) VALUES (2, 'Allowing the yen to float freely');
INSERT INTO option (question_id, option_text, is_correct) VALUES (2, 'Raising interest rates above zero', TRUE);
INSERT INTO option (question_id, option_text) VALUES (2, 'Buying Bitcoin to stabilize the market');

-- Question 3
INSERT INTO question (quiz_id, category, question_text) VALUES (1, 'tech', 'Apple quietly rolled out a change that has privacy advocates concerned. What did they do?');
INSERT INTO option (question_id, option_text) VALUES (3, 'Enabled location tracking by default in Safari');
INSERT INTO option (question_id, option_text) VALUES (3, 'Allowed iPhone data backups to sync with iCloud by default');
INSERT INTO option (question_id, option_text) VALUES (3, 'Started scanning photos for AI training without user consent');
INSERT INTO option (question_id, option_text, is_correct) VALUES (3, 'Bundled Siri recordings into iOS crash reports', TRUE);

-- Question 4
INSERT INTO question (quiz_id, category, question_text) VALUES (1, 'rumours', 'A viral TikTok claimed Google was planning to replace which popular service with an AI chatbot?');
INSERT INTO option (question_id, option_text) VALUES (4, 'Google Translate');
INSERT INTO option (question_id, option_text) VALUES (4, 'Google Maps');
INSERT INTO option (question_id, option_text) VALUES (4, 'Gmail');
INSERT INTO option (question_id, option_text, is_correct) VALUES (4, 'Google Search', TRUE);

-- Question 5
INSERT INTO question (quiz_id, category, question_text) VALUES (1, 'markets', 'After a sudden 18% surge in its stock, what did Reddit reportedly plan to do?');
INSERT INTO option (question_id, option_text) VALUES (5, 'Ban all stock trading discussions');
INSERT INTO option (question_id, option_text) VALUES (5, 'Launch a branded meme ETF');
INSERT INTO option (question_id, option_text) VALUES (5, 'Offer premium users early access to IPO news');
INSERT INTO option (question_id, option_text, is_correct) VALUES (5, 'Sell off some of its own shares', TRUE);

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
