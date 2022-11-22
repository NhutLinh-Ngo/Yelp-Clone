from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime



class BusinessImages(db.Model):
    __tablename__= "business_images"

    if environment == "production":
        __table_args__={'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    preview = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    # relationship atrributes
    business = db.relationship("Business", back_populates="business_images")

    def to_dict(self):
        return{
            'id': self.id,
            'business_id': self.business_id,
            'url': self.url,
            'preview': self.preview
        }
