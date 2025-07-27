import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burger-constructor';
import { burgerIngredientsReducer } from './burger-ingredients';
import { orderDetailsReducer } from './order-details';
import { userReducer } from './user';
import { feedSlice } from '../feed/slice';

export const rootReducer = combineReducers({
	burgerConstructor: burgerConstructorReducer,
	ingredients: burgerIngredientsReducer,
	order: orderDetailsReducer,
	user: userReducer,
	feed: feedSlice.reducer,
});
