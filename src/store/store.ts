import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { UserState, userReducer } from './User';
import { ProductState, productReducer } from './Product';

export interface StoreState {
	common: UserState;
	products: ProductState;
}

const appReducers = combineReducers({
	common: userReducer,
	products: productReducer,
});

export const store = createStore(appReducers, composeWithDevTools());
