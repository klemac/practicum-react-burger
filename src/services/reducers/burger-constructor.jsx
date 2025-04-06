import {
	ADD_ITEM,
	DELETE_ITEM,
	CLEAR_ITEMS,
	MOVE_ITEM,
} from '../actions/burger-constructor';

const initialState = {
	bun: null,
	ingredients: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
	const isBun = action?.item?.type === 'bun';

	switch (action.type) {
		case ADD_ITEM:
			return {
				...state,
				bun: isBun ? action.item : state.bun,
				ingredients: isBun
					? state.ingredients
					: [...state.ingredients, action.item],
			};
		case DELETE_ITEM:
			return {
				...state,
				bun: isBun ? null : state.bun,
				ingredients: isBun
					? state.ingredients
					: state.ingredients.filter(
							(ingredient) => ingredient.key !== action.item.key
					  ),
			};
		case MOVE_ITEM:
			const ingredients2 = [...state.ingredients];
			ingredients2.splice(
				action.toIndex,
				0,
				ingredients2.splice(action.fromIndex, 1)[0]
			);
			return {
				...state,
				ingredients: ingredients2,
			};
		case CLEAR_ITEMS:
			return {
				...state,
				bun: null,
				ingredients: [],
			};

		default:
			return state;
	}
};
