from flask import Blueprint, jsonify
from flask_login import login_required

from app.models import User
from app.utils import validation_errors_to_error_messages, require_auth

users = Blueprint('users', __name__)

@users.route('/')
@login_required
def get_users():
    """Query for all users and returns them in a list of user dictionaries"""
    users = User.query.all()
    return jsonify(users=[user.to_dict() for user in users])


@users.route('/<int:id>')
@login_required
def get_user(id):
    """Query for a user by id and returns that user in a dictionary"""
    user = User.query.get(id)
    return jsonify(user=user.to_dict())
