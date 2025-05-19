import jwt
import sqlite3
from uuid import uuid4
from flask import Blueprint, request, jsonify
from typing import TypedDict
from dotenv import load_dotenv
import os
import requests

login_bp = Blueprint("login", __name__)

load_dotenv()

def check_clientId(client_id: str) -> bool:
    return client_id == os.getenv("VITE_GOOGLE_CLIENT_ID")

def load_jwt(token: str) -> tuple[str, str, str]:
    GOOGLE_CERTS_URL = 'https://www.googleapis.com/oauth2/v3/certs'
    certs = requests.get(GOOGLE_CERTS_URL).json()
    unverified_header = jwt.get_unverified_header(token)
    kid = unverified_header['kid']

    public_key = None
    for key in certs['keys']:
        if key['kid'] == kid:
            public_key = jwt.algorithms.RSAAlgorithm.from_jwk(key)
            break

    if public_key is None:
        raise Exception('Unable to find matching key for kid')
    
    decoded = jwt.decode(
        token,
        public_key,
        algorithms=['RS256'],
        audience=os.getenv("VITE_GOOGLE_CLIENT_ID"),
        issuer='https://accounts.google.com'
    )

    try:
        sub, email, name = decoded["sub"], decoded["email"], decoded["name"]
    except KeyError as e:
        raise Exception('Invalid JWT payload')

    return sub, email, name

def handle_login(sub: str, email: str, name: str) -> str:
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("SELECT sub FROM user WHERE sub = ?", (sub,))
    user = cursor.fetchone()

    if user is None:
        # Create new user
        cursor.execute("INSERT INTO user (sub, email, name) VALUES (?, ?, ?)", (sub, email, name))
        user_id = cursor.lastrowid
    else:
        user_id = user[0]

    session_token = str(uuid4())

    cursor.execute("DELETE FROM session WHERE user_id = ?", (user_id,))
    cursor.execute("INSERT INTO session (user_id, session_token) VALUES (?, ?)", (user_id, session_token))
    
    conn.commit()
    conn.close()

    return session_token

@login_bp.route(f"", methods=["POST"])
def login():
    class GoogleCredentialResponse(TypedDict):
        credential: str
        clientId: str
        select_by: str

    google_credential_response: GoogleCredentialResponse = request.json

    # we check the json clientId, but we will recheck the jwt also
    if not check_clientId(google_credential_response["clientId"]):
        return jsonify({"error": "Invalid client ID"}), 401

    # verify and load the JWT
    try:
        sub, email, name = load_jwt(google_credential_response["credential"])
    except Exception as e:
        return jsonify({"error": "Invalid JWT"}), 401
    
    try:
        session_token = handle_login(sub, email, name)
    except sqlite3.Error as e:
        return jsonify({"error": "Database error"}), 500

    return jsonify({
        "session_token": session_token,
    }), 200
    
