import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Image, Breadcrumb, Modal, Button, Container, Form, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Order, Product, StoreState } from 'store';

export const ProducerOrder: React.FC = () => {
	const history = useHistory();
	const producerId = useSelector((state: StoreState) => state.common.user.id);
	const products = useSelector((state: StoreState) => state.products.products);
	const token = useSelector((state: StoreState) => state.common.user.token);
	const [item, setItem] = useState<Order>();
	const [order, setOrder] = useState<Order[]>();
	const [status, setStatus] = useState('Entregue');
	const [showModalInfo, setShowModalInfo] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

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

	const handleCloseModal = () => {
		setShowModalInfo(false);
	};

	const handleShowModal = (item: Order) => {
		setShowModalInfo(true);
		setItem(item);
	};

	const handleEditStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStatus(e.target.value);
	};

	const showAlertStatus = () => {
		window.setTimeout(() => {
			setShowAlert(false);
		}, 5000);
	};

	const handleEditOrder = (item: Order) => {
		/* axios.put('http://127.0.0.1:5000/shop/' + item?._id.$oid, {
			headers: { Authorization: `Bearer ${token}` },
			param: {
				...item,
				status: status,
			},
		}); */
		handleCloseModal();
		setShowAlert(true);
		showAlertStatus();
	};

	const modalInfo = () => {
		return (
			item && (
				<Modal size="lg" show={showModalInfo} onHide={handleCloseModal} animation={false}>
					<Modal.Header closeButton>
						<Modal.Title>Fatura nº {item?._id.$oid}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Container style={{ marginLeft: 30, marginTop: 15, marginBottom: 25 }}>
							<Row>
								<Col />
								<Col style={{ marginLeft: -5, marginBottom: 30 }}>
									<Image src={item?.photo_product} width={180} height={180} />
								</Col>
								<Col />
							</Row>
							<Row>
								<Col>
									<p>
										<span style={{ fontWeight: 600 }}>Data: </span>
										{item?.date} {item?.hour}
									</p>
								</Col>
								<Col>
									{item?.avaliation === '' ? (
										<p>
											<span style={{ fontWeight: 600 }}>Avaliação: </span>Não avaliado
										</p>
									) : (
										<p>
											<span style={{ fontWeight: 600 }}>Avaliação: </span>
											{item?.avaliation} Estrelas
										</p>
									)}
								</Col>
							</Row>
							<Row>
								<Col>
									<p>
										<span style={{ fontWeight: 600 }}>Nif: </span>
										{item?.tin_client}
									</p>
									<p>
										<span style={{ fontWeight: 600 }}>Email: </span>
										{item?.email_client}
									</p>
								</Col>
								<Col>
									<p>
										<span style={{ fontWeight: 600 }}>Morada: </span>
										{item?.address_client}
									</p>
									<p>
										<span style={{ fontWeight: 600 }}>Código Postal: </span>
										{item?.postal_code} - {item?.location_client}, {item?.country_client}
									</p>
								</Col>
							</Row>
							<Row>
								<Col>
									<p>
										<span style={{ fontWeight: 600 }}>Quantidade: </span>
										{item?.quantity_final}
									</p>
								</Col>
								<Col>
									<p>
										<span style={{ fontWeight: 600 }}>Preço: </span>
										{item?.price_final}€
									</p>
								</Col>
							</Row>
							<Row style={{ marginTop: 20 }}>
								<Col sm={3} />
								<Col sm={6} style={{ marginLeft: -30 }}>
									<Form.Label style={{ fontFamily: 'artifika' }}>Estado</Form.Label>
									<Form.Control
										title="Estado"
										as="select"
										required
										value={status}
										onChange={handleEditStatus}
									>
										<option value="Em processamento">Em processamento</option>
										<option value="A caminho">A caminho</option>
										<option value="Entregue">Entregue</option>
									</Form.Control>
								</Col>
								<Col sm={3} />
							</Row>
						</Container>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseModal}>
							Fechar
						</Button>
						<Button variant="primary" onClick={() => handleEditOrder(item)}>
							Guardar
						</Button>
					</Modal.Footer>
				</Modal>
			)
		);
	};

	return (
		<>
			<Alert key={'success'} variant={'success'} show={showAlert} style={{ textAlign: 'center' }}>
				O estado da encomenda foi alterado com sucesso!
			</Alert>
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
							order?.map((item: Order, index) => {
								return (
									<>
										<Card
											border="dark"
											style={{ width: 800, marginLeft: 106, padding: 10 }}
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
															<h5
																style={{
																	color: 'black',
																	fontFamily: 'artifika',
																}}
															>
																Nº {item._id.$oid}
															</h5>
															<h6
																style={{
																	color: 'black',
																	fontFamily: 'artifika',
																	marginTop: 30,
																}}
															>
																Estado: {status}
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
														<Col sm={4} style={{ textAlign: 'right', marginTop: -7 }}>
															<Button
																variant="link"
																style={{
																	fontFamily: 'artifika',
																	backgroundColor: 'transparent',
																	color: '#9B3939',
																}}
																onClick={() => handleShowModal(item)}
															>
																Ver informações
															</Button>
															{showModalInfo && modalInfo()}
															<div
																style={{
																	marginRight: 10,
																}}
															>
																<h6
																	style={{
																		color: 'black',
																		fontFamily: 'artifika',
																		marginLeft: 45,
																		marginTop: 23,
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
															</div>
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
