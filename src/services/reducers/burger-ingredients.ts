import { TIngredientItemType } from '../../utils/types';
import {
	GET_DATA_REQUEST,
	GET_DATA_SUCCESS,
	GET_DATA_ERROR,
	TIngredientsActions,
} from '../actions/burger-ingredients';

type TIngredientsState = {
	data: ReadonlyArray<TIngredientItemType>;
	dataRequest: boolean;
	dataError: boolean;
	ingredientsMap: Map<string, TIngredientItemType>;
};

const initialState: TIngredientsState = {
	data: [],
	dataRequest: false,
	dataError: false,
	ingredientsMap: new Map<string, TIngredientItemType>([]),
};

export const burgerIngredientsReducer = (
	state = initialState,
	action: TIngredientsActions
) => {
	switch (action.type) {
		case GET_DATA_REQUEST: {
			return { ...state, dataRequest: true };
		}
		case GET_DATA_SUCCESS: {
			return {
				...state,
				dataError: false,
				data: action.data,
				dataRequest: false,
				ingredientsMap: new Map(action.data.map((i) => [i._id, i])),
			};
		}
		case GET_DATA_ERROR: {
			return { ...state, itemsError: action.errorText, itemsRequest: false };
		}
		default: {
			return state;
		}
	}
};
