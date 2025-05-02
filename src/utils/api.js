const API_URL = 'https://norma.nomoreparties.space/api';

const checkReponse = (res) => {
	return res.ok
		? res.json()
		: res.json().then((error) => Promise.reject(error));
};

const fetchWithoutRefresh = (url, options) => {
	return fetch(`${API_URL + url}`, options).then(checkReponse);
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
		.then(checkReponse)
		.then((refreshData) => {
			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}
			localStorage.setItem('refreshToken', refreshData.refreshToken);
			localStorage.setItem('accessToken', refreshData.accessToken);
			return refreshData;
		});
};

const fetchWithRefresh = async (endpoint, options) => {
	const url = `${API_URL + endpoint}`;
	try {
		const res = await fetch(url, options);
		return await checkReponse(res);
	} catch (err) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options);
			return await checkReponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};

export const createOrderRequest = (ingredientsIds) => {
	return fetchWithRefresh('/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('accessToken'),
		},
		body: JSON.stringify({
			ingredients: ingredientsIds,
		}),
	});
};

export const passwordForgot = ({ email }) => {
	return fetchWithoutRefresh('/password-reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: email,
		}),
	});
};

export const passwordReset = ({ password, code }) => {
	return fetchWithoutRefresh('/password-reset/reset', {
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

export const register = ({ email, password, name }) => {
	return fetchWithoutRefresh('/auth/register', {
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

export const login = ({ email, password }) => {
	return fetchWithoutRefresh('/auth/login', {
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
			Authorization: localStorage.getItem('accessToken'),
		},
	});
};

export const updateUser = (user) => {
	return fetchWithRefresh('/auth/user', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('accessToken'),
		},
		body: JSON.stringify(user),
	});
};
