import { ActionType } from 'typesafe-actions';
import { ModalActions } from './actions';
import { ModalInitialState } from './initialState';
import { ModalState } from './models';
import { ModalTypes } from './types';

export const modalInitialState: ModalState = {
	modalLogin: false,
};

export const ModalReducer = (
	state: ModalState = ModalInitialState,
	action: ActionType<typeof ModalActions>
): ModalState => {
	switch (action.type) {
		case ModalTypes.HIDE_LOGIN_MODAL: {
			return { ...state, modalLogin: false };
		}
		case ModalTypes.SHOW_LOGIN_MODAL: {
			return { ...state, modalLogin: true };
		}
		default:
			return { ...state };
	}
};
