import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const ReviewCard = ({ review }) => {
	const businesses = useSelector((state) => state.business.allBusinesses);
	const thisBusiness = businesses[review.business_id];
	const reviewImage = review.images?.slice(0, 2);
	const twoPictures = reviewImage.length;
	const displayShort = review.review.split(' ').slice(0, 30).join(' ');
	const displayLong = review.review.split(' ').slice(0, 40).join(' ');
	return (
		<div className="review-card-card box">
			<div className="reviewer-card-name">
				{review.user.first_name} {review.user.last_name[0]}.
			</div>
			<NavLink
				to={`/${thisBusiness.id}`}
				className="nav-link review-card-nav-link"
			>
				{thisBusiness.name}
			</NavLink>
			{twoPictures > 0 && (
				<div
					className={`review-card-image-container ${
						twoPictures > 1 ? 'two-pic' : ''
					}`}
				>
					{reviewImage.map((image) => (
						<img src={image.url} />
					))}
				</div>
			)}
			<div className="review-card-review-container">
				<div className="review-card-review">
					{reviewImage.length > 0 && (
						<div id="smaller-text">{displayShort}...</div>
					)}
					{!reviewImage.length && <div>{displayLong}...</div>}
				</div>
			</div>
		</div>
	);
};

export default ReviewCard;
