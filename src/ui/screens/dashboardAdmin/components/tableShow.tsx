import React from 'react';
import { Order } from 'store';
import { useDashboardAdminList } from '../useDashboardAdmin';

interface TableShowProps {
	item: Order;
	index: number;
}

export const TableShow: React.FC<TableShowProps> = ({ item, index }) => {
	const { isLogged, isLoading, type, order } = useDashboardAdminList();

	return (
		<tr key={index}>
			<td>{item._id}</td>
			<td>{item.quantity_final}</td>
			<td>{item.name_product}</td>
			<td>
				{item.date} {item.hour}
			</td>
		</tr>
	);
};
