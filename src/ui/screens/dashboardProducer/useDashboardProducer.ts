import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';

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

interface DashboardProducerOutPut {
	isLogged?: boolean;
	isLoading: boolean;
	type?: string;
	order?: Order[];
}

export const useDashboardProducerList = (): DashboardProducerOutPut => {
	const [order, setOrder] = useState<Order[]>();
	const [isLoading, setIsLoading] = useState(false);
	const token = useSelector((state: StoreState) => state.common.user.token);
	const type = useSelector((state: StoreState) => state.common.user.type);
	const isLogged = useSelector((state: StoreState) => state.common.user.isLogged);

	const orderInfo = useSelector((state: StoreState) => state.orders.orders);

	const [orderId, setOrderId] = useState('');
	const [quantityFinal, setQuantityFinal] = useState('');
	const [nameProduct, setNameProduct] = useState('');
	const [date, setDate] = useState('');
	const [hour, setHour] = useState('');
	const [avaliation, setAvaliation] = useState('');

	useEffect(() => {
		const fetchApi = async () => {
			if (order === undefined || isLoading) {
				try {
					let response = await fetch('http://127.0.0.1:5000/orders', {
						headers: {
							Authorization: 'Bearer ' + token,
							Accept: 'application/json',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							_id: orderId,
							date: date,
							hour: hour,
							quantity_final: quantityFinal,
							avaliation: avaliation,
							name_product: nameProduct,
						}),
					});
					let json = await response.json();
					setOrder(json);
					setIsLoading(true);
				} catch (e) {
					console.log('Error to get data: ' + e);
				}
			}
		};
		fetchApi();
	}, [order, isLoading, token]);

	return {
		isLogged,
		isLoading,
		type,
		order,
	};
};
