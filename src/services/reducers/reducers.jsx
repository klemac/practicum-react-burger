import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burger-constructor';
import { burgerIngredientsReducer } from './burger-ingredients';
import { orderDetailsReducer } from './order-details';
import { userReducer } from './user';

export const rootReducer = combineReducers({
	burgerConstructor: burgerConstructorReducer,
	ingredients: burgerIngredientsReducer,
	order: orderDetailsReducer,
	user: userReducer,
});
