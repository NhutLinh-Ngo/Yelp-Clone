import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getSingleBusinessReviews } from '../../store/review';
import ReviewStarsDisplay from '../ReviewStarsDisplay';

const BusinessReviews = ({ business }) => {
	const { businessId } = useParams();
	const reviews = useSelector((state) =>
		Object.values(state.review.businessReviews)
	);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	useEffect(() => {
		const get = async () => {
			dispatch(getSingleBusinessReviews(businessId));
		};
		get();
	}, []);
	let one = 0;
	let two = 0;
	let three = 0;
	let four = 0;
	let five = 0;
	reviews.forEach((review) => {
		if (review.stars == 5) five++;
		if (review.stars == 4) four++;
		if (review.stars == 3) three++;
		if (review.stars == 2) two++;
		if (review.stars == 1) one++;
	});
	if (one !== 0) one = (one / business.totalReviews) * 100;
	if (two !== 0) two = (two / business.totalReviews) * 100;
	if (three !== 0) three = (three / business.totalReviews) * 100;
	if (four !== 0) four = (four / business.totalReviews) * 100;
	if (five !== 0) five = (five / business.totalReviews) * 100;

	if (!reviews.length) return <div>Be the first to review this business!</div>;
	return (
		<div className="business-reviews-wrapper">
			<div className="business-overall-review-bar">
				<div className="overall-review-stars">
					<div style={{ fontWeight: 'bold', fontSize: '20px' }}>
						Overall Rating
					</div>
					<div style={{ fontSize: '40px' }}>
						<ReviewStarsDisplay rating={business.avgRating} />
					</div>
					<div style={{ fontWeight: 'bold', fontSize: '15px' }}>
						{business.totalReviews} reviews
					</div>
				</div>
				<div className="business-over-bar-wrapper">
					<div className="stars-bar-container">
						<div className="stars-bar-title">5 stars</div>
						<div className="stars-bar-gray">
							<div
								className="b-fiveStars stars-bar-color"
								style={{ width: `${five}%` }}
							></div>
						</div>
					</div>
					<div className="stars-bar-container">
						<div className="stars-bar-title">4 stars</div>
						<div className="stars-bar-gray">
							<div
								className="b-fourStars stars-bar-color"
								style={{ width: `${four}%` }}
							></div>
						</div>
					</div>
					<div className="stars-bar-container">
						<div className="stars-bar-title">3 stars</div>
						<div className="stars-bar-gray">
							<div
								className="b-threeStars stars-bar-color"
								style={{ width: `${three}%` }}
							></div>
						</div>
					</div>
					<div className="stars-bar-container">
						<div className="stars-bar-title">2 stars</div>
						<div className="stars-bar-gray">
							<div
								className="b-twoStars stars-bar-color"
								style={{ width: `${two}%` }}
							></div>
						</div>
					</div>
					<div className="stars-bar-container">
						<div className="stars-bar-title  onestar-div">1 star</div>
						<div className="stars-bar-gray">
							<div
								className="b-oneStar stars-bar-color"
								style={{ width: `${one}%` }}
							></div>
						</div>
					</div>
				</div>
			</div>
			{reviews.reverse().map((review) => {
				const reviewDate = new Date(review.created_at).toLocaleDateString();
				const show = review.reviewer.id == user?.id;
				return (
					<div className="business-review-card-container">
						<div id="card-reviewer-name">
							<div className="user-review-icon">
								<i class="fa-regular fa-circle-user"></i>
							</div>
							{review.reviewer.first_name} {review.reviewer.last_name[0]}.
							{show && (
								<NavLink
									to={`/${businessId}/reviews/${review.id}/edit`}
									className="nav-link edit-review-link"
								>
									<i class="fa-solid fa-pen-to-square"></i>
								</NavLink>
							)}
						</div>
						<div id="card-review-stars">
							<ReviewStarsDisplay rating={review.stars} />{' '}
							<p id="card-review-date">{reviewDate}</p>
						</div>
						<div id="card-review-review">{review.review}</div>
						{review.images.length > 0 && (
							<div id="card-review-images">
								{review.images.map((image, i) => {
									if (i < 4) {
										return (
											<img
												className="card-review-single-image"
												src={image.url}
												onError={({ currentTarget }) => {
													currentTarget.onerror = null;
													currentTarget.src =
														'https://img.freepik.com/free-vector/red-grunge-style-coming-soon-design_1017-26691.jpg?w=2000';
												}}
											/>
										);
									}
								})}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default BusinessReviews;
