from flask import Blueprint, render_template, request
from flask_login import login_required



from app.models import Business, BusinessImages, Review, ReviewImages, User



business_routes = Blueprint('business', __name__)

@business_routes.route('/all')
def get_all_business():
    """
    Query for all business and return them in a list of business dictionaries
    """

    businesses = Business.query.all()
    return{'businesses': [business.to_dict() for business in businesses]}
