import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

interface ModalEditProps {
	showModalEdit: boolean;
	handleCloseEdit: () => void;
	productName: string;
	handleType: (e: React.ChangeEvent<HTMLInputElement>) => void;
	productState: string;
	handleEdit: () => void;
}

export const ModalEdit: React.FC<ModalEditProps> = ({
	showModalEdit,
	handleCloseEdit,
	productName,
	handleType,
	productState,
	handleEdit,
}) => {
	return (
		<Modal show={showModalEdit} onHide={handleCloseEdit} animation={false}>
			<Modal.Header closeButton>
				<Modal.Title style={{ color: '#8A3535', fontFamily: 'Artifika', fontWeight: 'bold' }}>
					Editar estado do produto
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="formBasicRange">
						<Form.Label style={{ fontFamily: 'Artifika' }}>Estado do produto {productName} </Form.Label>
						<Form.Control required onChange={handleType} as="select" defaultValue={productState}>
							<option value={'aceite'}>Produto Ativo</option>
							<option value={'rejeitado'}>Produto Inativo</option>
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
