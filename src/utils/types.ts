import type { Identifier } from 'dnd-core';

export type TIngredientItemType = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
	key?: string;
};

export type TConstructorItem = {
	element: TIngredientItemType;
	index: string;
	id: string;
};

export type TDragObject = {
	id: string;
	index: string;
};

export type TDragCollectedProps = {
	isDragging: boolean;
	handlerId?: Identifier | null;
};

export type TDropCollectedProps = {
	handlerId: Identifier | null;
};

export type TDropCollectedIngredientProps = {
	canDropIngredient: boolean;
	canDropBun: boolean;
	isOverIngredient: boolean;
	isOverBun: boolean;
};

export type TToken = {
	success: boolean;
	accessToken: string;
	refreshToken: string;
};

export type TUser = {
	name: string;
	email: string;
	password?: string;
};

export type TUserPasswordReset = Pick<TUser, 'email'>;

export type TUserPasswordResetCode = Required<Pick<TUser, 'password'>> & {
	code: string;
};

export type TUserRegister = Required<TUser>;

export type TUserLogin = Required<Pick<TUser, 'email' | 'password'>>;

export type TIngredientsResponse = {
	success: boolean;
	data: Array<TIngredientItemType>;
};

export type TResetPasswordResponse = {
	success: boolean;
	message: string;
};

export type TRegisterResponse = {
	success: boolean;
	user: {
		email: string;
		name: string;
	};
	accessToken: string;
	refreshToken: string;
};

export type TLogoutResponse = {
	success: boolean;
	message: string;
};

export type TCreateOrderResponse = {
	success: boolean;
	name: string;
	order: {
		number: number;
	};
};

export type TAuthUserResponse = {
	success: boolean;
	user: {
		email: string;
		name: string;
	};
};

export enum OrderStatusType {
	CREATED = 'created',
	PENDING = 'pending',
	DONE = 'done',
}

export type TFeedItem = {
	readonly ingredients: Array<string>;
	readonly _id: string;
	readonly name: string;
	readonly status: OrderStatusType;
	readonly number: number;
	readonly createdAt: string;
	readonly updatedAt: string;
};

export type TOrder = {
	readonly success: boolean;
	readonly orders: Array<TFeedItem>;
	readonly total: number;
	readonly totalToday: number;
};
