import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import BusinessReviews from './BusinessReviews';

const BusinessDetailsBody = ({ business, operatingHours }) => {
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
	return (
		<div className="business-details-body-wrapper">
			<div className="business-details-container">
				<div className="create-reviews-wrapper">
					<NavLink
						to={`/${businessId}/new-review`}
						className="create-new-review-link"
					>
						<i class="fa-regular fa-star" /> Write a review
					</NavLink>
				</div>
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
					<BusinessReviews />
				</div>
			</div>
		</div>
	);
};

export default BusinessDetailsBody;
