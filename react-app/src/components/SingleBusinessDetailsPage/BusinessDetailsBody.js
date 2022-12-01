import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import BusinessReviews from './BusinessReviews';
import { deleteBusiness } from '../../store/business';

const BusinessDetailsBody = ({ business, operatingHours }) => {
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();
	const { businessId } = useParams();
	let operating = business.operation_hours.split(',');
	operating = operating.map((eachDay) => {
		eachDay = eachDay.split('-');
		if (eachDay[1] !== 'Closed') {
			const openHour = eachDay[1].split(':'); //  ['11', '30']
			const closeHour = eachDay[2].split(':'); // ['21', '30']
			openHour[1] =
				Number(openHour[0]) > 11 ? openHour[1] + ' PM' : openHour[1] + ' AM';
			closeHour[1] =
				Number(closeHour[0]) > 11 ? closeHour[1] + ' PM' : closeHour[1] + ' AM';
			openHour[0] = ((Number(openHour[0]) + 11) % 12) + 1;
			closeHour[0] = ((Number(closeHour[0]) + 11) % 12) + 1;
			eachDay[1] = openHour.join(':') + ' - ' + closeHour.join(':');
			return eachDay.slice(0, 2);
		}
		return eachDay;
	});
	const date = new Date();
	const todayDay = date.toString().split(' ')[0]; // Mon, Tue, Wed....

	const handleDeleteBusiness = async () => {
		if (
			window.confirm(
				'If deleted, all data will be lost on this business, are you sure you want to delete?'
			)
		) {
			const deleted = await dispatch(deleteBusiness(businessId));
			if (deleted) history.push('/');
		}
	};
	const theOwner = user?.id == business.owner_id;

	return (
		<div className="business-details-body-wrapper">
			<div className="business-details-container">
				{!theOwner && (
					<div className="create-reviews-wrapper">
						<NavLink
							to={`/${businessId}/new-review`}
							className="create-new-review-link"
						>
							<i class="fa-regular fa-star" /> Write a review
						</NavLink>
					</div>
				)}
				{theOwner && (
					<div className="create-reviews-wrapper">
						<NavLink
							to={`/${businessId}/edit`}
							className="create-new-review-link"
						>
							<i class="fa-regular fa-star" /> Edit Business
						</NavLink>
						<button
							className="create-new-review-link-button"
							onClick={handleDeleteBusiness}
						>
							Delete Business
						</button>
					</div>
				)}
				<div className="business-details-block">
					<h1>Hours</h1>
					<div id="operation-hours-container">
						<div id="each-day">
							{operating.map((day) => (
								<div id="day-of-week">{day[0]}</div>
							))}
						</div>
						<div id="each-day">
							{operating.map((day) => (
								<div id="hours-of-operation">
									<div>{day[1]}</div>
									{day[0] == todayDay && (
										<div
											className={`business-open-close ${
												operatingHours[0] ? 'open' : 'close'
											}`}
										>
											{operatingHours[0] ? 'Open now' : 'Closed'}
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="business-details-block">
					<h1>About the business</h1>
					<div className="business-details-description">
						{business.description}
					</div>
				</div>
				<div className="business-details-block">
					<h1>Reviews</h1>
					<BusinessReviews business={business} />
				</div>
			</div>
			<div className="business-details-right-Col">
				<div className="additional-details-box">
					{business.business_web_page && (
						<div className="business-right-details">
							<a
								href={business.business_web_page}
								style={{ color: '#49B1CB' }}
								target="__blank"
							>
								{business.business_web_page}
							</a>
							<i class="fa-solid fa-arrow-up-right-from-square"></i>
						</div>
					)}
					<div className="business-right-details">
						{business.phone_number}
						<i class="fa-solid fa-phone-volume"></i>
					</div>
					<div className="business-right-details no-border">
						<div>
							{business.address} {business.city}, {business.state}{' '}
							{business.zip}
						</div>
						<i class="fa-solid fa-location-dot"></i>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BusinessDetailsBody;
