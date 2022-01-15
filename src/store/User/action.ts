import { Client, User, UserAction, UserActions } from './types';

export const userLogin = (user: User) => {
	const action: UserAction = {
		type: UserActions.USER_LOGIN,
		user,
	};

	return action;
};

export const userInfo = (client: Client) => {
	const action: UserAction = {
		type: UserActions.USER_INFO,
		client,
	};

	return action;
};
