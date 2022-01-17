export enum CategoryActions {
	CATEGORY_LIST = 'CATEGORY_LIST',
}

export type CategoryState = {
	categories: string[];
};

export type CategoryAction = {
	type: string;
	category: string[];
};

export type DispatchTypeCategory = (args: CategoryAction) => CategoryAction;
