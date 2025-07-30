import { TIngredientItemType } from '../../utils/types';
import { createOrderRequest } from '../../utils/api';
import { AppDispatch } from '../hooks';

export const CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST' =
	'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS' =
	'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR: 'CREATE_ORDER_ERROR' = 'CREATE_ORDER_ERROR';
export const CLEAR_ORDER: 'CLEAR_ORDER' = 'CLEAR_ORDER';
export const CLEAR_ORDER_ERROR: 'CLEAR_ORDER_ERROR' = 'CLEAR_ORDER_ERROR';

export type TOrderRequestType = {
	bun: TIngredientItemType;
	ingredients: Array<TIngredientItemType>;
};


export interface ICreateOrderAction {
	readonly type: typeof CREATE_ORDER_REQUEST;
}

export interface ICreateOrderSuccessAction {
	readonly type: typeof CREATE_ORDER_SUCCESS;
	readonly orderNum: number;
}

export interface ICreateOrderErrorAction {
	readonly type: typeof CREATE_ORDER_ERROR;
	readonly errorText: string;
}

export interface IResetOrderAction {
	readonly type: typeof CLEAR_ORDER;
}
export interface IResetOrderErrorAction {
	readonly type: typeof CLEAR_ORDER_ERROR;
}

export type TOrderDetailsActions =
	| ICreateOrderAction
	| ICreateOrderSuccessAction
	| ICreateOrderErrorAction
	| IResetOrderAction
	| IResetOrderErrorAction;

export function createOrder({ bun, ingredients }: TOrderRequestType) {
	return function (dispatch: AppDispatch) {
		const ingredientsID = [
			bun._id,
			...ingredients.map((item) => item._id),
			bun._id,
		];
		dispatch({ type: CREATE_ORDER_REQUEST });
		createOrderRequest(ingredientsID)
			.then((res) => {
				dispatch({ type: CREATE_ORDER_SUCCESS, orderNum: res.order.number });
			})
			.catch(() => {
				dispatch({
					type: CREATE_ORDER_ERROR,
					errorText: 'Ошибка в формировании заказа',
				});
			});
	};
}
