from app.models import db, ReviewImages, environment, SCHEMA




def seed_review_images():
    review_image_1 = ReviewImages(
        review_id=1,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/QYaaF_MWTf-DmLPqCKJalg/o.jpg',
    )
    review_image_2 = ReviewImages(
        review_id=2,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/8kAF1uL7-XEEgc1qWzzPfQ/o.jpg',
    )
    review_image_3 = ReviewImages(
        review_id=4,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/tSkByKaq3TvOZpeF0BUFzQ/o.jpg',
    )
    review_image_4 = ReviewImages(
        review_id=4,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/AgwMuG_HXcSiaPr5Ebyu_A/o.jpg',
    )
    review_image_5 = ReviewImages(
        review_id=4,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/6Vwsd5OrmiJWvpZzoTTBeQ/o.jpg',
    )
    review_image_6 = ReviewImages(
        review_id=4,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/HB3kkUvQ14BGQ1KIq_4_sg/o.jpg',
    )
    review_image_7 = ReviewImages(
        review_id=5,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/oRBANhbG6_0MaVrjuiaSNA/o.jpg',
    )
    review_image_8 = ReviewImages(
        review_id=5,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/LQIj9kiw2OcsqHhx9BUc8w/o.jpg',
    )
    review_image_9 = ReviewImages(
        review_id=5,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/ecidpuQtv65iDbDoZ8WZ7w/o.jpg',
    )
    review_image_10 = ReviewImages(
        review_id=8,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/Fwtuse94tv4qpi7_dU5GqQ/o.jpg',
    )
    review_image_11 = ReviewImages(
        review_id=8,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/1-JJEur2LRR3ypUrUzzHuw/o.jpg',
    )
    review_image_12 = ReviewImages(
        review_id=7,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/j5wp22lxCmf0VzStZKtUqg/o.jpg',
    )


    review_images = [review_image_1, review_image_2, review_image_3, review_image_4, review_image_5, review_image_6, review_image_7, review_image_8, review_image_9, review_image_10, review_image_11, review_image_12]

    [db.session.add(image) for image in review_images]
    db.session.commit()




def undo_review_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.review_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM review_images")

    db.session.commit()
