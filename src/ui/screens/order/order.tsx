import React from 'react';
import { Breadcrumb, Card, Row, Image, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';

export const Orders: React.FC = () => {
	const history = useHistory();
	const orderList = useSelector((state: StoreState) => state.orders.orders);

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
					<Col sm={2} />
					<Col
						sm={8}
						style={{
							color: '#9B3939',
							fontFamily: 'artifika',
						}}
					>
						<h1>Histórico de Encomendas</h1>
					</Col>
					<Col sm={2} />
				</Row>
				<br />
				<Row id="row" style={{ marginTop: 25 }}>
					<Col sm={2} />
					<Col sm={8}>
						{orderList?.length !== 0 &&
							orderList?.map((item, index) => {
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
