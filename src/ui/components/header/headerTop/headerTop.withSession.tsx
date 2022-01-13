import React from 'react';
import { Nav, Row, Col } from 'react-bootstrap';
import { GiExitDoor } from 'react-icons/gi';

interface HeaderTopProps {
	isLogged: boolean;
	name: string;
	type: string;
}

export const HeaderTopWithSession: React.FC<HeaderTopProps> = ({ isLogged, name, type }) => {
	const logout = () => {
		localStorage.removeItem('name');
		localStorage.removeItem('type');
		localStorage.removeItem('token');
	};

	const url = '/' + type + '';

	return (
		<Row>
			<Col sm={6}>
				<Nav className="mr-auto">
					<Nav.Link href={url}>
						<h3 style={{ fontSize: 14, color: 'black' }}>
							Bem vindo,
							<h3
								style={{
									fontSize: 14,
									fontWeight: 'bold',
									color: 'black',
									textDecoration: 'underline',
								}}
							>
								{name}
							</h3>
						</h3>
					</Nav.Link>
				</Nav>
			</Col>
			<Col sm={6}>
				<Nav className="mr-auto">
					<Nav.Link href="/home" onClick={logout} eventKey={2}>
						<Row>
							<Col sm={7}>
								<h3
									style={{
										fontSize: 14,
										color: 'black',
										textAlign: 'center',
									}}
								>
									Sair da conta
								</h3>
							</Col>
							<Col sm={5}>
								<GiExitDoor size="30" />
							</Col>
						</Row>
					</Nav.Link>
				</Nav>
			</Col>
		</Row>
	);
};
