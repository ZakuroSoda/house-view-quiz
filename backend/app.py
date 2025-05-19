from flask import Flask, request, jsonify
from flask_cors import CORS
from routes.auth.auth import auth_bp
from routes.quiz.quiz import quiz_bp
import sqlite3

conn = sqlite3.connect("database.db")
cursor = conn.cursor()
cursor.execute("PRAGMA foreign_keys = ON;")
schema = open("schema.sql", "r").read()
cursor.executescript(schema)
conn.commit()
conn.close()

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(quiz_bp, url_prefix="/api/quiz")

if __name__ == "__main__":
    app.run(debug=True)