import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getSingleBusiness, singleBusinessCleanUp } from '../../store/business';
import BusinessDetailsBody from './BusinessDetailsBody';
import './SingleBusinessDetailsPage.css';

function setPriceDollarSign(price) {
	if (price < 11) return '$';
	else if (price > 11 && price < 31) return '$$';
	else if (price > 31 && price < 61) return '$$$';
	else if (price > 60) return '$$$$';
}

function getColorForRating(rating) {
	if (rating < 2) return 'oneStar';
	if (rating < 3) return 'twoStars';
	if (rating < 4) return 'threeStars';
	if (rating < 5) return 'fourStars';
	else return 'fiveStars';
}
const SingleBusinessDetailsPage = () => {
	const { businessId } = useParams();
	const business = useSelector((state) => state.business.singleBusiness);
	const [businessImages, setBusinessImages] = useState([]);
	const [categories, setCategories] = useState([]);
	const [priceRange, setPriceRange] = useState('');
	const [operatingHours, setOperatingHours] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const get = async () => {
			const data = await dispatch(getSingleBusiness(businessId));
			let shuffled = data.allImages.sort(function () {
				return 0.5 - Math.random();
			});
			setBusinessImages(shuffled.slice(0, data.allImages.length));

			// Get business categories
			const businessCategories = data.business_type.split(',');
			setCategories(businessCategories);

			// get business price range
			setPriceRange(setPriceDollarSign(Number(data.price)));

			//get operation hours
			const date = new Date();
			const todayDay = date.toString().split(' ')[0]; // Mon, Tue, Wed....
			const currentHour = date.getHours();
			const operationHoursEachDay = data.operation_hours.split(','); //['Mon-11:30-21:30', 'Tue-11:30-21:30', 'Wed-11:30-21:30'....
			const todayHours = operationHoursEachDay // ['Thu', '11:30', '21:30']
				.filter((day) => day.slice(0, 3) == todayDay)[0]
				.split('-');
			if (todayHours[1] !== 'Closed') {
				const openHour = todayHours[1].split(':'); //  ['11', '30']
				const closeHour = todayHours[2].split(':'); // ['21', '30']
				const openNow =
					Number(openHour[0]) <= currentHour &&
					Number(closeHour[0]) >= currentHour;

				openHour[1] =
					Number(openHour[0]) > 11 ? openHour[1] + ' PM' : openHour[1] + ' AM';
				closeHour[1] =
					Number(closeHour[0]) > 11
						? closeHour[1] + ' PM'
						: closeHour[1] + ' AM';
				openHour[0] = ((Number(openHour[0]) + 11) % 12) + 1;
				closeHour[0] = ((Number(closeHour[0]) + 11) % 12) + 1;
				setOperatingHours([openNow, openHour.join(':'), closeHour.join(':')]);
			}
			console.log(todayHours);
		};
		get();
		return () => {
			dispatch(singleBusinessCleanUp());
		};
	}, []);
	let rating = business.avgRating;
	const color = getColorForRating(rating);
	if (!Object.values(business).length) return null;
	return (
		<div className="business-details-page-wrapper center">
			<div className="business-details-images-container">
				<div className="business-detail-faded-background"></div>
				{businessImages.map((url) => (
					<img src={url} />
				))}
			</div>
			<div className="business-details-header-wrapper">
				<h1 className="business-details-name">{business.name}</h1>
				<div className={`business-details-total-reviews ${color}`}>
					{[...Array(5)].map((star, i) => {
						if (i < Math.floor(rating)) return <i class="fa-solid fa-star" />;
						else if (rating % Math.floor(rating) >= 0.5) {
							rating = 0;
							return <i class="fa-regular fa-star-half-stroke" />;
						} else return <i class="fa-regular fa-star" />;
					})}
					<div className="total-reviews">{business.totalReviews} reviews</div>
				</div>
				<div className="business-details-price-categories">
					<div style={{ fontWeight: '400' }}>{priceRange}</div>
					{categories.map((category) => (
						<>
							•
							<NavLink
								to="/"
								className="nav-link business-details-category-link"
							>
								{category}
							</NavLink>
						</>
					))}
				</div>
				<div className="business-details-hours">
					<div
						className={`business-open-close ${
							operatingHours[0] ? 'open' : 'close'
						}`}
					>
						{operatingHours[0] ? 'Open' : 'Closed'},
					</div>
					<div className="business-operating-hours">
						{operatingHours[1]}{' '}
						{operatingHours[2] ? '- ' + operatingHours[2] : ''}
					</div>
				</div>
			</div>
			<BusinessDetailsBody
				business={business}
				operatingHours={operatingHours}
			/>
		</div>
	);
};

export default SingleBusinessDetailsPage;
