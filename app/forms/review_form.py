from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, URL, NumberRange, Length
from app.models import Business




class ReviewForm(FlaskForm):
    review = TextAreaField('review', validators=[DataRequired('To submit your review, please explain your rating to others.')])
    stars = IntegerField('stars', validators=[DataRequired('To submit your review, please select a star rating for this business.'), NumberRange(min=1, max=5, message='Rating must be between 1 and 5.')])
