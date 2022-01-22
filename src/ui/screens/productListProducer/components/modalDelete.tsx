import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface ModalDeleteProps {
	showModalDelete: boolean;
	handleCloseDelete: () => void;
	productName: string;
	handleDelete: () => void;
}

export const ModalDelete: React.FC<ModalDeleteProps> = ({
	showModalDelete,
	handleCloseDelete,
	productName,
	handleDelete,
}) => {
	return (
		<Modal show={showModalDelete} onHide={handleCloseDelete} animation={false}>
			<Modal.Header closeButton>
				<Modal.Title style={{ color: '#8A3535', fontFamily: 'Artifika', fontWeight: 'bold' }}>
					Eliminar produto
				</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ fontFamily: 'Artifika' }}>Pretende eliminar o utilizador {productName}?</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleCloseDelete}>
					Cancelar
				</Button>
				<Button variant="primary" onClick={handleDelete}>
					Eliminar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
