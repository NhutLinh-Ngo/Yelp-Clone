import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getSingleBusinessReviews } from '../../store/review';
import ReviewStarsDisplay from '../ReviewStarsDisplay';

const BusinessReviews = () => {
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
	if (!reviews.length) return <div>Be the first to review this business!</div>;
	return (
		<div className="business-reviews-wrapper">
			{reviews.map((review) => {
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
