export enum AdminActions {
	ADMIN_INFO = 'ADMIN_INFO',
}

export interface Admin {
	id?: string;
	address?: string;
	birthday?: string;
	country?: string;
	email?: string;
	location?: string;
	name?: string;	
	postal_code?: string;
	state?: string;
	telephone?: string;
	tin?: number;

}

export type AdminState = {
	admin:Admin;
};

export type AdminAction = {
	type: string;
	admin: Admin;
};

export type DispatchTypeAdmin = (args: AdminAction) => AdminAction;
