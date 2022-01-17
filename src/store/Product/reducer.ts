import { ProductAction, ProductActions, ProductState } from './types';

export const productInitialState: ProductState = {
	products: [],
};

export const productReducer = (state: ProductState = productInitialState, action: ProductAction): ProductState => {
	switch (action.type) {
		case ProductActions.PRODUCT_LIST: {
			return {
				...state,
				products: [...state.products, action.product],
			};
		}
		default:
			return state;
	}
};
