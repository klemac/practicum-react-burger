import { v4 } from 'uuid';
import { TIngredientItemType } from '../../utils/types';
import { AppDispatch, AppThunkAction } from '../hooks';

export const ADD_ITEM: 'ADD_ITEM' = 'ADD_ITEM';
export const DELETE_ITEM: 'DELETE_ITEM' = 'DELETE_ITEM';
export const CLEAR_ITEMS: 'CLEAR_ITEMS' = 'CLEAR_ITEMS';
export const MOVE_ITEM: 'MOVE_ITEM' = 'MOVE_ITEM';

export interface IAddItemAction {
	readonly type: typeof ADD_ITEM;
	readonly item: TIngredientItemType;
}

export interface IDeleteItemAction {
	readonly type: typeof DELETE_ITEM;
	readonly item: TIngredientItemType;
}

export interface IMoveItemAction {
	readonly type: typeof MOVE_ITEM;
	readonly fromIndex: number;
	readonly toIndex: number;
}
export interface IResetItemAction {
	readonly type: typeof CLEAR_ITEMS;
}

export type TBurgerItemsActions =
	| IAddItemAction
	| IDeleteItemAction
	| IMoveItemAction
	| IResetItemAction;

export const addItem =
	(item: TIngredientItemType): AppThunkAction =>
	(dispatch: AppDispatch) => {
		dispatch({
			type: ADD_ITEM,
			item: { ...item, key: v4() },
		});
	};

export const deleteItem =
	(item: TIngredientItemType): AppThunkAction =>
	(dispatch: AppDispatch) => {
		dispatch({
			type: DELETE_ITEM,
			item: item,
		});
	};

export const moveItem = (
	fromIndex: number,
	toIndex: number
): IMoveItemAction => {
	return {
		type: MOVE_ITEM,
		fromIndex: fromIndex,
		toIndex: toIndex,
	};
};
