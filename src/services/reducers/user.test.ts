import { expect, it } from '@jest/globals';
import { SET_AUTH_CHECKED, SET_USER, TUserActions } from '../actions/user';
import { userReducer, initialState } from './user';

describe('user reducer', () => {
	it('returns default state', () => {
		expect(userReducer(undefined, {} as TUserActions)).toEqual(initialState);
	});

	it('sets auth checked status', () => {
		const authChecked = true;
		expect(
			userReducer(undefined, { type: SET_AUTH_CHECKED, payload: authChecked })
		).toEqual({
			...initialState,
			isAuthChecked: authChecked,
		});
	});

	it('updates user information', () => {
		const userData = {
			name: 'SampleUser',
			email: 'sample@email.com',
		};
		expect(
			userReducer(undefined, { type: SET_USER, payload: userData })
		).toEqual({
			...initialState,
			user: userData,
		});
	});
});
