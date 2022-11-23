from app.models import db, Business, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_businesses():
    yinTang = Business(
        owner_id=2,
        address='1435 S Baldwin Ave',
        city='Arcadia',
        state='CA',
        country='USA',
        zip='91007',
        name='YinTang Spicy Hot Pot',
        description='DIY HOT POT served with house special beef bone soup',
        price=25,
        phone_number='(626) 623-8800',
        business_type='Hot Pot, Noodles, Taiwanese',
        operation_hours='Mon-11:30-21:30,Tue-11:30-21:30,Wed-11:30-21:30,Thru-11:30-21:30,Fri-11:30-21:30,Sat-11:30-21:30,Sun-11:30-21:30'
    )

    Thristy = Business(
        owner_id=3,
        address='17500 Castleton St',
        city='City of Industry',
        state='CA',
        country='USA',
        zip='91748',
        name='Thristy Cow Korean BBQ',
        description='We became Thirsty Cow with a philosophy to stay ahead of others by delivering exceptional service and quality food. We are proud to say that we provide USDA Prime/Choice cuts and daily fresh ingredients. We are a new standard of AYCE.',
        price=45,
        phone_number='(626) 581-0006',
        business_type='Korean, Barbeque',
        operation_hours='Mon-17:00-21:45,Tue-17:00-21:45,Wed-17:00-21:45,Thru-17:00-21:45,Fri-17:00-22:30,Sat-11:00-22:30,Sun-11:00-21:30',
        business_web_page='https://www.thirstycowbbq.com'
    )

    nhaTrang = Business(
        owner_id=2,
        address='311 E Valley Blvd Ste 103',
        city='San Gabriel',
        state='CA',
        country='USA',
        zip='91776',
        name='Quan Ngon Nha Tra',
        description='Seven items menu of best vietnamese cuisine.',
        price=20,
        phone_number='(626) 572-7638',
        business_type='Vietnamese, Chinese',
        operation_hours='Mon-08:00-21:00,Tue-08:00-21:00,Wed-08:00-21:00,Thru-08:00-21:00,Fri-08:00-21:00,Sat-08:00-21:00,Sun-08:00-21:00'
    )

    db.session.add(nhaTrang)
    db.session.add(yinTang)
    db.session.add(Thristy)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM businesses")

    db.session.commit()
