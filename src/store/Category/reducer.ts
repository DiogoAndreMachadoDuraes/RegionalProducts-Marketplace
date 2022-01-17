import { CategoryAction, CategoryActions, CategoryState } from './types';

export const categoryInitialState: CategoryState = {
	categories: [''],
};

export const categoryReducer = (state: CategoryState = categoryInitialState, action: CategoryAction): CategoryState => {
	switch (action.type) {
		case CategoryActions.CATEGORY_LIST: {
			return {
				...state,
				categories: action.category,
			};
		}
		default:
			return state;
	}
};
