from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, URL, NumberRange, Length
from app.models import Business



class BusinessForm(FlaskForm):
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired('Please enter an address for your business')])
    city = StringField('city', validators=[DataRequired('Please enter a city.')])
    country = StringField('country', validators=[DataRequired('Please enter a country.')])
    state = StringField('state', validators=[DataRequired('Please enter a state.')])
    zip = StringField('zip', validators=[DataRequired('Please enter Postal Code.')])
    name = StringField('name', validators=[DataRequired('Please enter your business name.')])
    description = TextAreaField('description', validators=[DataRequired('Please tell everyone about your business.')])
    phone_number = StringField('phone_number', validators=[DataRequired('Please enter a phone number.')])
    business_type = StringField('business_type', validators=[DataRequired('what do you specialize in? (Japanese cuisine, Italian...).')])
    operation_hours = StringField('operation_hours', validators=[DataRequired('Let everyone know about your business hours.')])
    price = IntegerField('price', validators=[DataRequired('Please enter a price.')])
    business_web_page = StringField('business_web_page')
