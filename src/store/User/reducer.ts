import { User, UserAction, UserActions, UserState } from './types';

export const userInitialState: UserState = {
	user: {
		email: '',
		id: '',
		name: '',
		token: '',
		type: '',
		isLogged: false,
	},
};

export const userReducer = (state: UserState = userInitialState, action: UserAction): UserState => {
	switch (action.type) {
		case UserActions.USER_NEW: {
			const user: User = {
				email: action.user.email,
				id: action.user.id,
				name: action.user.name,
				token: action.user.token,
				type: action.user.type,
				isLogged: true,
			};
			return {
				...state,
				user,
			};
		}
		default:
			return state;
	}
};
