import {
	GET_DATA_REQUEST,
	GET_DATA_SUCCESS,
	GET_DATA_ERROR,
} from '../actions/burger-ingredients';

const initialState = {
	data: [],
	dataRequest: false,
	dataError: false,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_DATA_REQUEST: {
			return { ...state, dataRequest: true };
		}
		case GET_DATA_SUCCESS: {
			return {
				...state,
				dataError: false,
				data: action.data,
				dataRequest: false,
			};
		}
		case GET_DATA_ERROR: {
			return { ...state, dataError: action.errorText, dataRequest: false };
		}
		default: {
			return state;
		}
	}
};
