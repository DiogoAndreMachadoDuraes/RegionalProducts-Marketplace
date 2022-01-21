import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Image, Breadcrumb } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Order, Product, StoreState } from 'store';

export const ProducerOrder: React.FC = () => {
	const history = useHistory();
	const producerId = useSelector((state: StoreState) => state.common.user.id);
	const products = useSelector((state: StoreState) => state.products.products);
	const token = useSelector((state: StoreState) => state.common.user.token);

	const [order, setOrder] = useState<Order[]>();

	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	useEffect(() => {
		axios.get(`http://127.0.0.1:5000/shoplist`, config).then((res) => {
			const order = res.data;
			const productProducer = products
				.filter((x: Product) => x.id_producer === producerId)
				.map((x: Product) => x);
			productProducer.forEach((product: Product) => {
				const orderProducer = order
					.filter((x: Order) => x.id_product === product._id.$oid)
					.map((x: Order) => x);
				console.log(orderProducer);
				setOrder(orderProducer);
			});
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div>
				<Breadcrumb style={{ marginTop: 20, marginLeft: 38 }} id="breadcrumb">
					<Breadcrumb.Item onClick={() => history.push('/dashboardProducer')}>
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
					<Col sm={2} />
					<Col
						sm={8}
						style={{
							color: '#9B3939',
							fontFamily: 'artifika',
						}}
					>
						<h1>Histórico de encomendas do produtor</h1>
					</Col>
					<Col sm={2} />
				</Row>
				<br />
				<Row id="row" style={{ marginTop: 25 }}>
					<Col sm={2} />
					<Col sm={8}>
						{order?.length !== 0 &&
							order?.map((item, index) => {
								return (
									<>
										<Card
											border="dark"
											style={{ width: 800, marginLeft: 81, padding: 10 }}
											key={index}
										>
											<div className="row gutters">
												<div className="col-md-4">
													<Image
														src={item.photo_product}
														thumbnail
														style={{ marginLeft: 20, width: 140, height: 140 }}
													/>
												</div>
												<div className="col-md-8">
													<Row style={{ marginTop: 15 }}>
														<Col sm={7}>
															<h4
																style={{
																	color: 'black',
																	fontFamily: 'artifika',
																}}
															>
																Nº {item._id.$oid}
															</h4>
															<h6
																style={{
																	color: 'black',
																	fontFamily: 'artifika',
																	marginTop: 30,
																}}
															>
																Estado: Entregue
															</h6>
															<h6
																style={{
																	color: 'black',
																	fontFamily: 'artifika',
																	marginTop: 10,
																}}
															>
																Data: {item.date}
															</h6>
														</Col>
														<Col sm={4} style={{ textAlign: 'right', marginTop: 8 }}>
															<Link
																to={'/invoice/' + item._id.$oid}
																style={{ fontFamily: 'artifika' }}
															>
																Ver informações
															</Link>
															<h6
																style={{
																	color: 'black',
																	fontFamily: 'artifika',
																	marginLeft: 45,
																	marginTop: 20,
																}}
															>
																1 artigo
															</h6>
															<h6
																style={{
																	color: 'black',
																	fontFamily: 'artifika',
																	marginTop: 10,
																}}
															>
																€ {item.price_final}
															</h6>
														</Col>
														<Col sm={1} />
													</Row>
												</div>
											</div>
										</Card>
										<br />
									</>
								);
							})}
					</Col>
					<Col sm={2} />
				</Row>
				<br />
				<br />
				<br />
			</div>
		</>
	);
};

/* class ProducerOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			producer: [],
		};
	} */

/* async componentDidMount() {
		console.log('Mounting screen Producer Order...');
		let token = */
/* 			'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyMzY5MDM4MiwianRpIjoiMTdlMDM5NjAtNjNlZS00ODNjLTgyOTEtZjczZTQwN2RlMjhmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjYwYWU4ODkxMzBkZDA4ZTFhMWQyODQ4YSIsIm5iZiI6MTYyMzY5MDM4MiwiZXhwIjoxNjI0MTIyMzgyfQ.d-1g1y8-d8i686vxFIoiNZkC3iuvcvZ-ifuQnW_ASKE';
 */ /* let token= localStorage.getItem("token"); */
/* try {
			let response = await fetch('http://127.0.0.1:5000/producers', {
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			let json = await response.json();
			this.setState({
				producer: json,
			});
			console.log(json);
		} catch (e) {
			console.log('Error to get data: ' + e);
		}
	} */

/* render() { */
/*   const { order} = this.state; */
/* return (
			<div>
				<Row id="row">
					<Col sm={2} />
					<Col sm={7} style={{ color: '444903', fontFamily: 'artifika' }}>
						<AiOutlineDropbox size="40" style={{ color: 'black', marginLeft: 20, marginTop: 50 }} />
					</Col>
					<Col sm={3} />
				</Row>
				<Row id="row">
					<Col sm={1} />
					<Col
						sm={8}
						style={{
							color: '#AAAA74',
							fontFamily: 'artifika',
							marginTop: -35,
							marginLeft: 40,
						}}
					>
						<h3> Histórico de encomendas do produtor </h3>
					</Col>
					<Col sm={3} />
				</Row>
				<Row id="row" style={{ marginTop: 40, marginLeft: 60 }}>
					<Col sm={2} />
					<Col sm={7}>
						<Card border="dark">
							<div className="row gutters">
								<div className="col-md-4">
									<Col>
										<Image
											src={images.gallo}
											thumbnail
											style={{ marginTop: 10, width: 130, height: 120 }}
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
											Nº 123{' '}
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
													<a
														style={{ color: '#444903', fontFamily: 'artifika' }}
														href="/invoice"
													>
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
													4 artigos{' '}
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
													€ 123.75{' '}
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
											Entregue{' '}
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
											{' '}
											<medium className="text"> 10/03/2021 </medium>{' '}
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
											src={images.compota}
											thumbnail
											style={{ marginTop: 10, width: 130, height: 120 }}
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
													<a
														style={{ color: '#444903', fontFamily: 'artifika' }}
														href="/invoice"
													>
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
											{' '}
											<medium className="text"> 03/03/2021 </medium>{' '}
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
											src={images.mateus}
											thumbnail
											style={{ marginTop: 10, width: 130, height: 120 }}
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
													<a
														style={{ color: '#444903', fontFamily: 'artifika' }}
														href="/invoice"
													>
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
											{' '}
											<medium className="text"> 18/03/2021 </medium>
										</p>
									</div>
								</div>
							</div>
						</Card>
					</Col>
					<Col sm={3} />
				</Row>
				<div className="mt-5"> </div> */
{
	/* <Table  size="20" style={{color:"black", fontFamily:'artifika', alignItems:"center", justifyContent:"center", textAlign:"center" }}>
                    <thead style={{ width:10 }}>
                        <tr>
                            <th>Nome</th>
                            <th>Rua</th>
                            <th>Código-postal</th>
                            <th>País</th>
                            <th>Região</th>
                            <th>Telefone</th>
                            <th>Rede social</th>
                            <th>Logótipo</th>
                            <th>E-mail</th>
                            <th>Estado</th>
                            <th></th>    
                        </tr>
                    </thead>
                </Table> */
}
/* </div>
		);
	}
}
export default ProducerOrder; */
