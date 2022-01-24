export enum ProductActions {
	PRODUCT_LIST = 'PRODUCT_LIST',
	CATEGORY_LIST = 'CATEGORY_LIST',
}

export interface Product {
	id: string;
	_id: {
		$oid: string;
	};
	category: string;
	email_producer: string;
	harvest: string;
	id_producer: string;
	logo_producer: string;
	name: string;
	name_producer: string;
	photo: string;
	price: number;
	quantity: string;
	stock: number;
	validity: string;
}

export type ProductState = {
	products: Product[];
};

export type ProductAction = {
	type: string;
	product: Product;
};

export type DispatchTypeProduct = (args: ProductAction) => ProductAction;
