import { action, Action } from 'typesafe-actions';
import { ModalTypes } from './types';

const hideLogin = (): Action => action(ModalTypes.HIDE_LOGIN_MODAL);
const showLogin = (): Action => action(ModalTypes.SHOW_LOGIN_MODAL);

export const ModalActions = {
	hideLogin,
	showLogin,
};
