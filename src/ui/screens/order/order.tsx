import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { useHistory } from 'react-router';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

interface OrderList {
	_id: {$oid: string},
	country_client: string,
	date: string,
	doc_invoice: string,
	hour: string,
	id_client:string,
	locality_client: string,
	name_client: string,
	postal_code_client: string,
	price: string,
	quantity: string,
	street_client: string,
	tax: string,
	tin_client: string,
	vat: string,
	rate: string,
	products: string,
}

export const Order: React.FC = () => {
	const Spacer = require('react-spacer')

	const history = useHistory();
	
	const [shops, setShops] = useState<OrderList[]>();
	const [id_shop, setId_shop ] = useState('');
	const [country_client, setCountry_client ] = useState('');
	const [date, setDate ] = useState('');
	const [doc_invoice , setDoc_invoice ] = useState('');
	const [hour, setHour ] = useState('');
	const [id_client, setId_client ] = useState('');
	const [locality_client, setLocality_client ] = useState('');
	const [name_client, setName_client ] = useState('');
	const [postal_code_client, setPostal_code_client ] = useState('');
	const [price, setPrice ] = useState('');
	const [quantity, setQuantity ] = useState('');
	const [street_client, setStreet_client ] = useState('');
	const [tax, setTax ] = useState('');
	const [tin_client, setTin_client] = useState('');
	const [vat, setVat] = useState('');
	const [rate, setRate ] = useState('');
	const [products, setProducts ] = useState('');


	const handlegotoinvoice = (shops : OrderList) => {
		setId_shop (shops._id.$oid)
		setCountry_client (shops.country_client)
		setDate (shops.date)
		setDoc_invoice (shops.doc_invoice)
		setHour (shops.hour)
		setId_client (shops.id_client)
		setLocality_client (shops.locality_client)
		setName_client (shops.name_client)
		setPostal_code_client (shops.postal_code_client)
		setPrice (shops.price)
		setQuantity (shops.quantity)
		setStreet_client (shops.street_client)
		setTax (shops.tax)
		setTin_client (shops.tin_client)
		setVat (shops.vat)
		setRate (shops.rate)
		setProducts (shops.products)
		history.push('/invoice');		
	}


	return ( 
	<>
		<div>
			<div>
				<div>
					<Breadcrumb style={{ marginTop: 20, marginLeft: 28, fontFamily: "artifika", color: "#9B3939" }} id="breadcrumb">
						<Col md={2}>
							<NavDropdown.Item href="/client" class="menulateral" eventKey="4.1">
								A minha Conta
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="/order" eventKey="4.3">
								As Minhas Encomendas
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="/favorites" eventKey="4.4">
								Os meus Favoritos
							</NavDropdown.Item>
						</Col>
						<Col md={1}></Col>
						<Col md={9}>
							<h3 style={{ color: '#AAAA74' }}>
								As minhas Encomendas 
								<br />
							</h3>
							<Spacer height='12px'/>
							<div>
								<Table hover responsive="sm">
									<thead>
										<tr>
											<th>Encomenda #</th>
											<th>Data</th>
											<th>Total da encomenda</th>
											<th>Morada</th>
											<th>Ação</th>
											<th></th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{shops?.length === 0 && (
											<tr>
												<td colSpan={9}>Não existem dados para mostrar</td>
											</tr>
										)}
										{shops?.length !== 0 &&
											shops?.map((item) => {
												return (
													<tr>
														<td>{item._id.$oid}</td> 
														<td>{item.date}</td>
														<td>{item.price} €</td>
														<td>{item.street_client}</td>
														<td>
															<a
																href="/invoice"
																style={{
																	color: '#444903',
																	fontWeight: 'bold',
																}}
															>
																Ver Fatura
															</a>
														</td>
													</tr>
												);
											})}
									</tbody>
								</Table>
							</div>
						</Col>

						<br />
					</Breadcrumb>
				</div>
			</div>
		</div>
	</>
   
   )

};	
/* class Order extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			shops: [],
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

		axios.get(`http://127.0.0.1:5000/shop/client/${userId}`, config).then((res) => {
			const shops = res.data;
			this.setState(shops);
		});
	}
	handlegotoinvoice(shops) {
		this.props.history.push('/invoice', {
			id_shop: shops._id.$oid,
			country_client: shops.country_client,
			date: shops.date,
			doc_invoice: shops.doc_invoice,
			hour: shops.hour,
			id_client: shops.id_client,
			locality_client: shops.locality_client,
			name_client: shops.name_client,
			postal_code_client: shops.postal_code_client,
			price: shops.price,
			quantity: shops.quantity,
			street_client: shops.street_client,
			tax: shops.tax,
			tin_client: shops.tin_client,
			vat: shops.vat,
			rate: shops.rate,
			products: shops.products,
		});
	}

	render() {
		const { shops } = this.state;

		return (
			<div>
				<div>
					<div>
						<Breadcrumb style={{ marginTop: 20, marginLeft: 28 }} id="breadcrumb">
							<Col md={2}>
								<NavDropdown.Item href="/client" class="menulateral" eventKey="4.1">
									A minha Conta
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="/order" eventKey="4.3">
									As Minhas Encomendas
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="/favorites" eventKey="4.4">
									Os meus Favoritos
								</NavDropdown.Item>
							</Col>
							<Col md={1}></Col>
							<Col md={9}>
								<h3 style={{ color: '#AAAA74' }}>
									As minhas Encomendas {shops.data}
									<br />
								</h3>
								<h6>Aqui estão todas as Encomendas que já fez.</h6>
								<h7>
									<br />
								</h7>
								<div>
									<Table hover responsive="sm">
										<thead>
											<tr>
												<th>Encomenda #</th>
												<th>Data</th>
												<th>Total da encomenda</th>
												<th>Morada</th>
												<th>Ação</th>
												<th></th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{shops.length === 0 && (
												<tr>
													<td colSpan="9">Não existem dados para mostrar</td>
												</tr>
											)}
											{shops.length !== 0 &&
												shops.map((item) => {
													return (
														<tr>
															<td>{item._id.$oid}</td>
															<td>{item.date}</td>
															<td>{item.price} €</td>
															<td>{item.street_client}</td>
															<td>
																<a
																	href="/invoice"
																	style={{
																		color: '#444903',
																		fontWeight: 'bold',
																	}}
																>
																	Ver Fatura
																</a>
															</td>
														</tr>
													);
												})}
										</tbody>
									</Table>
								</div>
							</Col>

							<br />
						</Breadcrumb>
					</div>
				</div>
			</div>
		);
	}
}
export default Order;
 */