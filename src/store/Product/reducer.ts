import { ProductAction, ProductActions, ProductState } from './types';

export const productInitialState: ProductState = {
	products: [],
	/* categories: [], */
};

export const productReducer = (state: ProductState = productInitialState, action: ProductAction): ProductState => {
	switch (action.type) {
		case ProductActions.PRODUCT_LIST: {
			return {
				...state,
				products: [...state.products, action.product],
			};
		}
		/* case ProductActions.CATEGORY_LIST: {
			return {
				...state,
				categories: [...state.categories, action.category],
			};
		} */
		default:
			return state;
	}
};
