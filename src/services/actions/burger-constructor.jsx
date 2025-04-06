import { v4 } from 'uuid';

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const CLEAR_ITEMS = 'CLEAR_ITEMS';
export const MOVE_ITEM = 'MOVE_ITEM';

export const addItem = (item) => (dispatch) => {
	dispatch({
		type: ADD_ITEM,
		item: { ...item, key: v4() },
	});
};

export const deleteItem = (item) => (dispatch) => {
	dispatch({
		type: DELETE_ITEM,
		item: item,
	});
};

export const moveItem = (fromIndex, toIndex) => {
	return {
		type: MOVE_ITEM,
		fromIndex: fromIndex,
		toIndex: toIndex,
	};
};
