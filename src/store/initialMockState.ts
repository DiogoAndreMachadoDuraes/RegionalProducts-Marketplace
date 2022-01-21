import { StoreState } from './index';
import { userInitialState } from './User';
import { productInitialState } from './Product';
import { categoryInitialState } from './Category';
import { producerInitialState } from './Producer';
import { orderInitialState } from './Order';
import { adminInitialState } from './Admin';

export const mockState: StoreState = {
	common: userInitialState,
	products: productInitialState,
	categories: categoryInitialState,
	producer: producerInitialState,
	orders: orderInitialState,
	admin: adminInitialState,
};
