import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { MdError } from 'react-icons/md';
import { useHistory } from 'react-router';

export const ErrorPage: React.FC = () => {
	const history = useHistory();
	const [show, setShow] = useState(true);

	const handleClose = () => setShow(false);

	const handleHome = () => history.push('/');

	return (
		<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered={true}>
			<Modal.Body>
				<div
					style={{
						padding: '12px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						textAlign: 'center',
						marginTop: 10,
					}}
				>
					<MdError size="80" color="#9B3939" />
					<h1
						style={{
							marginTop: 30,
							color: 'black',
							fontWeight: 'bold',
							fontSize: 20,
						}}
					>
						Tente novamente
					</h1>
					<h2 style={{ marginTop: 8, color: 'grey', fontSize: 12, margin: 0 }}>
						A página não pode ser carregada, tente novamente mais tarde.
					</h2>
					<Button
						onClick={handleHome}
						variant="light"
						size="lg"
						style={{
							color: 'white',
							backgroundColor: '#9B3939',
							marginTop: 50,
							marginBottom: 20,
						}}
					>
						Home
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
};
