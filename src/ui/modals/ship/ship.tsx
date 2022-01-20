import React from 'react';
import { Tab, Col, Container, Row, Button, Image, Modal } from 'react-bootstrap';
import { images } from 'assets';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';

interface ModalShipProps {
	show: boolean;
	onHide: () => void;
	handleContinue: () => void;
}

export const Ship: React.FC<ModalShipProps> = ({ show, onHide, handleContinue }) => {
	const telephone = useSelector((state: StoreState) => state.common.client.telephone);
	const address = useSelector((state: StoreState) => state.common.client.address);
	const postal_code = useSelector((state: StoreState) => state.common.client.postal_code);
	const location = useSelector((state: StoreState) => state.common.client.location);
	const country = useSelector((state: StoreState) => state.common.client.country);

	const handleClick = () => {
		onHide();
	};

	return (
		<Modal show={show} onHide={onHide} backdrop="static" keyboard={false} centered={true} size="lg">
			<Modal.Body>
				<div>
					<Row id="row"></Row>
					<div style={{ flexDirection: 'row', display: 'flex', marginTop: '20px', marginLeft: '10px' }}>
						<Image src={images.stepOne} />
						<h1
							style={{
								marginLeft: '20px',
								fontWeight: 'bold',
								color: '#8A3535',
								fontFamily: 'artifika',
								marginTop: '10px',
							}}
						>
							Método de envio
						</h1>
					</div>
					<div style={{ height: 1, backgroundColor: '#8A3535', marginTop: '20px' }}></div>
					<br />
					<br />

					<Container>
						<Row style={{ marginLeft: 20 }}>
							<Col sm={4}>
								<br />
								<Image
									src="https://4.bp.blogspot.com/-n4IEPwlCD2Y/XN2fukZ1DOI/AAAAAAAACk0/X5qGV-6rgxgvUbH34RKOMdO8O-l9yEI5gCLcBGAs/s1600/og-image.jpg"
									width="180"
									height="80"
									thumbnail
								/>
								<h6
									style={{
										marginTop: 20,
										marginLeft: 15,
										fontFamily: 'artifika',
									}}
								>
									<span
										style={{
											fontWeight: 'bold',
										}}
									>
										Custo de envio:{' '}
									</span>{' '}
									4,99 €
								</h6>
							</Col>
							<Col sm={8}>
								<Row style={{ marginLeft: 50 }}>
									<h6
										style={{
											textAlign: 'left',
											alignItems: 'center',
											fontFamily: 'artifika',
											marginTop: 15,
										}}
									>
										Entrega até 5 dias úteis na morada indicada.
									</h6>
									<h6
										style={{
											textAlign: 'left',
											alignItems: 'center',
											fontFamily: 'artifika',
											marginTop: 15,
										}}
									>
										Para garantirmos a entrega verifica os teus dados:
									</h6>
									<div style={{ marginLeft: 30 }}>
										<h6
											style={{
												textAlign: 'left',
												fontFamily: 'artifika',
												marginTop: 25,
												fontSize: '14px',
											}}
										>
											<span
												style={{
													fontWeight: 'bold',
												}}
											>
												Morada:{' '}
											</span>{' '}
											{address}
										</h6>
										<h6
											style={{
												textAlign: 'left',
												fontFamily: 'artifika',
												fontSize: '14px',
											}}
										>
											<span
												style={{
													fontWeight: 'bold',
												}}
											>
												Código Postal:{' '}
											</span>{' '}
											{postal_code}, {location} - {country}
										</h6>
										<h6
											style={{
												textAlign: 'left',
												fontFamily: 'artifika',
												fontSize: '14px',
											}}
										>
											<span
												style={{
													fontWeight: 'bold',
												}}
											>
												Telemóvel:{' '}
											</span>{' '}
											{telephone}
										</h6>
									</div>
								</Row>
							</Col>
						</Row>
						<br />
					</Container>
					<div style={{ height: 1, backgroundColor: '#8A3535', marginTop: '20px' }}></div>
					<br />
					<br />

					<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
						<Row id="row">
							<Col sm={1} />
							<Col sm={1}>
								<Button
									onClick={handleClick}
									variant="dark"
									size="lg"
									style={{ color: '#9B3939', backgroundColor: 'white', fontFamily: 'artifika' }}
								>
									Cancelar
								</Button>
							</Col>
							<Col sm={8} style={{ marginTop: 60 }} />
							<Col sm={1}>
								<Button
									onClick={handleContinue}
									variant="dark"
									size="lg"
									style={{ color: 'white', backgroundColor: '#9B3939', fontFamily: 'artifika' }}
								>
									Continuar
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
