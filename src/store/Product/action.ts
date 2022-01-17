import { Product, ProductAction, ProductActions } from './types';

export const productList = (product: Product) => {
	const action: ProductAction = {
		type: ProductActions.PRODUCT_LIST,
		product,
	};

	return action;
};
