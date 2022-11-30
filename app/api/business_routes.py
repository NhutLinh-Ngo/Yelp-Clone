from flask import Blueprint, render_template, request
from flask_login import current_user, login_user, logout_user, login_required



from app.models import Business, BusinessImages, Review, ReviewImages, User, db
from app.forms import BusinessForm, ReviewForm, BusinessImageForm
from sqlalchemy import orm
from .auth_routes import validation_errors_to_error_messages


business_routes = Blueprint('business', __name__)

@business_routes.route('/all')
def get_all_business():
    """
    Query for all business and return them in a list of business dictionaries
    also query for preview image and the owner
    """
    businesses = Business.query.all()
    return{'businesses': [business.to_dict() for business in businesses]}


@business_routes.route('', methods=['POST'])
@login_required
def create_new_business():
    """
    Allow user a logged in user to create their new business
    """
    user_id = current_user.id
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_business = Business(
            owner_id = form.data['owner_id'],
            address = form.data['address'],
            city = form.data['city'],
            state = form.data['state'],
            country = form.data['country'],
            zip = form.data['zip'],
            name = form.data['name'],
            description = form.data['description'],
            price = form.data['price'],
            phone_number = form.data['phone_number'],
            business_type = form.data['business_type'],
            operation_hours = form.data['operation_hours']
        )

        db.session.add(new_business)
        db.session.commit()
        return new_business.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@business_routes.route('/<int:id>')
def get_business_by_id(id):
    """
    query for a single business information based on their Id
    includes all images from reviews and images that business owner posted
    """
    single_business = Business.query.get(id)
    return {'business': single_business.to_dict_single()}

@business_routes.route('/<int:id>/delete', methods=['DELETE'])
def DELETE_business_by_id(id):
    """
    DELETE BUSINESS BASED ON ID
    """
    single_business = Business.query.get(id)
    db.session.delete(single_business)
    db.session.commit()
    return {'message': 'DELETE SUCCESSFUL'}


@business_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_business(id):
    """
    Allow the owner to update their business if needed, validations: must be the owner
    if the business, and must be logged in
    """
    single_business = Business.query.get(id)
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if single_business:
        if form.validate_on_submit():
            single_business.address = form.data['address']
            single_business.city = form.data['city']
            single_business.state = form.data['state']
            single_business.country = form.data['country']
            single_business.zip = form.data['zip']
            single_business.name = form.data['name']
            single_business.description = form.data['description']
            single_business.price = form.data['price']
            single_business.phone_number = form.data['phone_number']
            single_business.business_type = form.data['business_type']
            single_business.operation_hours = form.data['operation_hours']
            single_business.business_web_page = form.data['business_web_page']
            db.session.commit()
            return single_business.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    # return {'errors': 'business does not exsits'}, 404

@business_routes.route('/<int:id>/reviews')
def get_reviews_on_business(id):
    """
    query for all the reviews on the business
    """
    business = Business.query.get(id)
    res = []
    if business:
        reviews = business.business_reviews
        for review in reviews:
            res_review = review.to_dict()
            review_images = review.get_review_images()
            res_review['images'] = review_images
            res_review['reviewer'] = review.get_reviewer()
            res.append(res_review)
    return {'reviews': res}


@business_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def create_new_review_for_business(id):
    """
    create new review for business
    """
    business = Business.query.get(id)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if business:
        if form.validate_on_submit():
            new_review = Review(
                Business_id = form.data['Business_id'],
                user_id = form.data['user_id'],
                review = form.data['review'],
                stars = form.data['stars']
            )
            db.session.add(new_review)
            db.session.commit()
            return new_review.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': {'message':'business does not exists.'}}, 404


@business_routes.route('/<int:id>/images', methods=['POST'])
@login_required
def add_business_images(id):
    """
    add images posted by owner.
    """
    form = BusinessImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_Image = BusinessImages(
            business_id=form.data['business_id'],
            preview = form.data['preview'],
            url = form.data['url']
        )
        db.session.add(new_Image)
        db.session.commit()
        return new_Image.to_dict()
    return {'error': 'Image Error'}
