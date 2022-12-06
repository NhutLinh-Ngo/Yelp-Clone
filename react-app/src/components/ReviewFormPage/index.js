import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { postNewReview, postNewReviewImage } from '../../store/review';
import { getAllBusiness } from '../../store/business';
import { FaStar } from 'react-icons/fa';
import './ReviewFormPage.css';
import { Modal } from '../../context/Modal';
import LoginFormModal from '../LoginModalForm';

const starsColor = (rating) => {
	if (rating < 2) return 'rgb(255, 204, 75)';
	if (rating < 3) return 'rgb(255, 173, 72)';
	if (rating < 4) return 'rgb(255, 135, 66)';
	if (rating < 5) return 'rgb(255, 100, 61)';
	else return 'rgb(251, 67, 60)';
};

const ratingDescription = (rating) => {
	if (rating == 0) return '';
	else if (rating < 2) return '🤬';
	else if (rating < 3) return '😭';
	else if (rating < 4) return '😐';
	else if (rating < 5) return '😀';
	else return '🥵';
};

const imageFormat = ['.jpg', '.jpeg', '.png'];
const isValidUrl = (urlString) => {
	var inputElement = document.createElement('input');
	inputElement.type = 'url';
	inputElement.value = urlString;

	if (
		!inputElement.checkValidity() ||
		!imageFormat.includes(urlString.slice(-4))
	) {
		return 'Please enter valid url with .jpg, .jpeg, .png format.';
	} else {
		return true;
	}
};

const ReviewFormPage = () => {
	const { businessId } = useParams();
	let business = useSelector(
		(state) => state.business.allBusinesses[`${businessId}`]
	);
	const user = useSelector((state) => state.session.user);
	const businessReviews = useSelector((state) =>
		Object.values(state.review.businessReviews)
	);
	const dispatch = useDispatch();
	const history = useHistory();
	useEffect(() => {
		if (!business) {
			business = dispatch(getAllBusiness());
		}
	}, []);

	const [stars, setStars] = useState(0);
	const [hover, setHover] = useState(null);
	const [review, setReview] = useState('');
	const [reviewErrors, setReviewErrors] = useState([]);
	const [urls, setUrls] = useState('');
	const [reviewImages, setReviewImages] = useState([]);
	const [imageError, setImageError] = useState('');
	const [showLoginModal, setShowLoginModal] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!user) {
			setShowLoginModal(true);
		}

		if (user) {
			const alreadyHaveReview = businessReviews.filter(
				(review) => review.reviewer.id == user.id
			);
			if (alreadyHaveReview.length > 0) {
				window.alert(
					'You already have a review for this business. Please consider editing your original review instead.'
				);
				return history.push(`/${businessId}`);
			}
			const reviewdata = {
				Business_id: Number(businessId),
				user_id: user.id,
				stars,
				review
			};
			// post review
			const newReview = await dispatch(postNewReview(reviewdata));
			if (newReview.errors) {
				setReviewErrors(newReview.errors);
			} else {
				/// post images for review
				reviewImages.forEach(async (url) => {
					const imageData = {
						review_id: newReview.id,
						url
					};
					await dispatch(postNewReviewImage(imageData));
				});

				history.push(`/${businessId}`);
			}
		}
	};

	const handleAddPhoto = (e) => {
		e.preventDefault();

		const checkUrl = isValidUrl(urls);
		if (checkUrl == true) {
			let images = reviewImages;
			images.push(urls);
			setReviewImages(images);
			setUrls('');
			setImageError('');
		} else {
			setImageError(checkUrl);
		}
	};
	if (!business) return null;
	return (
		<>
			<div className="top-red-bar-redirect center">
				<NavLink className="nav-link logo-name" to="/">
					FLUM
				</NavLink>
			</div>
			<div className="new-review-form-wrapper center">
				<div className="review-form-container">
					<NavLink
						to={`/${businessId}`}
						className="nav-link return-to-business-from-review"
					>
						{business.name}
					</NavLink>
					<form className="review-form" onSubmit={handleSubmit}>
						<div className="review-form-inputs">
							<div className="stars-rating">
								{[...Array(5)].map((star, i) => {
									const ratingValue = i + 1;
									return (
										<label key={i} style={{ cursor: 'pointer' }}>
											<input
												className="star-input"
												type="radio"
												name="rating"
												value={ratingValue}
												onClick={() => setStars(ratingValue)}
											/>
											<FaStar
												className="stars-rating"
												class="fa-solid fa-star"
												color={
													ratingValue <= (hover || stars)
														? starsColor(hover || stars)
														: '#e4e5e9'
												}
												size={35}
												onMouseEnter={() => setHover(ratingValue)}
												onMouseLeave={() => setHover(null)}
											/>
										</label>
									);
								})}
								<div id="review-emoji">{ratingDescription(hover || stars)}</div>
							</div>
							<div className="review-errors">{reviewErrors.stars}</div>
							<textarea
								className="review-text"
								name="review-text"
								value={review}
								onChange={(e) => setReview(e.target.value)}
								placeholder="doesn't look like much when you walk past, but I was practically dying of hunger so I popped in. The definition of a hole-in-the wall. I get the regular hamburger and wow... there are no words. A classic burger done right. Crip bun, juicy patty, stuffed with all the essentials. There's about a million options available between the menu board and wall full of specials, so it can get a little overwhelming, bu you really can't go wrong. Not much else to say besides go see for yourself! You won't be disappointed."
							/>
							<div className="review-errors">{reviewErrors.review}</div>
						</div>
						<div className="return-to-business-from-review add-photos">
							Add Photos
						</div>
						<div className="review-form-inputs">
							<div id="review-image-errors">{imageError}</div>
							<input
								type="url"
								placeholder="image url"
								className="input-url"
								onChange={(e) => setUrls(e.target.value)}
								value={urls}
							/>
							<button type="add" className="add-image" onClick={handleAddPhoto}>
								Add photo
							</button>
							<div className="review-preview-image">
								{reviewImages.map((url) => (
									<img
										className="review-single-image"
										src={url}
										onError={({ currentTarget }) => {
											currentTarget.onerror = null;
											currentTarget.src =
												'https://img.freepik.com/free-vector/red-grunge-style-coming-soon-design_1017-26691.jpg?w=2000';
										}}
									/>
								))}
							</div>
						</div>
						<button className="review-submit-button" type="submit">
							Post Review
						</button>
					</form>
				</div>
			</div>

			{showLoginModal && (
				<Modal onClose={() => setShowLoginModal(false)}>
					<LoginFormModal setShowLoginModal={setShowLoginModal} />
				</Modal>
			)}
		</>
	);
};

export default ReviewFormPage;
