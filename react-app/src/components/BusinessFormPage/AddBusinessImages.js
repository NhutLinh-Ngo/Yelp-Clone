import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AddBusinessImage, getSingleBusiness } from '../../store/business';
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

const AddBusinessImages = ({ businessId }) => {
	const [urls, setUrls] = useState('');
	const [reviewImages, setReviewImages] = useState([]);
	const [imageError, setImageError] = useState('');
	const [error, setError] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

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
			console.log(checkUrl);
			setImageError(checkUrl);
		}
	};

	const submitBusinessImages = async (e) => {
		e.preventDefault();

		reviewImages.forEach(async (url, i) => {
			const imageData = {
				url,
				preview: i == 0 ? true : false,
				business_id: businessId
			};

			const newImage = await dispatch(AddBusinessImage(imageData, businessId));
			if (newImage.error) setError(true);
		});

		if (!error) {
			await dispatch(getSingleBusiness(businessId));
			history.push(`/${businessId}`);
		}
	};
	return (
		<>
			<form
				className="business-images-form center"
				onSubmit={submitBusinessImages}
			>
				<h2>Lets add some images for your business.</h2>
				<div id="review-image-errors">{imageError}</div>
				<input
					type="url"
					placeholder="image url"
					className="business-images-input-field"
					onChange={(e) => setUrls(e.target.value)}
					value={urls}
				/>
				<button type="add" className="add-image" onClick={handleAddPhoto}>
					Add photo
				</button>
				<div className="business-preview-image">
					{reviewImages.map((url) => (
						<img className="add-business-single-image" src={url} />
					))}
				</div>

				<button className="submit-business-form complete" type="submit">
					{reviewImages.length > 0 ? 'Complete' : "I'll add it later"}
				</button>
			</form>
		</>
	);
};

export default AddBusinessImages;
