const GET_ALL_BUSINESS = 'business/GET_ALL_BUSINESS';
const GET_SINGLE_BUSINESS = 'business/GET_SINGLE_BUSINESS';
const CLEAN_UP_SINGLE_BUSINESS = 'business/CLEAN_UP_SINGLE_BUSINESS';

const loadBusinesses = (businesses) => ({
	type: GET_ALL_BUSINESS,
	businesses
});

const loadBusiness = (business) => ({
	type: GET_SINGLE_BUSINESS,
	business
});

// clean up function to clear single business page when unmount, prevent delay when switching
// between business
export const singleBusinessCleanUp = () => ({
	type: CLEAN_UP_SINGLE_BUSINESS
});

export const deleteBusiness = (id) => async () => {
	const response = await fetch(`/api/business/${id}/delete`, {
		method: 'DELETE'
	});

	if (response.ok) {
		return true;
	}
	return false;
};

export const getAllBusiness = () => async (dispatch) => {
	const response = await fetch('/api/business/all');

	if (response.ok) {
		const data = await response.json();
		dispatch(loadBusinesses(data.businesses));
		return data.businesses;
	}
};

export const getSingleBusiness = (businessId) => async (dispatch) => {
	const response = await fetch(`/api/business/${businessId}`);

	if (response.ok) {
		const data = await response.json();
		dispatch(loadBusiness(data.business));
		return data.business;
	}
};

export const createNewBusiness = (businessData) => async (dispatch) => {
	const response = await fetch(`/api/business`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(businessData)
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

export const editBusiness = (businessData, businessId) => async () => {
	const response = await fetch(`/api/business/${businessId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(businessData)
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

export const AddBusinessImage = (imagedata, businessId) => async () => {
	const response = await fetch(`/api/business/${businessId}/images`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(imagedata)
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
const initialState = { allBusinesses: {}, singleBusiness: {} };
export default function businessReducer(state = initialState, action) {
	const newState = { ...state };
	switch (action.type) {
		case GET_ALL_BUSINESS:
			newState.allBusinesses = nornalizeData(action.businesses);
			return newState;
		case GET_SINGLE_BUSINESS:
			newState.singleBusiness = action.business;
			return newState;
		case CLEAN_UP_SINGLE_BUSINESS:
			newState.singleBusiness = {};
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
