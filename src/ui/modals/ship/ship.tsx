import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import { Col, Container, Row, Navbar, Nav, Button, Image, Modal } from 'react-bootstrap';
import { images } from 'assets';
import axios from 'axios';
import moment from 'moment';
import { useHistory } from 'react-router';

interface ClientList {
	name: string;
	locality: string;
	postalCode: string;
	street: string;
	tin: string;
}

export const Ship: React.FC = () => {
	const [show, setShow] = useState(true);
	const Spacer = require('react-spacer');

	const [client, setClient] = useState<ClientList[]>();
	const [showModalDelete, setShowModalDelete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(4.99);

	const history = useHistory();

	const handleClose = () => setShow(false);

	return (
		<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered={true} size="lg">
			<Modal.Body>
				<div>
					<Navbar collapseOnSelect expand="lg" className={'nav-up'}>
						<Container fluid color="black">
							<Row id="row">
								<Col sm={1}>
									<Nav className="mr-auto">
										<Nav.Link href="/ship">
											<h3
												style={{
													fontSize: 24,
													color: 'white',
													fontFamily: 'artifika',
													textDecoration: 'underline',
													marginLeft: 14,
												}}
											>
												Envio
											</h3>
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
											<h3 style={{ fontSize: 18, color: 'white', fontFamily: 'artifika' }}>
												Confirmação
											</h3>
										</Nav.Link>
									</Nav>
								</Col>
								<Col>
									<hr
										style={{
											color: '#FFFFFF',
											backgroundColor: '#FFFFFF',
											height: 0.5,
											borderColor: '#FFFFFF',
											width: 200,
										}}
									></hr>
								</Col>
								<Col sm={2}>
									<Nav className="mr-auto">
										<Nav.Link href="/payment">
											<h3 style={{ fontSize: 18, color: 'white', fontFamily: 'artifika' }}>
												Pagamento
											</h3>
										</Nav.Link>
									</Nav>
								</Col>

								<Col sm={1} />
							</Row>
						</Container>
					</Navbar>
					<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
						<Row style={{ marginTop: 35 }}>
							<Col sm={1}></Col>
							<Col sm={6}>
								{' '}
								<h4
									style={{
										color: '#FFFFFF',
										fontWeight: 'bold',
										fontSize: 30,
										fontFamily: 'artifika',
									}}
								>
									Envio
								</h4>
							</Col>
							<Col sm={4}>
								{' '}
								<InputGroup className="mb-3"></InputGroup>
							</Col>
						</Row>
					</Tab.Container>

					<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
						<Row id="row">
							<Col sm={1} />
							<Col sm={10}>
								<Table
									size="20"
									style={{
										marginTop: 26,
										alignItems: 'center',
										justifyContent: 'center',
										textAlign: 'center',
									}}
								>
									<thead style={{ width: 10 }}>
										<tr>
											<td align="center">
												{' '}
												<Image
													src="https://i.pinimg.com/originals/09/8f/6c/098f6c69aaeda7d34e245cc9ed942e8e.png"
													width="55"
													height="55"
												/>
											</td>
											<th>
												<h4
													style={{ fontWeight: 'bold', fontSize: 18, fontFamily: 'artifika' }}
												>
													Onde devemos entregar a tua encomenda?{' '}
												</h4>
											</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th>
												<h4
													style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'artifika' }}
												>
													Endereço atual:
												</h4>
											</th>
											<td>{/* 	{client.street} - {client.locality} */}</td>
											<td>
												<Button
													href="/editclient"
													variant="dark"
													style={{
														color: 'white',
														backgroundColor: '#9B3939',
														fontFamily: 'artifika',
													}}
												>
													Editar
												</Button>
											</td>
										</tr>
									</tbody>
								</Table>
							</Col>
							<Col sm={1} />
						</Row>
					</Tab.Container>
					<div />

					<Container>
						<Row>
							<h1
								style={{
									marginTop: 50,
									fontSize: 18,
									textAlign: 'center',
									color: '#2f3300',
									fontWeight: 'bold',
									fontFamily: 'artifika',
								}}
							>
								Método de envio:{' '}
							</h1>
						</Row>
						<Container>
							<br></br>

							<Row>
								<Col>
									<Image
										src="https://4.bp.blogspot.com/-n4IEPwlCD2Y/XN2fukZ1DOI/AAAAAAAACk0/X5qGV-6rgxgvUbH34RKOMdO8O-l9yEI5gCLcBGAs/s1600/og-image.jpg"
										width="200"
										height="100"
										thumbnail
									/>
								</Col>

								<Col>
									<h6 style={{ textAlign: 'left', alignItems: 'center', fontFamily: 'artifika' }}>
										Entrega em 3-4 dias úteis na morada indicada. Para garantirmos a entrega da tua
										encomenda verifica se o contacto está correto: +351912312096
									</h6>
								</Col>

								<Col>
									{' '}
									<h6
										style={{
											fontWeight: 'bold',
											textAlign: 'center',
											alignItems: 'center',
											fontFamily: 'artifika',
										}}
									>
										Custo de envio: 4,99€
									</h6>
								</Col>
							</Row>
							<br></br>

							<br></br>
							<Row>
								<Col>
									<></>
								</Col>
							</Row>

							<br></br>
						</Container>
						<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
							<Row id="row" style={{ marginBottom: 80 }}>
								<Col sm={1} />
								<Col sm={1}>
									<Button
										href="/cart"
										variant="dark"
										size="lg"
										style={{ color: '#9B3939', backgroundColor: 'white', fontFamily: 'artifika' }}
									>
										Voltar
									</Button>
								</Col>
								<Col sm={8} style={{ marginTop: 100 }} />
								<Col sm={1}>
									<Button
										href="/confirmation"
										variant="dark"
										size="lg"
										style={{ color: 'white', backgroundColor: '#9B3939', fontFamily: 'artifika' }}
									>
										Seguinte
									</Button>
								</Col>
								<Col sm={1} />
							</Row>
						</Tab.Container>
					</Container>
				</div>
			</Modal.Body>
		</Modal>
	);
};

