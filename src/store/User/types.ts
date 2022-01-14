export enum UserActions {
	USER_NEW = 'USER_NEW',
	USER_DELETED = 'USER_DELETED',
}

export interface User {
	email: string;
	id: string;
	name: string;
	token: string;
	type: string;
	isLogged: boolean;
}

export type UserState = {
	user: User;
};

export type UserAction = {
	type: string;
	user: User;
};

export type DispatchTypeUser = (args: UserAction) => UserAction;
