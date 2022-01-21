import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { UserState, userReducer } from './User';
import { ProductState, productReducer } from './Product';
import { CategoryState, categoryReducer } from './Category';
import { ProducerState, producerReducer } from './Producer';
import { orderReducer, OrderState } from './Order';
import { AdminState, adminReducer } from './Admin';

export interface StoreState {
	common: UserState;
	products: ProductState;
	categories: CategoryState;
	producer: ProducerState;
	orders: OrderState;
	admin: AdminState;
}

const appReducers = combineReducers({
	common: userReducer,
	products: productReducer,
	categories: categoryReducer,
	producer: producerReducer,
	orders: orderReducer,
	admin: adminReducer,
});

export const store = createStore(appReducers, composeWithDevTools());
