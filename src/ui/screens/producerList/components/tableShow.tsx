import React from 'react';
import { Image } from 'react-bootstrap';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { Producer, useProducerList } from '../useProducerList';
import { ModalEdit, ModalDelete } from './index';

interface TableShowProps {
	item: Producer;
	index: number;
}

export const TableShow: React.FC<TableShowProps> = ({ item, index }) => {
	const {
		showModalEdit,
		handleCloseEdit,
		handleShowEdit,
		showModalDelete,
		handleCloseDelete,
		producerName,
		handleType,
		producerState,
		handleEdit,
		handleDelete,
		handleShowDelete,
	} = useProducerList();

	return (
		<tr key={index}>
			<td>{item.name}</td>
			<td>{item.tin}</td>
			<td>{item.address}</td>
			<td>
				{item.postal_code} {item.location}
			</td>
			<td>{item.telephone}</td>
			<td>{item.email}</td>
			<td>
				<Image height="50" width="50" src={item.logo}></Image>
			</td>
			<td>{item.state}</td>
			<td>
				<AiFillEdit size="25" onClick={() => handleShowEdit(item)} color="#9B3939" />
				{showModalEdit && (
					<ModalEdit
						showModalEdit={showModalEdit}
						handleCloseEdit={handleCloseEdit}
						producerName={producerName}
						handleType={handleType}
						producerState={producerState}
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
						producerName={producerName}
						handleDelete={handleDelete}
					/>
				)}
			</td>
		</tr>
	);
};
