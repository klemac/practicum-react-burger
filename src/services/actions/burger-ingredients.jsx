import { getIngredientsDataRequest } from '../../utils/api';

export const GET_DATA_REQUEST = 'GET_DATA_REQUEST';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_ERROR = 'GET_DATA_ERROR';

export const getIngredients = () => (dispatch) => {
	dispatch({ type: GET_DATA_REQUEST });

	return getIngredientsDataRequest()
		.then((res) => {
			dispatch({
				type: GET_DATA_SUCCESS,
				data: res.data,
			});
		})
		.catch((error) => {
			dispatch({
				type: GET_DATA_ERROR,
				errorText: error.message,
			});
		});
};
