import { expect, it } from '@jest/globals';
import {
	GET_DATA_REQUEST,
	GET_DATA_SUCCESS,
	GET_DATA_ERROR,
	TIngredientsActions,
} from '../actions/burger-ingredients';
import { burgerIngredientsReducer, initialState } from './burger-ingredients';
import { TIngredientItemType } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';

const sampleItem: TIngredientItemType = {
	_id: uuidv4(),
	name: 'Sample Ingredient',
	type: 'main',
	proteins: 100,
	fat: 100,
	carbohydrates: 100,
	calories: 100,
	price: 99,
	image: 'https://code.s3.yandex.net/react/code/bun-02.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
	__v: 0,
};

describe('burgerIngredients reducer', () => {
	it('returns the default state', () => {
		expect(
			burgerIngredientsReducer(undefined, {} as TIngredientsActions)
		).toEqual(initialState);
	});

	it('sets request state', () => {
		expect(
			burgerIngredientsReducer(undefined, { type: GET_DATA_REQUEST })
		).toEqual({
			...initialState,
			dataRequest: true,
		});
	});

	it('handles successful data fetch', () => {
		const sampleItems: Array<TIngredientItemType> = [
			sampleItem,
			{ ...sampleItem, _id: uuidv4() },
			{ ...sampleItem, _id: uuidv4() },
		];
		const successState = {
			dataError: false,
			data: sampleItems,
			dataRequest: false,
			ingredientsMap: new Map(sampleItems.map((item) => [item._id, item])),
		};
		expect(
			burgerIngredientsReducer(undefined, {
				type: GET_DATA_SUCCESS,
				data: sampleItems,
			})
		).toEqual({ ...initialState, ...successState });
	});

	it('handles fetch error', () => {
		const errorMessage = 'Sample Error';
		expect(
			burgerIngredientsReducer(undefined, {
				type: GET_DATA_ERROR,
				errorText: errorMessage,
			})
		).toEqual({
			...initialState,
			itemsError: errorMessage,
			itemsRequest: false,
		});
	});
});
