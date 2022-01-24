import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';
import axios from 'axios';

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
	status: string;
}

interface DashboardAdminOutPut {
	isLogged?: boolean;
	isLoading: boolean;
	type?: string;
	order?: Order[];
}

export const useDashboardAdminList = (): DashboardAdminOutPut => {
	const [isLoading, setIsLoading] = useState(false);
	const token = useSelector((state: StoreState) => state.common.user.token);
	const type = useSelector((state: StoreState) => state.common.user.type);
	const isLogged = useSelector((state: StoreState) => state.common.user.isLogged);

	const [order, setOrder] = useState<Order[]>();

	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	useEffect(() => {
		axios.get(`http://127.0.0.1:5000/shoplist`, config).then((res) => {
			const order = res.data;
			setOrder(order);
			setIsLoading(true);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		isLogged,
		isLoading,
		type,
		order,
	};
};
