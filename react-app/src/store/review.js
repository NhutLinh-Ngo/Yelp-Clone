const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS';
const GET_BUSINESS_REVIEWS = 'reviews/GET_BUSINESS_REVIEWS';

const loadAllReviews = (reviews) => ({
	type: GET_ALL_REVIEWS,
	reviews
});

const loadBusinessReviews = (reviews) => ({
	type: GET_BUSINESS_REVIEWS,
	reviews
});

export const getAllReviews = () => async (dispatch) => {
	const response = await fetch('/api/reviews/all');

	if (response.ok) {
		const data = await response.json();
		dispatch(loadAllReviews(data.reviews));
		return data.reviews;
	}
};

export const getSingleBusinessReviews = (id) => async (dispatch) => {
	const response = await fetch(`/api/business/${id}/reviews`);

	if (response.ok) {
		const data = await response.json();
		dispatch(loadBusinessReviews(data.reviews));
		return data.reviews;
	}
};

export const postNewReview = (reviewData) => async (dispatch) => {
	const { Business_id } = reviewData;
	const response = await fetch(`/api/business/${Business_id}/reviews`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(reviewData)
	});
	if (response.ok) {
		const data = await response.json();
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
	}
};

export const postNewReviewImage = (imageData) => async (dispatch) => {
	const { review_id } = imageData;
	const response = await fetch(`/api/reviews/${review_id}/images`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(imageData)
	});

	if (response.ok) {
		const data = await response.json();
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
	}
};

const initialstate = { allReviews: {}, businessReviews: {} };
export default function reviewReducer(state = initialstate, action) {
	const newState = { ...state };
	switch (action.type) {
		case GET_ALL_REVIEWS:
			newState.allReviews = nornalizeData(action.reviews);
			return newState;
		case GET_BUSINESS_REVIEWS:
			newState.businessReviews = nornalizeData(action.reviews);
			return newState;
		default:
			return state;
	}
}

const nornalizeData = (data) => {
	const obj = {};
	data.forEach((each) => (obj[each.id] = each));
	return obj;
};
