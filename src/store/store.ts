import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { UserState, userReducer } from './User';
import { ProductState, productReducer } from './Product';
import { CategoryState, categoryReducer } from './Category';

export interface StoreState {
	common: UserState;
	products: ProductState;
	categories: CategoryState;
}

const appReducers = combineReducers({
	common: userReducer,
	products: productReducer,
	categories: categoryReducer,
});

export const store = createStore(appReducers, composeWithDevTools());
