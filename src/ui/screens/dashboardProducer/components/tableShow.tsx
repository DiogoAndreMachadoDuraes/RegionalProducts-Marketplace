import React from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { Order } from 'store';
import { useDashboardProducerList } from '../useDashboardProducer';

interface TableShowProps {
	item: Order;
	index: number;
}

export const TableShow: React.FC<TableShowProps> = ({ item, index }) => {
	const { isLogged, isLoading, type, order } = useDashboardProducerList();

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
