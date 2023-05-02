from flask_sqlalchemy import SQLAlchemy

import os
debug = os.getenv("FLASK_DEBUG")
SCHEMA = os.environ.get("SCHEMA")


db = SQLAlchemy()

# helper function for adding prefix to foreign key column references in production
def add_prefix_for_prod(attr):
    if debug == "False":
        return f"{SCHEMA}.{attr}"
    else:
        return attr
