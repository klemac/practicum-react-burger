import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burger-constructor';
import { burgerIngredientsReducer } from './burger-ingredients';
import { orderDetailsReducer } from './order-details';
import { ingredientDetailsReducer } from './ingredient-details';

export const rootReducer = combineReducers({
	burgerConstructor: burgerConstructorReducer,
	ingredientDetails: ingredientDetailsReducer,
	ingredients: burgerIngredientsReducer,
	order: orderDetailsReducer,
});
