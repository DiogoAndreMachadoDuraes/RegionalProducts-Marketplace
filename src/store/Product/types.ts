export enum ProductActions {
	PRODUCT_LIST = 'PRODUCT_LIST',
	CATEGORY_LIST = 'CATEGORY_LIST',
}

export interface Product {
	id: string;
	category: string;
	email_producer: string;
	harvest_date: string;
	id_producer: number;
	logo_producer: string;
	name: string;
	name_producer: string;
	photo: string;
	price: number;
	quantity: number;
	stock: number;
	validity: string;
}

export type ProductState = {
	products: Product[];
	/* categories: string[]; */
};

export type ProductAction = {
	type: string;
	product: Product;
	/* category: string; */
};

export type DispatchTypeProduct = (args: ProductAction) => ProductAction;
