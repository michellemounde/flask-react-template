from flask import jsonify
from flask_login import current_user

def restore_user():
    """Authenticates a user"""
    if current_user and current_user.is_authenticated:
        return current_user.to_dict()
    return None


def require_auth():
    """Returns unauthorized JSON when flask-login authentication fails"""
    return jsonify(errors={'authentication': 'Authentication required'}), 401
