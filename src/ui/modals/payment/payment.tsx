import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import { Col, Container, Row, Button, Image, Modal, Form } from 'react-bootstrap';
import { images } from 'assets';

interface ModalPaymentProps {
	show: boolean;
	onHide: () => void;
	handleContinue: () => void;
}

export const Payment: React.FC<ModalPaymentProps> = ({ show, onHide, handleContinue }) => {
	const [checkAtm, setCheckAtm] = useState(false);
	const [checkPaypal, setCheckPaypal] = useState(false);
	const [checkMbWay, setCheckMbWay] = useState(false);

	const [valueAtm, setValueAtm] = useState('');
	const [valueMbWay, setValueMbWay] = useState('');

	const handleChangeAtm = () => {
		setCheckAtm(true);
	};

	const handleChangePaypal = () => {
		setCheckPaypal(true);
	};

	const handleChangeMbWay = () => {
		setCheckMbWay(true);
	};

	return (
		<Modal show={show} onHide={onHide} backdrop="static" keyboard={false} centered={true} size="lg">
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
									checked={checkAtm}
									disabled={checkMbWay || checkPaypal}
									onChange={handleChangeAtm}
								/>
							</Col>
							<Col>
								<Image width="40" height="50" style={{ marginLeft: -200 }} src={images.m} />
							</Col>
							<Col>
								<Form.Control
									style={{ marginLeft: -360, fontFamily: 'artifika' }}
									placeholder="Introduza o número de cartão"
									value={valueAtm}
									disabled={checkMbWay || checkPaypal}
									onChange={(e) => setValueAtm(e.target.value)}
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
										checked={checkMbWay}
										disabled={checkAtm || checkPaypal}
										onChange={handleChangeMbWay}
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
									value={valueMbWay}
									disabled={checkAtm || checkPaypal}
									onChange={(e) => setValueMbWay(e.target.value)}
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
										checked={checkPaypal}
										disabled={checkAtm || checkMbWay}
										onChange={handleChangePaypal}
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
									onClick={onHide}
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
									onClick={handleContinue}
									variant="dark"
									disabled={(!checkAtm || valueAtm === '') && !checkMbWay && !checkPaypal}
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
			{/* <Confirmation /> */}
		</Modal>
	);
};
