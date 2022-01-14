import React, { useState } from 'react';
import { Nav, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Login } from 'ui';

export const HeaderTopWithoutSession: React.FC = () => {
	const history = useHistory();

	const handleRegister = () => {
		history.push('/register');
	};

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<Row>
			<Col lg={4} sm={2} xs={2} />
			<Col lg={8} sm={10} xs={10}>
				<Nav className="mr-auto">
					<Nav.Link>
						<Button
							variant="outline-dark"
							onClick={handleShow}
							style={{
								color: 'black',
								fontWeight: 500,
								borderRadius: 20,
							}}
						>
							Iniciar Sessão
						</Button>
					</Nav.Link>
					<Nav.Link eventKey={2}>
						<Button
							variant="outline-light"
							onClick={handleRegister}
							style={{
								color: '#9B3939',
								fontWeight: 500,
								backgroundColor: 'white',
								borderRadius: 20,
								marginLeft: 15,
							}}
						>
							Criar Conta
						</Button>
					</Nav.Link>
				</Nav>
			</Col>
			<Login show={show} onHide={handleClose} />
		</Row>
	);
};
