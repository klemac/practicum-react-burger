import { expect, it } from '@jest/globals';
import {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_ERROR,
	CLEAR_ORDER,
	CLEAR_ORDER_ERROR,
	TOrderDetailsActions,
} from '../actions/order-details';
import { orderDetailsReducer, initialState } from './order-details';

describe('orderDetails reducer', () => {
	it('initializes with default state', () => {
		expect(orderDetailsReducer(undefined, {} as TOrderDetailsActions)).toEqual(
			initialState
		);
	});

	it('sets order request state', () => {
		expect(
			orderDetailsReducer(undefined, { type: CREATE_ORDER_REQUEST })
		).toEqual({
			...initialState,
			orderRequest: true,
			orderError: null,
		});
	});

	it('handles successful order creation', () => {
		const orderNumber = 42;
		const successState = {
			orderRequest: false,
			orderError: null,
			order: orderNumber,
		};
		expect(
			orderDetailsReducer(undefined, {
				type: CREATE_ORDER_SUCCESS,
				orderNum: orderNumber,
			})
		).toEqual({ ...initialState, ...successState });
	});

	it('sets error state on order failure', () => {
		const errorMessage = 'Order Failed';
		expect(
			orderDetailsReducer(undefined, {
				type: CREATE_ORDER_ERROR,
				errorText: errorMessage,
			})
		).toEqual({
			...initialState,
			orderError: errorMessage,
		});
	});

	it('resets order in state', () => {
		expect(orderDetailsReducer(undefined, { type: CLEAR_ORDER })).toEqual({
			...initialState,
			order: null,
		});
	});

	it('clears order error in state', () => {
		expect(orderDetailsReducer(undefined, { type: CLEAR_ORDER_ERROR })).toEqual(
			{
				...initialState,
				orderError: null,
			}
		);
	});
});
