import React from 'react';
import { Order } from 'store';

interface TableShowProps {
	item: Order;
	index: number;
}

export const TableShow: React.FC<TableShowProps> = ({ item, index }) => {
	return (
		<tr key={index}>
			<td>{item._id.$oid}</td>
			<td>{item.email_client}</td>
			<td>{item.quantity_final}</td>
			<td>{item.name_product}</td>
			<td>
				{item.date} {item.hour}
			</td>
		</tr>
	);
};
