import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ModalReducer, ModalState } from './Modal';
import { UserState, userReducer } from './User';

/** Store Type */
export interface StoreState {
	common: UserState;
	modal: ModalState;
}

const appReducers = combineReducers({
	common: userReducer,
	modal: ModalReducer,
});

export const store = createStore(appReducers, composeWithDevTools());
