import { action, EmptyAction, PayloadAction } from 'typesafe-actions';
import { Product, ProductAction, ProductActions /* Category */ } from './types';

export const productList = (product: Product) => {
	const action: ProductAction = {
		type: ProductActions.PRODUCT_LIST,
		product,
	};

	return action;
};

/* export const categoryList = (category: Category) => {
	const action: ProductAction = {
		type: ProductActions.CATEGORY_LIST,
		category,
	};

	return action;
}; */

const GetCategoryList = (data: string[]): PayloadAction<string, string[]> => action(ProductActions.CATEGORY_LIST, data);
