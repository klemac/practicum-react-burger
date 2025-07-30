import {
	TAuthUserResponse,
	TCreateOrderResponse,
	TIngredientsResponse,
	TLogoutResponse,
	TOrder,
	TRegisterResponse,
	TResetPasswordResponse,
	TToken,
	TUser,
	TUserLogin,
	TUserPasswordReset,
	TUserPasswordResetCode,
	TUserRegister,
} from '../utils/types';

const API_URL = 'https://norma.nomoreparties.space/api';
export const WSS_API_URL = 'wss://norma.nomoreparties.space/orders';

const checkReponse = <T>(res: Response): Promise<T> => {
	return res.ok
		? res.json()
		: res.json().then((error) => Promise.reject(error));
};

const fetchWithoutRefresh = <T>(
	endpoint: string,
	options?: RequestInit
): Promise<T> => {
	return fetch(`${API_URL + endpoint}`, options).then(checkReponse<T>);
};

export const getIngredientsDataRequest  = () =>
	fetchWithoutRefresh<TIngredientsResponse>('/ingredients');

export const refreshToken = () => {
	return fetch(`${API_URL}/auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then(checkReponse<TToken>)
		.then((refreshData) => {
			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}
			localStorage.setItem('refreshToken', refreshData.refreshToken);
			localStorage.setItem('accessToken', refreshData.accessToken);
			return refreshData;
		});
};

const fetchWithRefresh = async <T>(endpoint: string, options: RequestInit) => {
	const url = `${API_URL + endpoint}`;
	try {
		const res = await fetch(url, options);
		return await checkReponse<T>(res);
	} catch (err) {
		if (err instanceof Error && err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			if (options?.headers) {
				(options.headers as Record<string, string>).authorization =
					refreshData.accessToken;
			}
			const res = await fetch(url, options);
			return await checkReponse<T>(res);
		} else {
			return Promise.reject(err);
		}
	}
};

export const createOrderRequest = (ingredientsID: Array<string>) => {
	return fetchWithRefresh<TCreateOrderResponse>('/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('accessToken'),
		} as Record<string, string>, 
		body: JSON.stringify({
			ingredients: ingredientsID,
		}),
	});
};

export const getOrderByNumber = (number: string) =>
	fetchWithoutRefresh<TOrder>('/orders/' + number);

export const passwordForgot = ({ email }: TUserPasswordReset) => {
	// non-store request
	return fetchWithoutRefresh<TResetPasswordResponse>('/password-reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: email,
		}),
	});
};

export const passwordReset = ({
	password,
	code,
}: TUserPasswordResetCode) => {
	return fetchWithoutRefresh<undefined>('/password-reset/reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			password: password,
			token: code,
		}),
	});
};

export const register = ({ email, password, name }: TUserRegister) => {
	return fetchWithoutRefresh<TRegisterResponse>('/auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: email,
			password: password,
			name: name,
		}),
	});
};

export const login = ({ email, password }: TUserLogin) => {
	return fetchWithoutRefresh<TRegisterResponse>('/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	});
};

export const logout = () => {
	return fetchWithoutRefresh<TLogoutResponse>('/auth/logout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	});
};

export const getUser = () => {
	return fetchWithRefresh<TAuthUserResponse>('/auth/user', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('accessToken'),
		} as Record<string, string>,
	});
};

export const updateUser = (user: TUser) => {
	return fetchWithRefresh<TAuthUserResponse>('/auth/user', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('accessToken'),
		} as Record<string, string>,
		body: JSON.stringify(user),
	});
};
