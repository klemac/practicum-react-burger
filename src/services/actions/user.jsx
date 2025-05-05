import {
	getUser as getUserRequest,
	login as loginRequest,
	logout as logoutRequest,
	updateUser as updateUserRequest,
} from '../../utils/api';

export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
export const SET_USER = 'SET_USER';

export const setAuthChecked = (value) => ({
	type: SET_AUTH_CHECKED,
	payload: value,
});

export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

export const getUser = () => {
	return (dispatch) => {
		return getUserRequest()
			.then((res) => {
				dispatch(setUser(res.user));
			})
			.catch((error) => {
				console.error('Ошибка при получении пользователя:', error);
			});
	};
};

export const updateUser = (data) => {
	return (dispatch) => {
		return updateUserRequest(data)
			.then((res) => {
				dispatch(setUser(res.user));
			})
			.catch((error) => {
				console.error('Ошибка при обновлении пользователя:', error);
			});
	};
};

export const login = (data) => {
	return (dispatch) => {
		return loginRequest(data)
			.then((res) => {
				localStorage.setItem('accessToken', res.accessToken);
				localStorage.setItem('refreshToken', res.refreshToken);
				dispatch(setUser(res.user));
				dispatch(setAuthChecked(true));
			})
			.catch((error) => {
				console.error('Ошибка при входе пользователя:', error);
			});
	};
};

export const checkUserAuth = () => {
	return (dispatch) => {
		if (localStorage.getItem('accessToken')) {
			dispatch(getUser())
				.catch(() => {
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
					dispatch(setUser(null));
				})
				.finally(() => dispatch(setAuthChecked(true)));
		} else {
			dispatch(setAuthChecked(true));
		}
	};
};

export const logout = () => {
	return (dispatch) => {
		return logoutRequest()
			.then(() => {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				dispatch(setUser(null));
			})
			.catch((error) => {
				console.error('Ошибка при выходе пользователя:', error);
			});
	};
};
