import { StoreState } from './index';
import { userInitialState } from './User';
import { productInitialState } from './Product';
import { categoryInitialState } from './Category';

export const mockState: StoreState = {
	common: userInitialState,
	products: productInitialState,
	categories: categoryInitialState,
};
