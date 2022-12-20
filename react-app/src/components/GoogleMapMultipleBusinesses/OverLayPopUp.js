import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import ReviewStarsDisplay from '../ReviewStarsDisplay';
const CustomMarker = ({ business, idx, selectedBusiness }) => {
	const previewImage = business.images.filter((image) => image.preview == true);
	const categories = business.business_type.split(',');
	const history = useHistory();
	const [showPreview, setShowPreview] = useState(false);

	const selected = selectedBusiness == business.id ? true : false;
	return (
		<div className="marker-wrapper">
			{showPreview && (
				<div className="marker-preview-wrapper">
					<div className="marker-preview-image">
						<img
							src={previewImage[0].url}
							onError={({ currentTarget }) => {
								currentTarget.onerror = null;
								currentTarget.src =
									'https://img.freepik.com/free-vector/red-grunge-style-coming-soon-design_1017-26691.jpg?w=2000';
							}}
						/>
					</div>
					<div className="marker-preview-content-wrapper">
						<div className="marker-preview-content-name">{business.name}</div>
						<div className="marker-preview-content-rating">
							<ReviewStarsDisplay rating={business.avgRating} />{' '}
							{business.totalReviews}
						</div>
						<div className="marker-preview-content-categories">
							{business.business_type}
						</div>
					</div>
				</div>
			)}
			<div
				className={`marker-circle center ${selected ? 'selected' : ''}`}
				onClick={() => history.push(`/${business.id}`)}
				onMouseOver={() => setShowPreview(true)}
				onMouseLeave={() => setShowPreview(false)}
			>
				<div className="marker-circle-content">{idx + 1}</div>
			</div>
		</div>
	);
};

export default CustomMarker;
