import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface ModalSuccessProps {
	show: boolean;
	handleClose: () => void;
	name: string;
	handleLogin: () => void;
}

export const ModalSuccess: React.FC<ModalSuccessProps> = ({ show, handleClose, name, handleLogin }) => {
	return (
		<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
			<Modal.Header>
				<Modal.Title>Criação da conta de produtor</Modal.Title>
			</Modal.Header>
			<Modal.Body>O produtor {name} foi criado com sucesso!</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={handleLogin}>
					Iniciar Sessão
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
