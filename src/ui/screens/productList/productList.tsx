import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Image,
	Tab,
	Row,
	Col,
	Button,
	Table,
	Modal,
	Form,
	InputGroup,
	FormControl,
	Card,
	Breadcrumb,
	Alert,
} from 'react-bootstrap';
import { AiFillDelete, AiFillEdit, AiOutlineSearch } from 'react-icons/ai';
import { StoreState } from 'store';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Loader } from 'ui';

interface Product {
	_id: {
		$oid: string;
	};
	name: string;
	type: string;
	quantity: string;
	validity: string;
	harvest: string;
	category: string;
	price: string;
	photo: string;
	stock: string;
	id_producer: string;
	logo_producer: string;
	name_producer: string;
	state: string;
}

export const ProductList: React.FC = () => {
	const history = useHistory();
	const [showModalDelete, setShowModalDelete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [showDelete, setShowDelete] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);
	const [activeItemName, setActiveItemName] = useState('');
	const [activeItemID, setActiveItemID] = useState('');
	const [products, setProducts] = useState<Product[]>();
	const type = useSelector((state: StoreState) => state.common.user.type);
	const token = useSelector((state: StoreState) => state.common.user.token);
	const isLogged = useSelector((state: StoreState) => state.common.user.isLogged);

	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	useEffect(() => {
		axios.get(`http://127.0.0.1:5000/productslist`, config).then((res) => {
			const product = res.data;
			setProducts(product);
			setIsLoading(true);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refreshKey]);

	const editSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const search = () => {
		if (products !== undefined && products !== null) {
			const name = Object.values(products).filter((a: Product) =>
				a.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
			);
			const category = Object.values(products).filter((a: Product) =>
				a.category.toLowerCase().includes(searchTerm.toLocaleLowerCase())
			);
			if (name.length === 0 && category.length === 0) {
				return (
					<tr>
						<td colSpan={9}>Não existem produtos para mostrar</td>
					</tr>
				);
			}
			if (name.length !== 0) {
				return name.map((item, index) => {
					return (
						<tr key={index}>
							<td>{item.name}</td>
							<td>{item.category}</td>
							<td>{item.quantity}</td>
							<td>{item.validity}</td>
							<td>{item.harvest}</td>
							<td>{item.stock}</td>
							<td>{item.price}</td>
							<td>{item.state}</td>
							<td>
								<Image height="50" width="50" src={item.photo}></Image>
							</td>
							<td>
								<AiFillEdit
									onClick={() => history.push('/ediProduct/' + item._id.$oid)}
									size="25"
									style={{ color: '#9B3939' }}
								/>
							</td>
							<td>
								<AiFillDelete
									onClick={() => handleShowDelete(item)}
									size="25"
									style={{ color: '#9B3939' }}
								/>
								{showModalDelete && modalDelete()}
							</td>
						</tr>
					);
				});
			}
			if (category.length !== 0) {
				return category.map((item, index) => {
					return (
						<tr key={index}>
							<td>{item.name}</td>
							<td>{item.category}</td>
							<td>{item.quantity}</td>
							<td>{item.validity}</td>
							<td>{item.harvest}</td>
							<td>{item.stock}</td>
							<td>{item.price}</td>
							<td>{item.state}</td>
							<td>
								<Image height="50" width="50" src={item.photo}></Image>
							</td>
							<td>
								<AiFillEdit
									onClick={() => history.push('/ediProduct/' + item._id.$oid)}
									size="25"
									style={{ color: '#9B3939' }}
								/>
							</td>
							<td>
								<AiFillDelete
									onClick={() => handleShowDelete(item)}
									size="25"
									style={{ color: '#9B3939' }}
								/>
								{showModalDelete && modalDelete()}
							</td>
						</tr>
					);
				});
			}
		}
	};

	const handleCloseDelete = () => {
		setShowModalDelete(false);
	};

	const handleShowDelete = (item: Product) => {
		setActiveItemID(item._id.$oid);
		setActiveItemName(item.name);
		setShowModalDelete(true);
	};

	const showAlertDelete = () => {
		window.setTimeout(() => {
			setShowDelete(false);
		}, 5000);
	};

	const handleDelete = (id: string) => {
		axios.delete(`http://127.0.0.1:5000/products/${id}`, config).then((res) => {
			console.log(res);
			console.log(res.data);
		});
		handleCloseDelete();
		setShowDelete(true);
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		showAlertDelete();
		setRefreshKey(refreshKey + 1);
	};

	const modalDelete = () => {
		return (
			<Modal show={showModalDelete} size="lg" onHide={handleCloseDelete} animation={true}>
				<Modal.Header closeButton>
					<Modal.Title style={{ color: '#8A3535', fontFamily: 'Artifika', fontWeight: 'bold' }}>
						Eliminar Produto
					</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ fontFamily: 'Artifika' }}>
					Pretende eliminar o produto {activeItemName}?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseDelete}>
						Cancelar
					</Button>
					<Button variant="primary" type="submit" onClick={() => handleDelete(activeItemID)}>
						Apagar
					</Button>
				</Modal.Footer>
			</Modal>
		);
	};

	return isLogged && type === 'admin' ? (
		isLoading ? (
			<>
				<Alert key={'successDelete'} variant={'success'} show={showDelete} style={{ textAlign: 'center' }}>
					Produto eliminado com sucesso!
				</Alert>
				<div>
					<Breadcrumb style={{ marginTop: 20, marginLeft: 38 }} id="breadcrumb">
						<Breadcrumb.Item onClick={() => history.push('/dashboardAdmin')}>
							<span style={{ fontFamily: 'artifika', color: '#9B3939' }}>Home</span>
						</Breadcrumb.Item>
						<Breadcrumb.Item active>
							<span style={{ fontFamily: 'artifika', color: 'black' }}>Produtos</span>
						</Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<div>
					<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
						<Row id="row">
							<Col sm={1} />
							<Col sm={5} style={{ marginTop: 35 }}>
								<h1 style={{ color: '#8A3535', fontFamily: 'Artifika' }}>Produtos</h1>
							</Col>
							<Col sm={2} />
							<Col sm={3} style={{ marginTop: 35 }}>
								<Form className="mr-auto">
									<InputGroup className="mb-2">
										<FormControl type="text" placeholder="Pesquisar" onChange={editSearch} />
										<InputGroup.Append>
											<InputGroup.Text style={{ backgroundColor: '#9b3939', color: 'white' }}>
												<AiOutlineSearch />
											</InputGroup.Text>
										</InputGroup.Append>
									</InputGroup>
								</Form>
							</Col>
							<Col sm={1} />
						</Row>
					</Tab.Container>
					<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
						<Row id="row" style={{ marginBottom: 80 }}>
							<Col sm={1} />
							<Col sm={10}>
								<Card
									style={{
										color: '#9B3939',
										fontFamily: 'artifika',
										marginTop: 40,
									}}
								>
									<Table
										style={{
											color: 'black',
											fontFamily: 'artifika',
											alignItems: 'center',
											justifyContent: 'center',
											textAlign: 'center',
										}}
									>
										<thead style={{ width: 10 }}>
											<tr>
												<th>Nome</th>
												<th>Categoria</th>
												<th>Quantidade</th>
												<th>Colheita</th>
												<th>Validade</th>
												<th>Açucar</th>
												<th>Preço</th>
												<th>Foto do Produto</th>
											</tr>
										</thead>
										<tbody>
											{products !== undefined && products.length === 0 && (
												<tr>
													<td colSpan={9}>Não existem produtos para mostrar </td>
												</tr>
											)}
											{searchTerm === ''
												? products !== undefined &&
												  products?.map((item) => {
														return (
															<tr>
																<td>{item.name}</td>
																<td>{item.category}</td>
																<td>{item.quantity}</td>
																<td>{item.harvest}</td>
																<td>{item.validity}</td>
																<td>{item.stock}</td>
																<td>{item.price}</td>
																<td>
																	<Image
																		height="50"
																		width="50"
																		src={item.photo}
																	></Image>
																</td>
																<td>
																	<AiFillEdit
																		onClick={() =>
																			history.push(
																				'/editProduct/' + item._id.$oid
																			)
																		}
																		size="25"
																		style={{ color: '#9B3939' }}
																	/>
																</td>
																<td>
																	<AiFillDelete
																		onClick={() => handleShowDelete(item)}
																		size="25"
																		style={{ color: '#9B3939' }}
																	/>
																	{showModalDelete ? modalDelete() : false}
																</td>
															</tr>
														);
												  })
												: search()}
										</tbody>
									</Table>
								</Card>
							</Col>
							<Col sm={1} />
						</Row>
					</Tab.Container>
				</div>
			</>
		) : (
			<Loader />
		)
	) : (
		<Redirect to="/noPermissions" />
	);
};
