from flask import Blueprint, render_template, request
from flask_login import current_user, login_user, logout_user, login_required



from app.models import Business, BusinessImages, Review, ReviewImages, User
from app.forms import BusinessForm



business_routes = Blueprint('business', __name__)

@business_routes.route('/all')
def get_all_business():
    """
    Query for all business and return them in a list of business dictionaries
    """

    businesses = Business.query.all()
    return{'businesses': businesses.to_dict(), 'owner': businesses.owner.to_dict()}


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
            owner_id = form['owner_id'],
            address = form['address'],
            city = form['city'],
            state = form['state'],
            country = form['country'],
            zip = form['zip'],
            name = form['name'],
            description = form['description'],
            price = form['price'],
            phone_number = form['phone_number'],
            business_type = form['business_type'],
            operation_hours = form['operation_hours']
        )

        db.session.add(new_business)
        db.session.commit()
        return new_business.to_dict()


@business_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_business(id):
    """
    Allow the owner to update their business if needed, validations: must be the owner
    if the business, and must be logged in
    """
    pass