/* class Ship extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			client: [],
			showModalDelete: false,
		};
	}

	async componentDidMount() {
		try {
			let token = await localStorage.getItem('token');
			let type = await localStorage.getItem('type');
			let userId = await localStorage.getItem('userId');
			let name_client = await localStorage.getItem('name');
			if (token !== null) {
				this.setState({
					isLogged: true,
					token,
					type,
					userId,
					name_client,
				});
				console.log(userId);
			} else {
				this.setState({
					isLogged: false,
				});
			}
		} catch (e) {
			console.log('Error rending data: ' + e);
		}
		const { token, userId } = this.state;

		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		axios.get(`http://127.0.0.1:5000/client/${userId}`, config).then((res) => {
			const client = res.data;
			this.setState({ client });
			this.setState({
				name: client.name,
				tin: client.tin,
				birthday: client.birthday,
				telephone: client.telephone,
				street: client.street,
				locality: client.locality,
				country: client.country,
				postal_code: client.postal_code,
				email: client.email,
				password: client.password,
				state: client.state,
			});
		});
	}

	render() {
		const { client } = this.state;

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
										<h3
											style={{
												fontSize: 24,
												fontWeight: 'bold',
												color: 'black',
												textDecoration: 'underline',
											}}
										>
											Envio
										</h3>
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
									<Nav.Link href="/payment">
										<h3 style={{ fontSize: 18, color: 'black' }}>Pagamento</h3>
									</Nav.Link>
								</Nav>
							</Col>

							<Col sm={1} />
						</Row>
					</Container>
				</Navbar>
				<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
					<Row style={{ marginTop: 35 }}>
						<Col sm={1}></Col>
						<Col sm={6}>
							{' '}
							<h4 style={{ color: '#000000', fontWeight: 'bold', fontSize: 30 }}>Envio</h4>
						</Col>
						<Col sm={4}>
							{' '}
							<InputGroup className="mb-3"></InputGroup>
						</Col>
					</Row>
				</Tab.Container>

				<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
					<Row id="row">
						<Col sm={1} />
						<Col sm={10}>
							<Table
								size="20"
								style={{
									marginTop: 26,
									alignItems: 'center',
									justifyContent: 'center',
									textAlign: 'center',
								}}
							>
								<thead style={{ width: 10 }}>
									<tr>
										<td align="center">
											{' '}
											<Image
												src="https://i.pinimg.com/originals/09/8f/6c/098f6c69aaeda7d34e245cc9ed942e8e.png"
												width="55"
												height="55"
											/>
										</td>
										<th>
											<h4 style={{ fontWeight: 'bold', fontSize: 18 }}>
												Onde devemos entregar a tua encomenda?{' '}
											</h4>
										</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th align="rigth">
											{' '}
											<h4 style={{ fontSize: 16, fontWeight: 'bold' }}>Endereço atual:</h4>
										</th>
										<td>
											{client.street} - {client.locality}
										</td>
										<td>
											<Button
												href="/editclient"
												variant="dark"
												style={{ color: 'white', backgroundColor: '#AAAA74' }}
											>
												Editar
											</Button>
										</td>
									</tr>
								</tbody>
							</Table>
						</Col>
						<Col sm={1} />
					</Row>
				</Tab.Container>
				<div />

				<Container>
					{' '}
					<Row>
						{' '}
						<h1
							style={{
								marginTop: 50,
								fontSize: 18,
								textAlign: 'center',
								color: '#2f3300',
								fontWeight: 'bold',
							}}
						>
							Método de envio:{' '}
						</h1>
					</Row>
					<Container>
						<br></br>

						<Row>
							<Col>
								<Image
									src="https://4.bp.blogspot.com/-n4IEPwlCD2Y/XN2fukZ1DOI/AAAAAAAACk0/X5qGV-6rgxgvUbH34RKOMdO8O-l9yEI5gCLcBGAs/s1600/og-image.jpg"
									width="200"
									height="100"
									thumbnail
								/>
							</Col>

							<Col>
								{' '}
								<h6 style={{ textAlign: 'left', alignItems: 'center' }}>
									Entrega em 3-4 dias úteis na morada indicada. Para garantirmos a entrega da tua
									encomenda verifica se o contacto está correto: +351912312096
								</h6>
							</Col>

							<Col>
								{' '}
								<h6
									style={{
										fontWeight: 'bold',
										textAlign: 'center',
										alignItems: 'center',
									}}
								>
									Custo de envio: 4,99€
								</h6>
							</Col>
						</Row>
						<br></br>

						<br></br>
						<Row>
							<Col>
								<></>
							</Col>
						</Row>

						<br></br>
					</Container>
					<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
						<Row id="row" style={{ marginBottom: 80 }}>
							<Col sm={1} />
							<Col sm={1}>
								<Button
									href="/cart"
									variant="dark"
									size="lg"
									style={{ color: 'white', backgroundColor: '#AAAA74' }}
								>
									Voltar
								</Button>
							</Col>
							<Col sm={8} style={{ marginTop: 100 }} />
							<Col sm={1}>
								<Button
									href="/confirmation"
									variant="dark"
									size="lg"
									style={{ color: 'white', backgroundColor: '#444903' }}
								>
									Seguinte
								</Button>
							</Col>
							<Col sm={1} />
						</Row>
					</Tab.Container>
				</Container>
			</div>
		);
	}
}

export default Ship;
 */
