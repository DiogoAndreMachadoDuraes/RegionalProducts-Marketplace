import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router';
import { Breadcrumb, Card, Navbar, Row } from 'react-bootstrap';
import { images } from 'assets';
import Image from 'react-bootstrap/Image';

interface OrderList {
	_id: { $oid: string };
	country_client: string;
	date: string;
	doc_invoice: string;
	hour: string;
	id_client: string;
	locality_client: string;
	name_client: string;
	postal_code_client: string;
	price: string;
	quantity: string;
	street_client: string;
	tax: string;
	tin_client: string;
	vat: string;
	rate: string;
	products: string;
}

export const Order: React.FC = () => {
	const history = useHistory();

	const [shops, setShops] = useState<OrderList[]>();
	const [id_shop, setId_shop] = useState('');
	const [country_client, setCountry_client] = useState('');
	const [date, setDate] = useState('');
	const [doc_invoice, setDoc_invoice] = useState('');
	const [hour, setHour] = useState('');
	const [id_client, setId_client] = useState('');
	const [locality_client, setLocality_client] = useState('');
	const [name_client, setName_client] = useState('');
	const [postal_code_client, setPostal_code_client] = useState('');
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState('');
	const [street_client, setStreet_client] = useState('');
	const [tax, setTax] = useState('');
	const [tin_client, setTin_client] = useState('');
	const [vat, setVat] = useState('');
	const [rate, setRate] = useState('');
	const [products, setProducts] = useState('');

	const handlegotoinvoice = (shops: OrderList) => {
		setId_shop(shops._id.$oid);
		setCountry_client(shops.country_client);
		setDate(shops.date);
		setDoc_invoice(shops.doc_invoice);
		setHour(shops.hour);
		setId_client(shops.id_client);
		setLocality_client(shops.locality_client);
		setName_client(shops.name_client);
		setPostal_code_client(shops.postal_code_client);
		setPrice(shops.price);
		setQuantity(shops.quantity);
		setStreet_client(shops.street_client);
		setTax(shops.tax);
		setTin_client(shops.tin_client);
		setVat(shops.vat);
		setRate(shops.rate);
		setProducts(shops.products);
		history.push('/invoice');
	};

	return (
		<>
			<div>
				<Breadcrumb style={{ marginTop: 20, marginLeft: 38 }} id="breadcrumb">
					<Breadcrumb.Item onClick={() => history.push('/')}>
						<span style={{ fontFamily: 'artifika', color: '#9B3939' }}>Home</span>
					</Breadcrumb.Item>
					<Breadcrumb.Item active>
						<span style={{ fontFamily: 'artifika', color: 'black' }}>Encomendas</span>
					</Breadcrumb.Item>
				</Breadcrumb>
			</div>
			<br />
			<div>
				<Row id="row">
					<Col sm={1} />
					<Col
						sm={8}
						style={{
							color: '#9B3939',
							fontFamily: 'artifika',
							marginLeft: 40,
						}}
					>
						<h3> As Minhas Encomendas </h3>
					</Col>
					<Col sm={3} />
				</Row>
				<br />
				<Row id="row" style={{ marginTop: 40, marginLeft: 60 }}>
					<Col sm={2} />
					<Col sm={7}>
						<Card border="dark">
							<div className="row gutters">
								<div className="col-md-4">
									<Col>
										<Image
											src={images.amendoim}
											thumbnail
											style={{ marginTop: 5, marginLeft: 20, width: 100, height: 100 }}
										/>
									</Col>
								</div>
								<div className="col-md-8">
									<div className="card-body">
										<h4
											className="card-title"
											style={{
												color: 'black',
												fontFamily: 'artifika',
												marginLeft: -60,
												marginTop: 0,
											}}
										>
											Nº 123
										</h4>
										<Row
											id="row"
											style={{
												color: 'black',
												fontFamily: 'artifika',
												marginLeft: 250,
												marginTop: -50,
											}}
										>
											<Col sm={2} />
											<Col sm={9}>
												<Navbar.Text>
													<a style={{ fontFamily: 'artifika' }} href="/invoice">
														Ver informações
													</a>
												</Navbar.Text>
												<h6
													className="card-text"
													style={{
														color: 'black',
														fontFamily: 'artifika',
														marginLeft: 45,
														marginTop: 0,
													}}
												>
													6 artigos{' '}
												</h6>
												<h6
													className="card-text"
													style={{
														color: 'black',
														fontFamily: 'artifika',
														marginLeft: 45,
														marginTop: 10,
													}}
												>
													€ 4.39
												</h6>
											</Col>
											<Col sm={1} />
										</Row>
										<h5
											className="card-text"
											style={{
												color: 'black',
												fontFamily: 'artifika',
												marginLeft: -60,
												marginTop: -40,
											}}
										>
											{' '}
											Entregue
										</h5>
										<p
											className="card-text"
											style={{
												color: 'black',
												fontFamily: 'artifika',
												marginLeft: -60,
												marginTop: 0,
											}}
										>
											{/* <medium className="text"> 03/03/2021 </medium> */}
										</p>
									</div>
								</div>
							</div>
						</Card>
						<div className="mt-5"> </div>
						<Card border="dark">
							<div className="row gutters">
								<div className="col-md-4">
									<Col>
										<Image
											src={images.cheese}
											thumbnail
											style={{ marginTop: 5, marginLeft: 20, width: 100, height: 100 }}
										/>
									</Col>
								</div>
								<div className="col-md-8">
									<div className="card-body">
										<h4
											className="card-title"
											style={{
												color: 'black',
												fontFamily: 'artifika',
												marginLeft: -60,
												marginTop: 0,
											}}
										>
											Nº 124{' '}
										</h4>
										<Row
											id="row"
											style={{
												color: 'black',
												fontFamily: 'artifika',
												marginLeft: 250,
												marginTop: -50,
											}}
										>
											<Col sm={2} />
											<Col sm={9}>
												<Navbar.Text>
													<a style={{ fontFamily: 'artifika' }} href="/invoice">
														Ver informações
													</a>
												</Navbar.Text>
												<h6
													className="card-text"
													style={{
														color: 'black',
														fontFamily: 'artifika',
														marginLeft: 45,
														marginTop: 0,
													}}
												>
													6 artigos{' '}
												</h6>
												<h6
													className="card-text"
													style={{
														color: 'black',
														fontFamily: 'artifika',
														marginLeft: 45,
														marginTop: 10,
													}}
												>
													€ 43.99{' '}
												</h6>
											</Col>
											<Col sm={1} />
										</Row>
										<h5
											className="card-text"
											style={{
												color: 'black',
												fontFamily: 'artifika',
												marginLeft: -60,
												marginTop: -40,
											}}
										>
											{' '}
											Entregue
										</h5>
										<p
											className="card-text"
											style={{
												color: 'black',
												fontFamily: 'artifika',
												marginLeft: -60,
												marginTop: 0,
											}}
										>
											{/* <medium className="text"> 03/03/2021 </medium> */}
										</p>
									</div>
								</div>
							</div>
						</Card>
						<div className="mt-5"> </div>
						<Card border="dark">
							<div className="row gutters">
								<div className="col-md-4">
									<Col>
										<Image
											src={images.frutos}
											thumbnail
											style={{ marginTop: 5, marginLeft: 20, width: 100, height: 100 }}
										/>
									</Col>
								</div>
								<div className="col-md-8">
									<div className="card-body">
										<h4
											className="card-title"
											style={{
												color: 'black',
												fontFamily: 'artifika',
												marginLeft: -60,
												marginTop: 0,
											}}
										>
											Nº 125{' '}
										</h4>
										<Row
											id="row"
											style={{
												color: 'black',
												fontFamily: 'artifika',
												marginLeft: 250,
												marginTop: -50,
											}}
										>
											<Col sm={2} />
											<Col sm={9}>
												<Navbar.Text>
													<a style={{ fontFamily: 'artifika' }} href="/invoice">
														Ver informações
													</a>
												</Navbar.Text>
												<h6
													className="card-text"
													style={{
														color: 'black',
														fontFamily: 'artifika',
														marginLeft: 45,
														marginTop: 0,
													}}
												>
													2 artigos{' '}
												</h6>
												<h6
													className="card-text"
													style={{
														color: 'black',
														fontFamily: 'artifika',
														marginLeft: 45,
														marginTop: 10,
													}}
												>
													€ 20.80{' '}
												</h6>
											</Col>
											<Col sm={1} />
										</Row>
										<h5
											className="card-text"
											style={{
												color: 'black',
												fontFamily: 'artifika',
												marginLeft: -60,
												marginTop: -40,
											}}
										>
											{' '}
											Entregue
										</h5>
										<p
											className="card-text"
											style={{
												color: 'black',
												fontFamily: 'artifika',
												marginLeft: -60,
												marginTop: 0,
											}}
										>
											{/* <medium className="text"> 18/03/2021 </medium> */}
										</p>
									</div>
								</div>
							</div>
						</Card>
					</Col>
					<Col sm={3} />
				</Row>
				<div className="mt-5"> </div>
			</div>
		</>
	);
};

{
	/* {shops?.length !== 0 &&
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
	})} */
}
