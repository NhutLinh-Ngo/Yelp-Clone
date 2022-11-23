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

    db.session.add(yinTang)
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
