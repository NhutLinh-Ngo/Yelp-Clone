from flask.cli import AppGroup
from .users import seed_users, undo_users
from .business_seeder import seed_businesses, undo_businesses
from .business_images import seed_business_images, undo_business_images
from .reviews_seeder import seed_reviews, undo_reviews
from .review_images_seeder import seed_review_images, undo_review_images

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_business_images()
        undo_review_images()
        undo_reviews()
        undo_businesses()
        undo_users()
    seed_users()
    seed_businesses()
    seed_business_images()
    seed_reviews()
    seed_review_images()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_business_images()
    undo_review_images()
    undo_reviews()
    undo_businesses()
    undo_users()
    # Add other undo functions here
