import React from 'react';
import { Nav, Button, Row, Col } from 'react-bootstrap';

export const HeaderTopWithoutSession: React.FC = () => {
	return (
		<Row>
			<Col lg={4} sm={2} xs={2} />
			<Col lg={8} sm={10} xs={10}>
				<Nav className="mr-auto">
					<Nav.Link href="/login">
						<Button
							variant="outline-dark"
							style={{
								color: 'black',
								fontWeight: 500,
								borderRadius: 20,
							}}
						>
							Iniciar Sessão
						</Button>
					</Nav.Link>
					<Nav.Link href="/register" eventKey={2}>
						<Button
							variant="outline-light"
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
		</Row>
	);
};
