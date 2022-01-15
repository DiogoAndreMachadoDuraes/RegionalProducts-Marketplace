import { StoreState } from './index';
import { userInitialState } from './User';
import { productInitialState } from './Product';

export const mockState: StoreState = {
	common: userInitialState,
	products: productInitialState,
};
