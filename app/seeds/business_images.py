from app.models import db, BusinessImages, environment, SCHEMA




def seed_business_images():
    thristy = BusinessImages(
        business_id=3,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/lli9-Ab43WIlWdBexEL_LA/o.jpg',
        preview=True
    )

    yintang = BusinessImages(
        business_id=2,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/b7587PcPA_yL6xkOSyA5uA/o.jpg',
        preview=True
    )

    nhaTrang = BusinessImages(
        business_id=1,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/I2EprsOem0pnti4LbjGSXw/o.jpg',
        preview=True
    )

    db.session.add(thristy)
    db.session.add(yintang)
    db.session.add(nhaTrang)
    db.session.commit()



def undo_business_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.business_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM business_images")

    db.session.commit()
