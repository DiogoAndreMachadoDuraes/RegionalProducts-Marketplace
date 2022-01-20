import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { UserState, userReducer } from './User';
import { ProductState, productReducer } from './Product';
import { CategoryState, categoryReducer } from './Category';
import { ProducerState, producerReducer } from './Producer';

export interface StoreState {
	common: UserState;
	products: ProductState;
	categories: CategoryState;
	producer: ProducerState;
}

const appReducers = combineReducers({
	common: userReducer,
	products: productReducer,
	categories: categoryReducer,
	producer: producerReducer,
});

export const store = createStore(appReducers, composeWithDevTools());
