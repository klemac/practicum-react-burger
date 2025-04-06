import {
	SET_INGREDIENT_DETAILS,
	CLEAR_INGREDIENT_DETAILS,
} from '../actions/ingredient-details';

const initialState = {
	ingredient: null,
};

export function ingredientDetailsReducer(state = initialState, action) {
	switch (action.type) {
		case SET_INGREDIENT_DETAILS:
			return { ...state, ingredient: action.ingredient };
		case CLEAR_INGREDIENT_DETAILS:
			return { ...state, ingredient: null };
		default:
			return state;
	}
}
