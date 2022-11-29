from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, BooleanField
from wtforms.validators import DataRequired, URL, NumberRange, Length




class BusinessImageForm(FlaskForm):
    business_id = IntegerField('business_id', validators=[DataRequired()])
    preview = BooleanField('preview')
    url = StringField('url')
