from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime



class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__={'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    Business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    review = db.Column(db.String(5000), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    # relationship attributes
    user = db.relationship("User", back_populates="user_reviews")
    business = db.relationship("Business", back_populates="business_reviews")
    review_images = db.relationship("ReviewImages", back_populates="review")

    def to_dict(self):
        return{
            'id': self.id,
            'business_id': self.business_id,
            'user.id': self.user_id,
            'stars': self.stars,
            'review': self.review,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
