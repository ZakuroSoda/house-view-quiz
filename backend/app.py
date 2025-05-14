from flask import Flask, request, jsonify
from routes.auth.auth import auth_bp
import sqlite3

conn = sqlite3.connect("database.db")
cursor = conn.cursor()
cursor.execute("PRAGMA foreign_keys = ON;")
cursor.executescript("""
CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sub INTEGER UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    created_at INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE session (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    session_token TEXT NOT NULL,
    created_at INTEGER DEFAULT CURRENT_TIMESTAMP,
    expires_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
""")
conn.commit()
conn.close()

app = Flask(__name__)
app.register_blueprint(auth_bp, url_prefix="/auth")

if __name__ == "__main__":
    app.run(debug=True)