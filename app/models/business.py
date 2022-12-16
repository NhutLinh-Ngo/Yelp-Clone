from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .review import Review
import random

class Business(db.Model):
    __tablename__ = 'businesses'

    if environment == "production":
        __table_args__={'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    zip = db.Column(db.String(20), nullable=False)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    phone_number = db.Column(db.String(14), nullable=False)
    business_type = db.Column(db.String(255), nullable=False)
    business_web_page = db.Column(db.String(255))
    operation_hours = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # relationship attributes
        # owner of the business
    owner = db.relationship("User", back_populates="user_businesses")
        # business's reviews
    business_reviews = db.relationship("Review", back_populates="business", cascade='all, delete')
        # business's images
    business_images = db.relationship("BusinessImages", back_populates="business", cascade='all, delete')

    def to_dict(self):
        return{
            'id': self.id,
            'owner_id': self.owner_id,
            'address': self.address,
            'state': self.state,
            'city': self.city,
            'country': self.country,
            'zip': self.zip,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'phone_number': self.phone_number,
            'business_type': self.business_type,
            'business_web_page': self.business_web_page,
            'operation_hours': self.operation_hours,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'images': self.get_images(),
            'owner': self.owner.to_dict_owner(),
            'avgRating': self.avg_rating(),
            'lat': self.lat,
            'lng': self.lng,
            'totalReviews': self.total_reviews(),
            'singleReview': self.get_a_review()
        }

    def to_dict_single(self):
        return{
            'id': self.id,
            'owner_id': self.owner_id,
            'address': self.address,
            'state': self.state,
            'city': self.city,
            'country': self.country,
            'zip': self.zip,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'phone_number': self.phone_number,
            'business_type': self.business_type,
            'business_web_page': self.business_web_page,
            'operation_hours': self.operation_hours,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'avgRating': self.avg_rating(),
            'allImages': self.get_all_images_on_business(),
            'totalReviews': self.total_reviews(),
            'lat': self.lat,
            'lng': self.lng
        }

    def to_dict_cord(self):
        return{
            'id': self.id,
            'lat': self.lat,
            'lng': self.lng
        }

    def avg_rating(self):
        if self.business_reviews:
            return round(sum([review.stars for review in self.business_reviews]) / len(self.business_reviews),2)
        return 0


    def get_images(self):
        return [image.to_dict() for image in self.business_images]

    def total_reviews(self):
        return len(self.business_reviews)

    def get_a_review(self):
        if self.business_reviews:
            reviews = [review.to_dict() for review in self.business_reviews]
            return random.choices(reviews)
        return []



    def get_all_images_on_business(self):
        """
        Using relationship attributes, query for all images that related to the business
        and reduce to only the URL for easy display in the front end later.
        """
        images_url_by_owner = [each_image['url'] for each_image in [image.to_dict() for image in self.business_images]]

        # Get images for each review
        images_from_reviews = [review.get_review_images() for review in self.business_reviews]

        #extract url for all images on each review
        images_url_from_reviews = [ image['url']  for review_images in images_from_reviews for image in review_images]

        # concantenate images from owner and all reviews
        all_images = images_url_from_reviews + images_url_by_owner
        return all_images
