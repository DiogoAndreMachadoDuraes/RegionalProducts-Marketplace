import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import { Col, Container, Row, Button, Image, Modal, Form } from 'react-bootstrap';
import { images } from 'assets';
import axios from 'axios';

import { useHistory } from 'react-router';

export const Payment: React.FC = () => {
	const [show, setShow] = useState(true);
	const Spacer = require('react-spacer');

	const [isLoading, setIsLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(4.99);
	const [empty, setEmpty] = useState(true);

	const history = useHistory();

	const handleClose = () => setShow(false);

	return (
		<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered={true} size="lg">
			<Modal.Body>
				<div>
					<Row id="row"></Row>
					<div style={{ flexDirection: 'row', display: 'flex', marginLeft: '10px' }}>
						<Image src={images.stepThree} />
						<h1
							style={{
								marginLeft: '20px',
								fontWeight: 'bold',
								color: '#8A3535',
								fontFamily: 'artifika',
								marginTop: '10px',
							}}
						>
							Método de Pagamento
						</h1>
					</div>
					<div style={{ height: 1, backgroundColor: '#8A3535', marginTop: '20px' }}></div>
					<br />
					<br />
					<Container>
						<Row>
							<Col>
								<Form.Check
									style={{ marginLeft: 20, marginTop: 8 }}
									type="radio"
									aria-label="radio 1"
								/>
							</Col>
							<Col>
								<Image width="40" height="50" style={{ marginLeft: -200 }} src={images.m} />
							</Col>
							<Col>
								<Form.Control
									style={{ marginLeft: -360, fontFamily: 'artifika' }}
									placeholder="Introduza o número de cartão"
								/>
							</Col>
						</Row>

						<Row style={{ marginTop: 60 }}>
							<Col>
								<>
									<Form.Check
										style={{ marginLeft: 20, marginTop: 5 }}
										type="radio"
										aria-label="radio 2"
									/>
								</>
							</Col>
							<Col>
								<Image
									width="60"
									height="35"
									style={{ marginLeft: -200 }}
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Logo_MBWay.svg/1200px-Logo_MBWay.svg.png"
								/>
							</Col>
							<Col>
								<Form.Control
									style={{ marginLeft: -360, fontFamily: 'artifika' }}
									placeholder="Introduza o número de telemóvel"
								/>
							</Col>
						</Row>

						<Row style={{ marginTop: 40 }}>
							<Col>
								<>
									<Form.Check
										style={{ marginLeft: 20, marginTop: 10 }}
										type="radio"
										aria-label="radio 3"
									/>
								</>
							</Col>
							<Col>
								<Image width="40" height="40" style={{ marginLeft: -330 }} src={images.p} />
							</Col>
						</Row>
					</Container>
					<br />
					<div style={{ height: 1, backgroundColor: '#8A3535', marginTop: '20px' }}></div>
					<br />
					<br />
					<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
						<Row id="row">
							<Col sm={1} />
							<Col sm={1}>
								<Button
									href="/confirmation"
									variant="dark"
									size="lg"
									style={{ color: '#9B3939', backgroundColor: 'white', fontFamily: 'artifika' }}
								>
									Voltar
								</Button>
							</Col>
							<Col sm={8} style={{ marginTop: 60 }} />
							<Col sm={1}>
								<Button
									href="/payment"
									variant="dark"
									disabled={empty}
									size="lg"
									style={{ color: 'white', backgroundColor: '#9B3939', fontFamily: 'artifika' }}
								>
									Comprar
								</Button>
							</Col>
							<Col sm={1} />
						</Row>
					</Tab.Container>
				</div>
			</Modal.Body>
		</Modal>
	);
};
