import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllReviews } from '../../store/review';
import ReviewCard from './reviewCard';
import './FrontPageReviews.css';

const FrontPageReviews = () => {
	const reviews = useSelector((state) =>
		Object.values(state.review.allReviews)
	);
	const dispatch = useDispatch();
	const [selected, setSelected] = useState([]);

	useEffect(() => {
		const get = async () => {
			const allReviews = await dispatch(getAllReviews());
			let shuffled = allReviews.sort(function () {
				return 0.5 - Math.random();
			});
			setSelected(shuffled.slice(0, allReviews.length));
		};
		get();
	}, []);

	if (!selected.length) return null;

	return (
		<div className="recent-reviews-wrapper center">
			<h2>Recent Activity</h2>
			<div className="recent-reviews-container">
				{selected.map((review) => (
					<ReviewCard key={review.id} review={review} />
				))}
			</div>
		</div>
	);
};

export default FrontPageReviews;
