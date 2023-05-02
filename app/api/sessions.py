from datetime import timedelta

from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required

from app.models import User, db
from app.forms import LoginForm, SignUpForm
from app.utils import validation_errors_to_error_messages, restore_user

sessions = Blueprint('sessions', __name__)


@sessions.route('/')
def restore():
    """Restore session user"""
    return jsonify(user=restore_user())


@sessions.route('/', methods=['POST'])
def login():
    """Logs a user in"""
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually so validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['credential']).first() or User.query.filter(User.username == form.data['credential']).first()
        login_user(user)
        return jsonify(user=user.to_dict())
    return jsonify(errors=validation_errors_to_error_messages(form.errors)), 401


@sessions.route('/', methods=['DELETE'])
def logout():
    """Logs a user out"""
    logout_user()
    return jsonify(message='User logged out')


@sessions.route('/users', methods=['POST'])
def signup():
    """Creates a new user and logs them in"""
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return jsonify(user=user.to_dict())
    return jsonify(errors=validation_errors_to_error_messages(form.errors)), 401
