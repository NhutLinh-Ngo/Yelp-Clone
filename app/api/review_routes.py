from flask import Blueprint, render_template, request
from flask_login import current_user, login_user, logout_user, login_required



from app.models import Business, BusinessImages, Review, ReviewImages, User,db
from app.forms import ReviewImageForm
from .auth_routes import validation_errors_to_error_messages


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




@review_routes.route('/<int:id>/images', methods=['POST'])
@login_required
def add_review_images(id):
    """
    adding review image to a review if it exist, return error if review does not
    exists
    """
    form = ReviewImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    review = Review.query.get(id)

    if review:
        if form.validate_on_submit():
            new_review_image = ReviewImages(
                review_id = form.data['review_id'],
                url = form.data['url']
            )

            db.session.add(new_review_image)
            db.session.commit()
            return new_review_image.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': {'message':'review does not exists.'}}, 404
