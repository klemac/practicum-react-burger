import {
	TToken,
	TUser,
	TUserLogin,
	TUserPasswordReset,
	TUserPasswordResetCode,
	TUserRegister,
} from '../utils/types';

const API_URL = 'https://norma.nomoreparties.space/api';

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

export const getIngredientsDataRequest = () =>
	fetchWithoutRefresh('/ingredients');

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

const fetchWithRefresh = async (endpoint: string, options: RequestInit) => {
	const url = `${API_URL + endpoint}`;
	try {
		const res = await fetch(url, options);
		return await checkReponse(res);
	} catch (error) {
		if (error instanceof Error && error.message === 'jwt expired') {
			const refreshData = await refreshToken();
			if (options.headers) {
				(options.headers as Record<string, string>).authorization =
					refreshData.accessToken;
			}
			const res = await fetch(url, options);
			return await checkReponse(res);
		} else {
			return Promise.reject(error);
		}
	}
};

export const createOrderRequest = (ingredientsIds: Array<string>) => {
	return fetchWithRefresh('/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('accessToken') || '',
		} as Record<string, string>,
		body: JSON.stringify({
			ingredients: ingredientsIds,
		}),
	});
};

export const passwordForgot = ({ email }: TUserPasswordReset) => {
	return fetchWithoutRefresh('/password-reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
		}),
	});
};

export const passwordReset = ({ password, code }: TUserPasswordResetCode) => {
	return fetchWithoutRefresh('/password-reset/reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			password,
			token: code,
		}),
	});
};

export const register = ({ email, password, name }: TUserRegister) => {
	return fetchWithoutRefresh('/auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			password,
			name,
		}),
	});
};

export const login = ({ email, password }: TUserLogin) => {
	return fetchWithoutRefresh('/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});
};

export const logout = () => {
	return fetchWithoutRefresh('/auth/logout', {
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
	return fetchWithRefresh('/auth/user', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('accessToken') || '',
		} as Record<string, string>,
	});
};

export const updateUser = (user: TUser) => {
	return fetchWithRefresh('/auth/user', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('accessToken') || '',
		} as Record<string, string>,
		body: JSON.stringify(user),
	});
};
