import { CategoryActions, CategoryAction } from './types';

export const categoryList = (category: string[]) => {
	const action: CategoryAction = {
		type: CategoryActions.CATEGORY_LIST,
		category,
	};

	return action;
};
