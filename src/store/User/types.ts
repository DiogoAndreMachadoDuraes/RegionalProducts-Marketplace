export enum UserActions {
	USER_LOGIN = 'USER_LOGIN',
	USER_INFO = 'USER_INFO',
}

export interface User {
	email?: string;
	id?: string;
	name?: string;
	token?: string;
	type?: string;
	isLogged?: boolean;
}

export interface Client {
	id?: string;
	address?: string;
	birthday?: string;
	country?: string;
	email?: string;
	location?: string;
	name?: string;
	password?: string;
	photo?: string;
	postal_code?: string;
	state?: string;
	telephone?: string;
	tin?: number;
}

export type UserState = {
	user: User;
	client: Client;
};

export type UserAction = {
	type: string;
	user?: User;
	client?: Client;
};

export type DispatchTypeUser = (args: UserAction) => UserAction;
