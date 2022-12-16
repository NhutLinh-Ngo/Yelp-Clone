import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { getAllBusiness } from '../../store/business';
import { getSingleBusinessReviews } from '../../store/review';
import ReviewStarsDisplay from '../ReviewStarsDisplay';
function setPriceDollarSign(price) {
	if (price < 11) return '$';
	else if (price > 11 && price < 31) return '$$';
	else if (price > 31 && price < 61) return '$$$';
	else if (price > 60) return '$$$$';
}

const ResultBusinessCard = ({ business, loc }) => {
	const previewImage = business.images.filter((image) => image.preview == true);
	const history = useHistory();
	const categories = business.business_type.split(',');

	let shortenedReview = business.singleReview[0].review
		.split(' ')
		.slice(0, 50)
		.join(' ');

	shortenedReview =
		shortenedReview.split(' ').length < 50
			? shortenedReview
			: shortenedReview + '...';

	let price = setPriceDollarSign(Number(business.price));
	return (
		<div className="search-result-found-card">
			<div
				className="search-result-found-image"
				onClick={() => history.push(`/${business.id}`)}
			>
				<img
					src={previewImage[0].url}
					onError={({ currentTarget }) => {
						currentTarget.onerror = null;
						currentTarget.src =
							'https://img.freepik.com/free-vector/red-grunge-style-coming-soon-design_1017-26691.jpg?w=2000';
					}}
				/>
			</div>
			<div className="search-result-found-details">
				<div
					className="search-result-found-name"
					onClick={() => history.push(`/${business.id}`)}
				>
					{business.name}
				</div>
				<div
					className="search-result-found-stars"
					onClick={() => history.push(`/${business.id}`)}
				>
					<ReviewStarsDisplay rating={business.avgRating} />{' '}
					{business.totalReviews} reviews
				</div>
				<div className="search-result-found-categories">
					{categories.map((category) => (
						<NavLink
							to={`/search/?desc=${category.replace(
								/^\s+|\s+$/g,
								''
							)}&loc=${loc}`}
							className="nav-link result-category-link"
						>
							{category}
						</NavLink>
					))}{' '}
					{price}
				</div>
				<div
					className="search-result-found-comment"
					onClick={() => history.push(`/${business.id}`)}
				>
					<i class="fa-regular fa-comment"></i> "{shortenedReview}"
				</div>
			</div>
		</div>
	);
};

export default ResultBusinessCard;
