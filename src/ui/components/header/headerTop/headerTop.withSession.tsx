import React from 'react';
import { Nav, Row, Col, Image } from 'react-bootstrap';
import { GiExitDoor } from 'react-icons/gi';
import { useHistory } from 'react-router-dom';
import { StoreState } from 'store';
import { useSelector } from 'react-redux';
import { images } from 'assets';

interface HeaderTopProps {
	name?: string;
}

export const HeaderTopWithSession: React.FC<HeaderTopProps> = ({ name }) => {
	const userPhoto = useSelector((state: StoreState) => state.common.client.photo);

	const history = useHistory();

	const handleAccount = () => {
		history.push('/profile');
	};

	return (
		<Row>
			<Col sm={3} />
			<Col sm={5}>
				<Nav className="mr-auto">
					<Nav.Link onClick={handleAccount}>
						<Row>
							<Image
								src={userPhoto ? userPhoto : images.imageProfileDefault}
								width={37}
								height={37}
								roundedCircle
							/>
							<h3 style={{ fontSize: 14, color: 'black', marginLeft: 20 }}>
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
						</Row>
					</Nav.Link>
				</Nav>
			</Col>
			<Col sm={2} />
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
