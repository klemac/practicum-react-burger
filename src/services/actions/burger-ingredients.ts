import { TIngredientItemType } from '../../utils/types';
import { getIngredientsDataRequest } from '../../utils/api';
import { AppDispatch, AppThunkAction } from '../hooks';

export const GET_DATA_REQUEST: 'GET_DATA_REQUEST' = 'GET_DATA_REQUEST';
export const GET_DATA_SUCCESS: 'GET_DATA_SUCCESS' = 'GET_DATA_SUCCESS';
export const GET_DATA_ERROR: 'GET_DATA_ERROR' = 'GET_DATA_ERROR';

export interface IGetIngredientsAction {
	readonly type: typeof GET_DATA_REQUEST;
}

export interface IGetIngredientsSuccessAction {
	readonly type: typeof GET_DATA_SUCCESS;
	readonly data: Array<TIngredientItemType>;
}

export interface IGetIngredientsErrorAction {
	readonly type: typeof GET_DATA_ERROR;
	readonly errorText: string;
}

export type TIngredientsActions =
	| IGetIngredientsAction
	| IGetIngredientsSuccessAction
	| IGetIngredientsErrorAction;

export const getIngredients = (): AppThunkAction => (dispatch: AppDispatch) => {
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
