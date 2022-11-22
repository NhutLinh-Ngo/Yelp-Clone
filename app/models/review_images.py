from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime



class ReviewImages(db.Model):
    __tablename__= 'review_images'

    if environment == "production":
        __table_args__={'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("reviews.id")), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    preview = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)



    # relationshup attributes
    review = db.relationship("Review", back_populates="review_images")

    def to_dict(self):
        return{
            'id': self.id,
            'review_id': self.business_id,
            'url': self.url,
            'preview': self.preview
        }
