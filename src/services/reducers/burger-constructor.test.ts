import { expect, it } from '@jest/globals';
import {
	ADD_ITEM,
	DELETE_ITEM,
	MOVE_ITEM,
	CLEAR_ITEMS,
	TBurgerItemsActions,
} from '../actions/burger-constructor';
import { burgerConstructorReducer, initialState } from './burger-constructor';
import { TIngredientItemType } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';

const sampleItem: TIngredientItemType = {
	_id: uuidv4(),
	name: 'Test Ingredient',
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

describe('burgerConstructor reducer', () => {
	it('initializes with default state', () => {
		expect(
			burgerConstructorReducer(undefined, {} as TBurgerItemsActions)
		).toEqual(initialState);
	});

	it('adds an item to the state', () => {
		const isBunType = sampleItem.type === 'bun';
		expect(
			burgerConstructorReducer(undefined, {
				type: ADD_ITEM,
				item: sampleItem,
			})
		).toEqual({
			...initialState,
			bun: isBunType ? sampleItem : initialState.bun,
			ingredients: isBunType
				? initialState.ingredients
				: [...initialState.ingredients, sampleItem],
		});
	});

	it('removes an item from the state', () => {
		const isBunType = sampleItem.type === 'bun';
		const initialIngredients = [sampleItem, { ...sampleItem, _id: uuidv4() }];

		expect(
			burgerConstructorReducer(
				{
					...initialState,
					ingredients: initialIngredients,
				},
				{ type: DELETE_ITEM, item: sampleItem }
			)
		).toEqual({
			...initialState,
			bun: isBunType ? null : initialState.bun,
			ingredients: isBunType
				? initialState.ingredients
				: initialIngredients.filter(
						(ingredient) => ingredient.key !== sampleItem.key
				  ),
		});
	});

	it('reorders items in the state', () => {
		const fromIdx = 0;
		const toIdx = 2;
		const initialIngredients = [
			sampleItem,
			{ ...sampleItem, _id: uuidv4() },
			{ ...sampleItem, _id: uuidv4() },
		];
		const reorderedIngredients = [...initialIngredients];
		const [movedItem] = reorderedIngredients.splice(fromIdx, 1);
		reorderedIngredients.splice(toIdx, 0, movedItem);

		expect(
			burgerConstructorReducer(
				{ ...initialState, ingredients: initialIngredients },
				{ type: MOVE_ITEM, fromIndex: fromIdx, toIndex: toIdx }
			)
		).toEqual({
			...initialState,
			ingredients: reorderedIngredients,
		});
	});

	it('resets the state', () => {
		expect(burgerConstructorReducer(undefined, { type: CLEAR_ITEMS })).toEqual({
			...initialState,
			bun: null,
			ingredients: [],
		});
	});
});
