import { Client, User, UserAction, UserActions, UserState } from './types';

export const userInitialState: UserState = {
	user: {
		email: '',
		id: '',
		name: '',
		token: '',
		type: '',
		isLogged: false,
	},
	client: {
		id: '',
		address: '',
		birthday: '',
		country: '',
		email: '',
		location: '',
		name: '',
		password: '',
		photo: '',
		postal_code: '',
		state: '',
		telephone: '',
		tin: 0,
	},
};

export const userReducer = (state: UserState = userInitialState, action: UserAction): UserState => {
	switch (action.type) {
		case UserActions.USER_LOGIN: {
			const user: User = {
				email: action.user?.email,
				id: action.user?.id,
				name: action.user?.name,
				token: action.user?.token,
				type: action.user?.type,
				isLogged: true,
			};
			return {
				...state,
				user,
			};
		}
		case UserActions.USER_INFO: {
			const client: Client = {
				id: action.client?.id,
				address: action.client?.address,
				birthday: action.client?.birthday,
				country: action.client?.country,
				email: action.client?.email,
				location: action.client?.location,
				name: action.client?.name,
				password: action.client?.photo,
				photo: action.client?.photo,
				postal_code: action.client?.postal_code,
				state: action.client?.state,
				telephone: action.client?.telephone,
				tin: action.client?.tin,
			};
			return {
				...state,
				client,
			};
		}
		default:
			return state;
	}
};
