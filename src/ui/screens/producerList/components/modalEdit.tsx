import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

interface ModalEditProps {
	showModalEdit: boolean;
	handleCloseEdit: () => void;
	producerName: string;
	handleType: (e: React.ChangeEvent<HTMLInputElement>) => void;
	producerState: string;
	handleEdit: () => void;
}

export const ModalEdit: React.FC<ModalEditProps> = ({
	showModalEdit,
	handleCloseEdit,
	producerName,
	handleType,
	producerState,
	handleEdit,
}) => {
	return (
		<Modal show={showModalEdit} onHide={handleCloseEdit} animation={false}>
			<Modal.Header closeButton>
				<Modal.Title style={{ color: '#8A3535', fontFamily: 'Artifika', fontWeight: 'bold' }}>
					Editar estado do produtor
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="formBasicRange">
						<Form.Label style={{ fontFamily: 'Artifika' }}>
							Estado da conta do utilizador {producerName}{' '}
						</Form.Label>
						<Form.Control required onChange={handleType} as="select" defaultValue={producerState}>
							<option value={'aceite'}>Conta Ativa</option>
							<option value={'rejeitada'}>Conta Inativa</option>
						</Form.Control>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleCloseEdit}>
					Cancelar
				</Button>
				<Button variant="primary" onClick={handleEdit}>
					Guardar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
