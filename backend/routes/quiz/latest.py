from flask import Blueprint, request, jsonify

latest_bp = Blueprint("latest", __name__)

@latest_bp.route(f"", methods=["GET"])
def latest():
    # TODO: get the latest quiz that IS_ACTIVE
    # retrieve the questions and options
    # return as json

    pass
