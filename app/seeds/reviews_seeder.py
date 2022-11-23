from app.models import db, Review, environment, SCHEMA




def seed_reviews():
    nhaTrang1 = Review(
        Business_id=1,
        user_id=1,
        review="It doesn't look like much but Quan Ngon Nha Trang is a solid and somewhat hidden gem in San Gabriel. It's tucked away in a small plaza off of Valley Blvd that isn't really noticeable unless you happen to come across it. The restaurant is pretty small but has expanded a bit with more table space for patrons. I ordered the Bun Chay - Vegetarian Vermicelli and it was a solid dish. I will definitely be back in the future to try out their other offerings!",
        stars=5,
    )
    nhaTrang2 = Review(
        Business_id=1,
        user_id=3,
        review="My favorite Bun Bo Hue place ever in 626! I highly recommend this place if you are looking for some good Bun Bo Hue because this place isn't like other Pho places that have it on their menu, but they have it as their specialty. Their recipe is unlike anywhere else I've been to. They recently also expanded their restaurant so there is more seating. This place will have you coming back multiple times.",
        stars=5,
    )
    nhaTrang3 = Review(
        Business_id=1,
        user_id=5,
        review="I've been coming here for almost a decade now, quick meal, I usually get the bun Bo hue,  it does not disappoint.  But I had 2 bad experiences, today I walked in there sat inside and notice an odor, wasn't pleasant smell as a place to eat, so okay I could eat outside.  Couple mins later, got my bowl and I'm ready to eat, looks good, but as I bit into the blood, it was soggy, it wasn't red, It wasn't fresh.  I've been coming here for soo long, but that was just a bad experience, won't be coming back for a while.  There are other places with equally as good bun Bo hue as here.",
        stars=2,
    )

    yinTang1 = Review(
        Business_id=2,
        user_id=3,
        review="This place is an absolute gem. You order by the pound so the more items you put, the more it'll cost.\nThey have plenty of toppings to choose from different types of fish balls to veggies to other miscellaneous items like rice cakes and noodles. \nTheir soup is so flavorful. As you get the spicier version, it can get pretty numbing. I get the mild and it is just the right amount of spicy for me. But beware that it can get pretty spicy since it's in its name. \nYou can get the toppings as a hot pot or dry mix. \nTip: get a Chinese donut and dip it in the soup. It is so delicious!",
        stars=5
    )
    yinTang2 = Review(
        Business_id=2,
        user_id=4,
        review="This place is a gem!\nIt's a raw salad bar type place where you place raw ingredients in a bowl and they cook for you in the back\nThe broth is really flavorful and tasted like less salty tonkatsu\nThey ask for your spice preference and if you want it dry or with soup. Inside has AC so it's still suitable to eat on a hot day. There was a wide variety of items and they sometimes switch it out so if you come again it will be different.\nThe sauce station was messy and some of the bottles were labeled in traditional Chinese only. Choose your own adventure for the sauce",
        stars=4
    )
    yinTang3 = Review(
        Business_id=2,
        user_id=5,
        review="I've been trying several Spicy Hot Pot in the Los Angeles county area, this's the one opened not long ago.  The spicy soup tasted good but the temperature of the soup weren't keeping hot enough, it's easier to get cold if the customers don't eat fast enough.  Plus I don't know why the shop gives less based spicy soup even the customer ordered more than a pound of food!\nThis shop is selling all frozen foods and they cook for you with Spicy Hot bases soup, but you can choose non Spicy...\nOverall, ok but not too great!!  Hope they can improve in the future",
        stars=2
    )
    thristy1 = Review(
        Business_id=3,
        user_id=1,
        review="We came over here for a birthday party  (party of 15)\nOnly 1 server. I was extremely annoyed how they told us to pick 2 meat per table and 2 people per table can only order soup at a time. Holy shit. I will definitely not come here for a group dinner anymore. Services sucks.",
        stars=3
    )
    thristy2 = Review(
        Business_id=3,
        user_id=4,
        review="A solid KBBQ place if you don't want to drive to ktown!\nCame here on a weeknight and still had to wait 15 minutes before getting seated, they are super busy always. My party got the premium menu. The dry aged/wet aged meats are okay. They are definitely really tender and moist, but honestly they weren't our favorite meats.\nOur favorites were: black angus hand cut short rib, premium US beef tongue, thirsty cow black angus galbi, and the USDA prime black angus brisket. All were super tender and yummy.\nThe kimchi dosirak was also really good along with the steamed egg and stews.\nThe waiters are so attentive and efficient. Total price came out to be $60 per person with tax and tip. Not bad. You will definitely be full beyond belief.\nThere is an abundance of parking at this location.",
        stars=4
    )
    thristy3 = Review(
        Business_id=3,
        user_id=2,
        review="We had a great experience here. Arrived on a weekday 30 minutes after it opened and was surprised there was already a 30 min wait for a party of two. The wait was worth it as the service is superb. They don't rush you and are very attentive. They came by often to check if we wanted to order more meat or if we needed any other side dishes.\nThe meats were very flavorful and delicious. A true Korean bbq experience that was high quality.\nOnce we left (around an hour later) there was no more line.\nWe would come back",
        stars=5
    )

    reviews = [nhaTrang1, nhaTrang2, nhaTrang3, yinTang1, yinTang2, yinTang3, thristy1, thristy2, thristy3]
    [db.session.add(review) for review in reviews]
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
