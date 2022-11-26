from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, URL, NumberRange, Length
from app.models import Business




class ReviewForm(FlaskForm):
    Business_id = IntegerField('Business_id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    review = TextAreaField('review', validators=[DataRequired('Please tell everyone about your experience')])
    stars = IntegerField('stars', validators=[DataRequired('Please enter review rating.'), NumberRange(min=1, max=5, message='Rating must be between 1 and 5.')])
