import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Image, Modal, Tab } from 'react-bootstrap';
import { images } from 'assets';
import { CartList } from 'ui';

interface ModalConfirmationProps {
	show: boolean;
	onHide: () => void;
	item?: CartList[];
	price: number;
	handleGoBack: () => void;
}

export const Confirmation: React.FC<ModalConfirmationProps> = ({ show, onHide, handleGoBack, item, price }) => {
	const [totalPrice, setTotalPrice] = useState(4.99);

	useEffect(() => {
		if (price < 49.99) {
			setTotalPrice(price + 4.99);
		} else {
			setTotalPrice(price);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [price]);

	const renderProducts = (item: CartList, index: number) => {
		return (
			<>
				<div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
					<Image src={item.photo_product} width="69" height="69" />
					<p style={{ marginTop: 20, marginLeft: 60, width: 250 }}>
						<i>{item.name_product}</i>
					</p>
					<p style={{ marginTop: 18, marginLeft: 10 }}>
						<span style={{ fontWeight: 'bold' }}>Preço: </span>
						{item.price_product} €
					</p>
				</div>
				<br />
			</>
		);
	};

	return (
		<Modal show={show} onHide={onHide} backdrop="static" keyboard={false} centered={true} size="lg">
			<Modal.Body>
				<div>
					<Row id="row"></Row>
					<div style={{ flexDirection: 'row', display: 'flex', marginLeft: '10px' }}>
						<Image src={images.stepTwo} />
						<h1
							style={{
								marginLeft: '20px',
								fontWeight: 'bold',
								color: '#8A3535',
								fontFamily: 'artifika',
								marginTop: '10px',
							}}
						>
							Confirmar Compra
						</h1>
					</div>
					<div style={{ height: 1, backgroundColor: '#8A3535', marginTop: '20px' }}></div>
					<br />
					<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
						<Row id="row">
							<Col sm={1} />
							<Col sm={10} style={{ marginBottom: 20 }}>
								<div style={{ flexDirection: 'row', display: 'flex' }}>
									<Image src={images.truck} width="85" height="85" />
									<h4
										style={{
											fontWeight: 'bold',
											fontSize: 16,
											fontFamily: 'artifika',
											marginTop: 20,
											marginLeft: 10,
										}}
									>
										Rua Doutor Francisco Dias da Cunha, nº40, 1ºEsquerdo
									</h4>
									<h4
										style={{
											fontWeight: 'bold',
											fontSize: 14,
											fontFamily: 'artifika',
											marginTop: 45,
											marginLeft: -380,
										}}
									>
										4610-282 Felgueiras
									</h4>
								</div>
								<br />
								<br />
								<div style={{ flexDirection: 'row', display: 'flex', marginLeft: 30 }}>
									<Image src={images.shopBag} width="50" height="50" />

									<h4
										style={{
											fontWeight: 'bold',
											fontSize: 18,
											fontFamily: 'artifika',
											marginTop: 10,
											marginLeft: 12,
										}}
									>
										Cesto de Compras
									</h4>
								</div>
								<div style={{ marginLeft: 120, marginTop: 20 }}>
									{item?.map((item, index) => renderProducts(item, index))}
								</div>
								<br />
								<div style={{ textAlign: 'right' }}>
									<h4
										style={{
											fontSize: 22,
											fontWeight: 'bold',
											fontFamily: 'artifika',
											marginTop: 10,
											marginRight: 69,
										}}
									>
										Valor total:
									</h4>
									<h4
										style={{
											fontSize: 20,
											fontFamily: 'artifika',
											marginTop: -32,
										}}
									>
										{totalPrice.toFixed(2)} €
									</h4>
								</div>
							</Col>
							<Col sm={1} />
						</Row>
					</Tab.Container>
					<div style={{ height: 1, backgroundColor: '#8A3535', marginTop: '20px' }}></div>
					<br />
					<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
						<Row id="row">
							<Col sm={1} />
							<Col sm={1}>
								<Button
									onClick={handleGoBack}
									variant="dark"
									size="lg"
									style={{ color: '#9B3939', backgroundColor: 'white', fontFamily: 'artifika' }}
								>
									Voltar
								</Button>
							</Col>
							<Col sm={8} />
							<Col sm={1}>
								<Button
									onClick={onHide}
									variant="dark"
									size="lg"
									style={{ color: 'white', backgroundColor: '#9B3939', fontFamily: 'artifika' }}
								>
									Pagar
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

/* class Confirmation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			products: [],
			client: [],
			isLoading: false,
			totalPrice: 4.99,
		};
	}

	async componentDidMount() {
		console.log('Mounting the screen Cart...');
		try {
			let token = await localStorage.getItem('token');
			let type = await localStorage.getItem('type');
			let userId = await localStorage.getItem('userId');
			if (token !== null) {
				this.setState({
					isLogged: true,
					isLoading: false,
					token,
					type,
					userId,
				});
				console.log(userId);
			}
		} catch (e) {
			console.log('Error rending data: ' + e);
			this.setState({
				isLogged: false,
			});
		}
		const { token, userId } = this.state;
		try {
			let response = await fetch('http://127.0.0.1:5000/cart/client/' + userId, {
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			let json = await response.json();
			const products = json.products;
			let Price = 4.99;

			products.forEach((item, index) => {
				Price += products[index].quantity_product * products[index].price_product;
			});
			this.setState({ totalPrice: Price });
			console.log(products);
			this.setState({
				data: json,
				isLoading: true,
				products,
			});
		} catch (e) {
			console.log('Error to get cart: ' + e);
			this.setState({
				empty: true,
				isLoading: true,
			});
		}
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

	createshop = () => {
		const { client, products, userId, totalPrice } = this.state;

		axios
			.post(`http://127.0.0.1:5000/shop`, {
				country_client: '',
				date: moment().format('YYYY/MM/DD HH:mm:ss'),
				doc_invoice: '',
				hour: moment().format('YYYY/MM/DD HH:mm:ss'),
				id_client: userId,
				id_producer: '',
				locality_client: client.locality,
				name_client: client.name,
				postal_code_client: client.postal_code,
				price: totalPrice,
				quantity: '',
				street_client: client.street,
				tax: 23,
				tin_client: client.tin,
				vat: '',
				rate: '',
				products: products,
			})
			.then(this.props.history.push('/payment'));
	};

	render() {
		const { products, client, totalPrice } = this.state;

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
										<h3
											style={{
												fontSize: 24,
												fontWeight: 'bold',
												color: 'black',
												textDecoration: 'underline',
											}}
										>
											Confirmação
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
							<h4 style={{ fontSize: 30, color: '#000000', fontWeight: 'Bold' }}>Confirmação </h4>
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
									marginTop: 50,
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
												src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGO2wiPfU15-zOiYMeoKZwYhtpAU4mxDscILYdNxCJl8pRdcxaaVLnFsV-H3p7Av2ruMk&usqp=CAU"
												width="45"
												height="45"
											/>
										</td>
										<th>
											{' '}
											<h4 style={{ fontWeight: 'bold', fontSize: 20 }}>
												Verifica e confirma a tua encomenda{' '}
											</h4>
										</th>
										<td></td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td align="right">
											{' '}
											<Image
												src="https://i.pinimg.com/originals/09/8f/6c/098f6c69aaeda7d34e245cc9ed942e8e.png"
												width="45"
												height="45"
											/>
										</td>
										<td>
											{client.street} - {client.locality}
										</td>
										<td>4,99€</td>
									</tr>
									<tr>
										<td align="center">
											{' '}
											<Image
												src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLFZSCb7TuZPnO_zBvAfQ3K4VW2S1P9MZ0gKYTvRM4EsAEseKUtpaqdJrhw7UdUJpscCU&usqp=CAU"
												width="45"
												height="45"
											/>
										</td>
										<td>
											<h4 style={{ fontSize: 18, fontWeight: 'bold' }}>Artigos Comprados</h4>
										</td>
										<td></td>
									</tr>

									{products.map((item) => {
										return (
											<tr>
												<td align="right">
													{' '}
													<Image src={item.photo_product} width="60" height="65" />
												</td>
												<td>{item.name_product}</td>
												<td>{item.price_product}€</td>
											</tr>
										);
									})}

									<tr>
										<th aligntext="right">
											{' '}
											<h4 style={{ fontSize: 22, fontWeight: 'bold' }}>TOTAL</h4>
										</th>
										<td></td>
										<th>
											{' '}
											<h4 style={{ fontSize: 22, fontWeight: 'bold' }}>{totalPrice}€ </h4>
										</th>
									</tr>
								</tbody>
							</Table>
						</Col>
						<Col sm={1} />
					</Row>
				</Tab.Container>
				<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
					<Row id="row" style={{ marginBottom: 80 }}>
						<Col sm={1} />
						<Col sm={1}>
							<Button
								href="/ship"
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
								onClick={() => this.createshop()}
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
			</div>
		);
	}
}
export default Confirmation;
 */
