from flask import Blueprint

from routes.auth.login import login_bp

auth_bp = Blueprint("auth", __name__)
auth_bp.register_blueprint(login_bp, url_prefix="/login")
