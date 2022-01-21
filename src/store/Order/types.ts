export enum OrderActions {
	ORDER_LIST = 'ORDER_LIST',
}

export interface Order {
	id: string;
	_id: {
		$oid: string;
	};
	country_client: string;
	date: string;
	pdf_invoice: string;
	hour: string;
	id_client: string;
	id_product: string;
	photo_product: string;
	location_client: string;
	email_client: string;
	postal_code: string;
	price_final: number;
	quantity_final: number;
	address_client: string;
	tax: string;
	tin_client: number;
	vat: string;
	avaliation: string;
	name_product: string;
}

export type OrderState = {
	orders: Order[];
};

export type OrderAction = {
	type: string;
	order: Order;
};

export type DispatchTypeOrder = (args: OrderAction) => OrderAction;
