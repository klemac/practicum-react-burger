import { createOrderRequest } from '../../utils/api';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export function createOrder(bun, ingredients) {
	return function (dispatch) {
		const ingredientsIds = [
			bun._id,
			...ingredients.map((item) => item._id),
			bun._id,
		];
		dispatch({ type: CREATE_ORDER_REQUEST });
		createOrderRequest(ingredientsIds)
			.then((res) => {
				dispatch({ type: CREATE_ORDER_SUCCESS, orderNum: res.order.number });
			})
			.catch(() => {
				dispatch({
					type: CREATE_ORDER_ERROR,
					errorText: 'Error while posting an order',
				});
			});
	};
}
