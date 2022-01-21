import { Admin, AdminAction, AdminActions } from './types';

export const adminInfo = (admin: Admin) => {
	const action: AdminAction = {
		type: AdminActions.ADMIN_INFO,
		admin,
	};

	return action;
};
