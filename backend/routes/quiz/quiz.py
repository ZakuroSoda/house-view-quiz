from flask import Blueprint

from routes.quiz.latest import latest_bp

quiz_bp = Blueprint("quiz", __name__)
quiz_bp.register_blueprint(latest_bp, url_prefix="/latest")
