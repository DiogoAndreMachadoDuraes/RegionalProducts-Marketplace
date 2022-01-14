import React from 'react';
import { Nav, Row, Col } from 'react-bootstrap';
import { GiExitDoor } from 'react-icons/gi';
import { useHistory } from 'react-router-dom';

interface HeaderTopProps {
	name: string;
}

export const HeaderTopWithSession: React.FC<HeaderTopProps> = ({ name }) => {
	const history = useHistory();

	const handleAccount = () => {
		history.push('/profile');
	};

	return (
		<Row>
			<Col sm={4} />
			<Col sm={6}>
				<Nav className="mr-auto">
					<Nav.Link onClick={handleAccount}>
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
			<Col sm={1}>
				<Nav className="mr-auto">
					<Nav.Link href="/" eventKey={2}>
						<Row>
							<GiExitDoor size="30" />
						</Row>
					</Nav.Link>
				</Nav>
			</Col>
			<Col sm={1} />
		</Row>
	);
};
