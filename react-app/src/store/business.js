const GET_ALL_BUSINESS = 'business/GET_ALL_BUSINESS';

const loadBusinesses = (businesses) => ({
	type: GET_ALL_BUSINESS,
	businesses
});

export const getAllBusiness = () => async (dispatch) => {
	const response = await fetch('/api/business/all');

	if (response.ok) {
		const data = await response.json();
		dispatch(loadBusinesses(data.businesses));
		return data.businesses;
	}
};

const initialState = { allBusinesses: {} };
export default function businessReducer(state = initialState, action) {
	const newState = { ...state };
	switch (action.type) {
		case GET_ALL_BUSINESS:
			newState.allBusinesses = nornalizeData(action.businesses);
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
