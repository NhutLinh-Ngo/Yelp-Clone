from flask import Blueprint, render_template, request
from flask_login import current_user, login_user, logout_user, login_required



from app.models import Business, BusinessImages, Review, ReviewImages, User



review_routes = Blueprint('review', __name__)



@review_routes.route('/all')
def get_all_reviews():
    """
    query for all reviews
    """
    reviews = Review.query.all()
    res = []
    for review in reviews:
        json_review = review.to_dict()
        json_review['user'] = review.get_reviewer()
        json_review['images'] = review.get_review_images()
        res.append(json_review)
    return {'reviews': res}
