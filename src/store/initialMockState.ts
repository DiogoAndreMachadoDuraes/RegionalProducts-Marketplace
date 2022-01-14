import { StoreState } from '.';
import { modalInitialState } from './Modal';
import { userInitialState } from './User';

export const mockState: StoreState = {
	common: userInitialState,
	modal: modalInitialState,
};
