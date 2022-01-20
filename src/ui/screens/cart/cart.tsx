import React, { useEffect, useState } from 'react';
import { Image, Tab, Row, Col, Button, Table, Modal, Alert } from 'react-bootstrap';
import { AiOutlineShoppingCart, AiFillDelete, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';
import { Confirmation, Loader, Payment, Ship, Thanks } from 'ui';

export interface CartList {
	_id: { $oid: string };
	id_client: string;
	email_client: string;
	id_product: string;
	name_product: string;
	photo_product: string;
	price_product: number;
	quantity: number;
}

export const Cart: React.FC = () => {
	const userId = useSelector((state: StoreState) => state.common.user.id);
	const token = useSelector((state: StoreState) => state.common.user.token);
	const clientEmail = useSelector((state: StoreState) => state.common.client.email);

	const [isLoading, setIsLoading] = useState(false);
	const [cart, setCart] = useState<CartList[]>();
	const [showModalDelete, setShowModalDelete] = useState(false);
	const [price, setPrice] = useState(0);
	const [empty, setEmpty] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);
	const [showEmptyCart, setShowEmptyCart] = useState(false);
	const [showDeleteProduct, setShowDeleteProduct] = useState(false);
	const [showModalShip, setShowModalShip] = useState(false);

	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	useEffect(() => {
		const fetchApi = async () => {
			try {
				await axios.get(`http://127.0.0.1:5000/cart/client/` + userId, config).then((res) => {
					const json = res.data;
					var sum = 0;
					for (var i = 0; i < json.length; i++) {
						let total = json[i].quantity * json[i].price_product;
						sum += total;
					}
					setPrice(parseFloat(sum.toFixed(2)));
					setCart(json);
					setIsLoading(false);
				});
			} catch (e) {
				console.log('Error to get cart: ' + e);
				setEmpty(true);
				setIsLoading(false);
			}
		};
		fetchApi();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refreshKey]);

	const onAdd = (item: CartList, index: number) => {
		if (cart !== undefined) {
			cart[index].quantity = cart[index].quantity + 1;
			setCart(cart);
			handleEdit(item);
		}
	};

	const onSub = (item: CartList, index: any) => {
		if (cart !== undefined && cart[index].quantity > 1) {
			cart[index].quantity -= 1;
			setCart(cart);
			handleEdit(item);
		}
		if (cart !== undefined && cart[index].quantity === 1) {
			handleDeleteOne(item);
		}
		if (cart !== undefined && cart[index].quantity === 0) {
			setEmpty(true);
		}
	};

	const handleCloseDelete = () => {
		setShowModalDelete(false);
	};

	const handleShowDelete = () => {
		setShowModalDelete(true);
	};

	const modalDelete = () => {
		return (
			<Modal show={showModalDelete} onHide={handleCloseDelete} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Esvaziar Carrinho</Modal.Title>
				</Modal.Header>
				<Modal.Body>Tem a certeza que pretende esvaziar o carrinho?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseDelete}>
						Fechar
					</Button>
					<Button variant="primary" onClick={handleDelete}>
						Eliminar
					</Button>
				</Modal.Footer>
			</Modal>
		);
	};

	const handleEdit = async (item: CartList) => {
		try {
			await fetch('http://127.0.0.1:5000/carts/' + item._id.$oid, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email_client: clientEmail,
					id_client: userId,
					id_product: item.id_product,
					name_product: item.name_product,
					photo_product: item.photo_product,
					price_product: item.price_product,
					quantity: item.quantity,
				}),
			});
		} catch (e) {
			console.log('Error to edit cart: ' + e);
		}
		setRefreshKey(refreshKey + 1);
	};

	const showAlertDeleteOne = () => {
		window.setTimeout(() => {
			setShowDeleteProduct(false);
		}, 5000);
	};

	const showAlertEmptyCard = () => {
		window.setTimeout(() => {
			setShowEmptyCart(false);
		}, 5000);
	};

	const handleDeleteOne = async (item: CartList) => {
		try {
			await axios.delete(`http://127.0.0.1:5000/carts/` + item._id.$oid, config);
			setShowDeleteProduct(true);
			showAlertDeleteOne();
		} catch (e) {
			console.log('Error to delete product in cart: ' + e);
		}
		setRefreshKey(refreshKey + 1);
	};

	const handleDelete = async () => {
		try {
			await axios.delete(`http://127.0.0.1:5000/cart/client/` + userId, config);
			handleCloseDelete();
			setShowEmptyCart(true);
			showAlertEmptyCard();
		} catch (e) {
			console.log('Error to delete cart: ' + e);
		}
		setPrice(0);
		setRefreshKey(refreshKey + 1);
	};

	const [showModalConfirmation, setShowModalConfirmation] = useState(false);
	const [showModalPayment, setShowModalPayment] = useState(false);
	const [showModalThanks, setShowModalThanks] = useState(false);

	const handleClick = () => {
		setShowModalShip(true);
	};

	const hideModalShip = () => {
		setShowModalShip(false);
	};

	const handleGoConfirmation = () => {
		setShowModalShip(false);
		setShowModalConfirmation(true);
	};

	const onHideConfirmation = () => {
		setShowModalConfirmation(false);
		setShowModalPayment(true);
	};

	const handleGoShip = () => {
		setShowModalConfirmation(false);
		setShowModalShip(true);
	};

	const onHidePayment = () => {
		setShowModalPayment(false);
		setShowModalConfirmation(true);
	};

	const handleConclude = () => {
		setShowModalPayment(false);
		setShowModalThanks(true);
	};

	const onHideThanks = () => {
		setShowModalThanks(false);
		setPrice(0);
		setRefreshKey(refreshKey + 1);
	};

	return isLoading ? (
		<Loader />
	) : (
		<>
			<Alert key={'success'} variant={'success'} show={showEmptyCart} style={{ textAlign: 'center' }}>
				O carrinho foi esvaziado com sucesso!
			</Alert>
			<Alert key={'info'} variant={'info'} show={showDeleteProduct} style={{ textAlign: 'center' }}>
				O produto foi removido do carrinho!
			</Alert>
			<Ship show={showModalShip} onHide={hideModalShip} handleContinue={handleGoConfirmation} />
			<Confirmation
				show={showModalConfirmation}
				onHide={onHideConfirmation}
				handleGoBack={handleGoShip}
				item={cart}
				price={price}
			/>
			<Payment show={showModalPayment} onHide={onHidePayment} handleContinue={handleConclude} />
			<Thanks show={showModalThanks} onHide={onHideThanks} item={cart} price={price} />
			<div style={{ marginTop: 20 }}>
				<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
					<Row id="row">
						<Col sm={1} />
						<Col sm={5} style={{ marginTop: 35 }}>
							<Row id="row">
								<Col sm={1}>
									<AiOutlineShoppingCart size="40" color="#9B3939" />
								</Col>
								<Col sm={9}>
									<h4
										style={{
											color: '#9B3939',
											fontFamily: 'artifika',
											marginLeft: 15,
											marginTop: 3,
										}}
									>
										Carrinho de compras
									</h4>
								</Col>
								<Col sm={2} />
							</Row>
						</Col>
						<Col sm={3} />
						<Col sm={3} style={{ marginTop: 35 }}>
							<Row id="row">
								<Col sm={2}>
									<AiFillDelete size="30" color="#9B3939" />
								</Col>
								<Col sm={10}>
									<Button
										variant="outline-light"
										disabled={empty}
										onClick={handleShowDelete}
										style={{
											backgroundColor: 'white',
											color: '#9B3939',
											fontSize: 17,
											fontFamily: 'artifika',
										}}
									>
										Esvaziar carrinho
									</Button>
									{showModalDelete && modalDelete()}
								</Col>
							</Row>
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
									marginTop: 30,
									alignItems: 'center',
									justifyContent: 'center',
									textAlign: 'center',
									fontFamily: 'artifika',
								}}
							>
								<thead style={{ width: 10 }}>
									<tr>
										<th>Produtos</th>
										<th>Quantidade</th>
										<th>Preço</th>
									</tr>
								</thead>
								<tbody>
									{empty ? (
										<tr>
											<td colSpan={4}>
												<h4
													style={{
														marginTop: 25,
														marginBottom: 25,
														fontWeight: 'normal',
														fontFamily: 'artifika',
													}}
												>
													O seu carrinho de compras encontra-se vazio, adicione produtos ao
													carrinho...
												</h4>
											</td>
										</tr>
									) : (
										cart?.map((item, index) => {
											return (
												<tr key={index}>
													<td>
														<Image src={item.photo_product} width="150" height="150" />
													</td>
													<td
														style={{
															fontSize: 22,
															textAlign: 'center',
															fontFamily: 'artifika',
														}}
													>
														<AiFillMinusCircle
															size="28"
															onClick={() => onSub(item, index)}
															style={{ marginRight: 10, color: '#9B3939' }}
														/>
														{cart[index].quantity}
														<AiFillPlusCircle
															size="28"
															onClick={() => onAdd(item, index)}
															style={{ marginLeft: 10, color: '#9B3939' }}
														/>
													</td>
													<td style={{ fontSize: 18, textAlign: 'center' }}>
														{cart[index].price_product} €
													</td>
												</tr>
											);
										})
									)}
								</tbody>
								<tfoot>
									<tr>
										<th></th>
										<td
											style={{
												fontSize: 22,
												fontWeight: 'bold',
												textAlign: 'center',
												fontFamily: 'artifika',
											}}
										>
											Total:{' '}
										</td>
										<td style={{ fontSize: 20, textAlign: 'center', fontFamily: 'artifika' }}>
											{price} €
										</td>
									</tr>
								</tfoot>
							</Table>
						</Col>
						<Col sm={1} />
					</Row>
				</Tab.Container>
				<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
					<Row id="row" style={{ marginBottom: 80, marginTop: 20 }}>
						<Col sm={2} />
						<Col sm={8} />
						<Col sm={1}>
							<Button
								disabled={empty}
								variant="dark"
								size="lg"
								onClick={handleClick}
								style={{ color: 'white', backgroundColor: '#9B3939', fontFamily: 'artifika' }}
							>
								Comprar
							</Button>
						</Col>
						<Col sm={1} />
					</Row>
				</Tab.Container>
			</div>
		</>
	);
};
