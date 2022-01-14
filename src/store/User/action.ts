import { User, UserAction, UserActions } from './types';

export const newUser = (user: User) => {
	const action: UserAction = {
		type: UserActions.USER_NEW,
		user,
	};

	return action;
};
