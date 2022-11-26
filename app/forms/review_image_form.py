from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, URL, NumberRange, Length



class ReviewImageForm(FlaskForm):
    review_id = IntegerField('review_id', validators=[DataRequired()])
    url = StringField('url', validators=[URL(message='Pleas enter a valid URL to your image.')])
