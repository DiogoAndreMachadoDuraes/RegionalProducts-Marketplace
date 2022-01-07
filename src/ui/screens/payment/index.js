import React from 'react';
import './style.css';
import { Col, Container, Row, Navbar, Form, Nav, Button, Image } from 'react-bootstrap';
import { images } from 'assets';

class CheckoutPayment extends React.Component {
	render() {
		return (
			<div>
				<Navbar collapseOnSelect expand="lg" className={'nav-up'}>
					<Container fluid Color="black">
						<Row id="row">
							<Col sm={3}>
								<Navbar.Brand>
									<Image src={images.logo} />
								</Navbar.Brand>
							</Col>
							<Col sm={1}>
								<Nav className="mr-auto">
									<Nav.Link href="/ship">
										<h3 style={{ fontSize: 18, color: 'black' }}>Envio</h3>
									</Nav.Link>
								</Nav>
							</Col>
							<Col>
								<hr
									style={{
										color: '#000000',
										backgroundColor: '#000000',
										height: 0.5,
										borderColor: '#000000',
										width: 200,
									}}
								></hr>
							</Col>
							<Col sm={1.5}>
								<Nav className="mr-auto">
									<Nav.Link href="/confirmation">
										<h3 style={{ fontSize: 18, color: 'black' }}>Confirmação</h3>
									</Nav.Link>
								</Nav>
							</Col>
							<Col>
								<hr
									style={{
										color: '#000000',
										backgroundColor: '#000000',
										height: 0.5,
										borderColor: '#000000',
										width: 200,
									}}
								></hr>
							</Col>
							<Col sm={2}>
								<Nav className="mr-auto">
									<Nav.Link href="">
										<h3
											style={{
												fontSize: 24,
												fontWeight: 'bold',
												color: 'black',
												textDecoration: 'underline',
											}}
										>
											Pagamento
										</h3>
									</Nav.Link>
								</Nav>
							</Col>

							<Col sm={1} />
						</Row>
					</Container>
				</Navbar>

				<Container>
					<br></br>
					<Row>
						{' '}
						<h2
							style={{
								color: 'black',
								fontFamily: 'artifika',
								marginLeft: 50,
								fontWeight: 'bold',
								marginTop: 30,
							}}
						>
							Por favor selecione um método de pagamento :{' '}
						</h2>
					</Row>

					<Container style={{ marginTop: 50 }}>
						<Row>
							<Col>
								<Form.Check
									style={{ marginLeft: 50, marginTop: 20 }}
									type="radio"
									aria-label="radio 1"
								/>
							</Col>
							<Col>
								{' '}
								<Image
									width="120"
									height="60"
									style={{ marginLeft: -200 }}
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Logo_MBWay.svg/1200px-Logo_MBWay.svg.png"
								/>
							</Col>
							<Col>
								{' '}
								<Form.Control
									style={{ marginLeft: -300 }}
									placeholder="Introduza o número de telemóvel:"
								/>{' '}
							</Col>
						</Row>

						<Row style={{ marginTop: 40 }}>
							<Col>
								<>
									<Form.Check
										style={{ marginLeft: 50, marginTop: 40 }}
										type="radio"
										aria-label="radio 2"
									/>
								</>
							</Col>
							<Col>
								{' '}
								<Image
									width="170"
									height="100"
									style={{ marginLeft: -200 }}
									src="https://www.ntech.news/wp-content/uploads/2016/11/i006992.jpg"
								/>
							</Col>
							<Col> </Col>
						</Row>

						<Row style={{ marginTop: 40 }}>
							<Col>
								<>
									<Form.Check
										style={{ marginLeft: 50, marginTop: 10 }}
										type="radio"
										aria-label="radio 3"
									/>
								</>
							</Col>
							<Col>
								{' '}
								<Image
									width="140"
									height="40"
									style={{ marginLeft: -200 }}
									src="http://www.bh1.com.br/wp-content/uploads/2018/05/logomarca-visa.gif"
								/>
							</Col>

							<Col>
								{' '}
								<Form.Control
									style={{ marginLeft: -300 }}
									placeholder="Introduza o número do cartão:"
								/>{' '}
							</Col>
						</Row>
					</Container>

					<Container style={{ marginTop: 40 }}>
						<Button
							variant="primary"
							size="lg"
							href="/confirmation"
							active
							style={{
								color: 'white',
								backgroundColor: '#AAAA74',
								fontFamily: 'artifika',
								marginLeft: 100,
								marginTop: 40,
							}}
						>
							Voltar
						</Button>{' '}
						<Button
							variant="primary"
							size="lg"
							href="/checkout"
							active
							style={{
								color: 'white',
								backgroundColor: '#444903',
								fontFamily: 'artifika',
								marginLeft: 300,
								marginTop: 40,
							}}
						>
							Confirmar
						</Button>{' '}
					</Container>
					<br></br>
				</Container>
			</div>
		);
	}
}

export default CheckoutPayment;
