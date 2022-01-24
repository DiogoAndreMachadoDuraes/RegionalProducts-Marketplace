import React from 'react';
import { Image } from 'react-bootstrap';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { Product, useProductListProducer } from '../useProductListProducer';
import { ModalDelete } from './index';

interface TableShowProps {
	item: Product;
	index: number;
}

export const TableShow: React.FC<TableShowProps> = ({ item, index }) => {
	const history = useHistory();
	const { showModalDelete, handleCloseDelete, productName, handleDelete, handleShowDelete } =
		useProductListProducer();

	return (
		<tr key={index}>
			<td>{item.name}</td>
			<td>{item.category}</td>
			<td>{item.quantity}</td>
			<td>{item.validity}</td>
			<td>{item.harvest}</td>
			<td>{item.price} €</td>
			<td>
				<Image src={item.photo} width={80} height={80} />
			</td>
			<td>{item.stock}</td>
			<td>
				<AiFillEdit size="25" onClick={() => history.push('/editProduct' + item.id.$oid)} color="#9B3939" />
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
