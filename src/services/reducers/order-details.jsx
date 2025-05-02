import {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_ERROR,
	CLEAR_ORDER,
} from '../actions/order-details';

const initialState = {
	order: null,
	orderRequest: false,
	orderError: null,
};

export function orderDetailsReducer(state = initialState, action) {
	switch (action.type) {
		case CREATE_ORDER_REQUEST:
			return { ...state, orderRequest: true, orderError: null };
		case CREATE_ORDER_SUCCESS:
			return {
				...state,
				orderRequest: false,
				orderError: null,
				order: action.orderNum,
			};
		case CREATE_ORDER_ERROR:
			return { ...state, orderRequest: false, orderError: action.errorText };
		case CLEAR_ORDER:
			return { ...state, order: null };
		default:
			return state;
	}
}
