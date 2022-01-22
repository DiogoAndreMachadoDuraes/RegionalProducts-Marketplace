import React from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { Product, useProductListProducer } from '../useProductListProducer';
import { ModalEdit, ModalDelete } from './index';

interface TableShowProps {
	item: Product;
	index: number;
}

export const TableShow: React.FC<TableShowProps> = ({ item, index }) => {
	const {
		showModalEdit,
		handleCloseEdit,
		handleShowEdit,
		showModalDelete,
		handleCloseDelete,
		productName,
		handleType,
		productState,
		handleEdit,
		handleDelete,
		handleShowDelete,
	} = useProductListProducer();

	return (
		<tr key={index}>
			<td>{item.name}</td>
			<td>{item.category}</td>
			<td>{item.validity}</td>
			<td>{item.quantity}</td>
			<td>{item.harvest}</td>
			<td>{item.stock}</td>
			<td>{item.price}</td>
			<td>{item.photo}</td>
			<td>
				<AiFillEdit size="25" onClick={() => handleShowEdit(item)} color="#9B3939" />
				{showModalEdit && (
					<ModalEdit
						showModalEdit={showModalEdit}
						handleCloseEdit={handleCloseEdit}
						productName={productName}
						handleType={handleType}
						productState={productState}
						handleEdit={handleEdit}
					/>
				)}
			</td>
			<td>
				<AiFillDelete size="25" onClick={() => handleShowDelete(item)} color="#9B3939" />
				{showModalDelete && (
					<ModalDelete
						showModalDelete={showModalDelete}
						handleCloseDelete={handleCloseDelete}
						productName={productName}
						handleDelete={handleDelete}
					/>
				)}
			</td>
		</tr>
	);
};
