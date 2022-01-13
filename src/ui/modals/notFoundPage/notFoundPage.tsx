import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { MdError } from 'react-icons/md';

export const NotFoundPage: React.FC = () => {
	const [show, setShow] = useState(true);

	const handleClose = () => setShow(false);

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
						Sem acesso
					</h1>
					<h2 style={{ marginTop: 8, color: 'grey', fontSize: 12, margin: 0 }}>
						Lamentamos, mas não existe a página pretendida.
					</h2>
					<Button
						href="/"
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
