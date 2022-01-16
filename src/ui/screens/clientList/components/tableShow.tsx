import React from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { Client, useClientList } from '../useClientList';
import { ModalEdit, ModalDelete } from './index';

interface TableShowProps {
	item: Client;
	index: number;
}

export const TableShow: React.FC<TableShowProps> = ({ item, index }) => {
	const {
		showModalEdit,
		handleCloseEdit,
		handleShowEdit,
		showModalDelete,
		handleCloseDelete,
		clientName,
		handleType,
		clientState,
		handleEdit,
		handleDelete,
		handleShowDelete,
	} = useClientList();

	return (
		<tr key={index}>
			<td>{item.name}</td>
			<td>{item.tin}</td>
			<td>{item.birthday}</td>
			<td>{item.address}</td>
			<td>
				{item.postal_code} {item.location}
			</td>
			<td>{item.telephone}</td>
			<td>{item.email}</td>
			<td>{item.state}</td>
			<td>
				<AiFillEdit size="25" onClick={() => handleShowEdit(item)} color="#9B3939" />
				{showModalEdit && (
					<ModalEdit
						showModalEdit={showModalEdit}
						handleCloseEdit={handleCloseEdit}
						clientName={clientName}
						handleType={handleType}
						clientState={clientState}
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
						clientName={clientName}
						handleDelete={handleDelete}
					/>
				)}
			</td>
		</tr>
	);
};
