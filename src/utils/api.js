const API_URL = 'https://norma.nomoreparties.space/api';

const makeRequest = (url, options) => {
	return fetch(`${API_URL + url}`, options).then((res) => {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Error ${res.status}`);
	});
};

export const getIngredientsDataRequest = () => makeRequest('/ingredients');

export const createOrderRequest = (ingredientsIds) => {
	return makeRequest('/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			ingredients: ingredientsIds,
		}),
	});
};
