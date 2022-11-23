from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


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
    business_reviews = db.relationship("Review", back_populates="business")
        # business's images
    business_images = db.relationship("BusinessImages", back_populates="business")

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
            'updated_at': self.updated_at
        }

    def to_dict_cord(self):
        return{
            'id': self.id,
            'lat': self.lat,
            'lng': self.lng
        }
