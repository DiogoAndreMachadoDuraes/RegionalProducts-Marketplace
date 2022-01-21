import { Admin, AdminAction, AdminActions, AdminState } from './types';

export const adminInitialState: AdminState = {
	admin: {
		id: '',
		address: '',
		birthday: '',
		country: '',
		email: '',
		location: '',
		name: '',
		
		postal_code: '',
		state: '',
		telephone: '',
		tin: 0,
		
		},
};

export const adminReducer = (state: AdminState = adminInitialState, action: AdminAction): AdminState => {
	switch (action.type) {
		case AdminActions.ADMIN_INFO: {
			const admin: Admin = {
				id: action.admin?.id,
				address: action.admin?.address,
				birthday: action.admin?.birthday,
				country: action.admin?.country,
				email: action.admin?.email,
				location: action.admin?.location,
				name: action.admin?.name,
		
				postal_code: action.admin?.postal_code,
				state: action.admin?.state,
				telephone: action.admin?.telephone,
				tin: action.admin?.tin,
				
			};
			return {
				...state,
				admin,
			};
		}
		default:
			return state;
	}
};
