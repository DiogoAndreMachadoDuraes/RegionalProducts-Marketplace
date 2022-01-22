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
	Container,
	InputGroup,
	FormControl,
	Card,
} from 'react-bootstrap';
import { AiFillDelete, AiFillEdit, AiOutlineSearch } from 'react-icons/ai';
import { StoreState } from 'store';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
	const [showModalEditAguardente, setShowModalEditAguardente] = useState(false);
	const [showModalEditLicor, setShowModalEditLicor] = useState(false);
	const [ShowModalEditOlive, setShowModalEditOlive] = useState(false);
	const [ShowModalEditWine, setShowModalEditWine] = useState(false);
	const [showModalEdit, setShowModalEdit] = useState(false);
	const [showModalDelete, setShowModalDelete] = useState(false);

	const [searched, setSearched] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	const [state, setState] = useState('');
	const [activeItemName, setActiveItemName] = useState('');
	const [activeItemID, setActiveItemID] = useState('');
	const [activeItemQuantity, setActiveItemQuantity] = useState('');
	const [activeItemValidity, setActiveItemValidity] = useState('');
	const [activeItemCategory, setActiveItemCategory] = useState('');
	const [activeItemPhoto, setActiveItemPhoto] = useState('');
	const [activeItemHarvest, setActiveItemHarvest] = useState('');
	const [activeItemPrice, setActiveItemPrice] = useState('');
	const [activeItemType, setActiveItemType] = useState('');
	const [activeItemStock, setActiveItemStock] = useState('');
	const [activeItemname_producer, setActiveItemname_producer] = useState('');
	const [activeItemlogo_producer, setActiveItemlogo_producer] = useState('');
	const [activeItemid_producer, setActiveItemid_producer] = useState('');

	const [categoryfilter, setCategoryfilter] = useState('');
	const [products, setProducts] = useState<Product[]>();

	const token = useSelector((state: StoreState) => state.common.user.token);

	useEffect(() => {
		const fetchApi = async () => {
			if (products === undefined) {
				try {
					let response = await fetch('http://127.0.0.1:5000/products', {
						headers: {
							'Access-Control-Allow-Origin': '*',
							Authorization: 'Bearer ' + token,
							Accept: 'application/json',
							'Content-Type': 'application/json',
						},
					});
					let json = await response.json();
					setProducts(json);
					setIsLoading(true);
					console.log(json);
				} catch (e) {
					console.log('Error to get data: ' + e);
				}
			}
		};
		fetchApi();
	});

	const handleShowEdit = (item: Product) => {
		setActiveItemName(item.name);
		setActiveItemID(item._id.$oid);
		setActiveItemQuantity(item.quantity);
		setActiveItemValidity(item.validity);
		setActiveItemCategory(item.category);
		setActiveItemPhoto(item.photo);
		setActiveItemHarvest(item.harvest);
		setActiveItemPrice(item.price);
		setActiveItemType(item.type);
		setActiveItemStock(item.stock);
		setActiveItemname_producer(item.name_producer);
		setActiveItemlogo_producer(item.logo_producer);
		setActiveItemid_producer(item.id_producer);
		setState(item.state);

		if (activeItemCategory === 'Aguardente') {
			setShowModalEditAguardente(true);
		}

		if (activeItemCategory === 'Licor') {
			setShowModalEditLicor(true);
		}

		if (activeItemCategory === 'Vinho') {
			setShowModalEditWine(true);
		}
		if (activeItemCategory === 'Azeite') {
			setShowModalEditOlive(true);
		}
	};

	const handleShowDelete = (item: Product) => {
		setActiveItemID(item._id.$oid);
		setActiveItemName(item.name);
		setShowModalDelete(true);
	};

	const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActiveItemName(e.target.value);
	};

	const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActiveItemType(e.target.value);
	};

	const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActiveItemQuantity(e.target.value);
	};

	const handleValidity = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActiveItemValidity(e.target.value);
	};

	const handleHarvest = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActiveItemHarvest(e.target.value);
	};

	const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActiveItemCategory(e.target.value);
	};

	const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActiveItemPrice(e.target.value);
	};

	const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setActiveItemPhoto(URL.createObjectURL(e.target.files[0]));
		}
	};

	const handleStock = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActiveItemStock(e.target.value);
	};

	const editSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearched(true);
		setSearchTerm(e.target.value);
	};

	const search = (value: string) => {
		if (products !== undefined && products !== null) {
			const name = Object.values(products).filter((a: Product) =>
				a.name.toLowerCase().includes(value.toLocaleLowerCase())
			);
			if (name.length === 0) {
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
								<Image height="60" width="50" src={item.photo}></Image>
							</td>
							<td>
								<AiFillEdit
									onClick={() => handleShowEdit(item)}
									size="25"
									style={{ color: '#9B3939' }}
								/>
								{showModalEditAguardente ? modalEditAguardente() : false}
								{ShowModalEditWine ? modalEditWine() : false}
								{ShowModalEditOlive ? modalEditOlive() : false}
								{showModalEditLicor ? modalEditLicor() : false}
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
				});
			}
		}
	};

	const handleSubmit = (id: string) => {
		handleCloseEdit();
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		axios
			.put(
				`http://127.0.0.1:5000/products/${id}`,
				{
					name: activeItemName,
					type: activeItemType,
					quantity: activeItemQuantity,
					validity: activeItemValidity,
					harvest: activeItemHarvest,
					category: activeItemCategory,
					price: activeItemPrice,
					photo: activeItemPhoto,
					stock: activeItemStock,
					id_producer: activeItemid_producer,
					logo_producer: activeItemlogo_producer,
					name_producer: activeItemname_producer,
					state: state,
				},
				config
			)

			.then((res) => {
				console.log(res);
				console.log(res.data);
			});
	};

	const handleCloseEdit = () => {
		setShowModalEditAguardente(false);
		setShowModalEditWine(false);
		setShowModalEditLicor(false);
		setShowModalEditOlive(false);
		setShowModalDelete(false);
	};

	const handleDelete = (id: string) => {
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		axios.delete(`http://127.0.0.1:5000/products/${id}`, config).then((res) => {
			console.log(res);
			console.log(res.data);
		});
		window.location.reload();
	};

	const handleCategoryFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === 'Todos os Produtos') {
			setCategoryfilter('Todos');
		}

		if (e.target.value === 'Todo o Mel') {
			setCategoryfilter('Mel');
		}
		if (e.target.value === 'Todas as Compotas') {
			setCategoryfilter('Compotas');
		}
		if (e.target.value === 'Todos os Frutos Secos') {
			setCategoryfilter('Frutos Secos');
		}
		if (e.target.value === 'Todos os Enchidos e Carnes') {
			setCategoryfilter('Enchidos e Carne');
		}
	};

	const getByCategory = (category: string) => {
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		if (category === 'Todos') {
			axios.get(`http://127.0.0.1:5000/productslist`, config).then((res) => {
				const products = res.data;
				setProducts(products);
			});
		} else {
			if (
				category === 'Mel' ||
				category === 'Compotas' ||
				category === 'Frutos Secos' ||
				category === 'Enchidos e carne'
			) {
				axios.get(`http://127.0.0.1:5000/products/type/${category}`, config).then((res) => {
					const products = res.data;
					setProducts(products);
				});
			} else {
				axios.get(`http://127.0.0.1:5000/products/category/${category}`, config).then((res) => {
					const products = res.data;
					setProducts(products);
				});
			}
		}
	};

	const modalDelete = () => {
		return (
			<Modal show={showModalDelete} size="lg" onHide={handleCloseEdit} animation={true}>
				<Modal.Header closeButton>
					<Modal.Title style={{ color: '#8A3535', fontFamily: 'Artifika', fontWeight: 'bold' }}>
						Eliminar Produto
					</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ fontFamily: 'Artifika' }}>
					Pretende eliminar o produto {activeItemName}?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseEdit}>
						Cancelar
					</Button>
					<Button variant="primary" type="submit" onClick={() => handleDelete(activeItemID)}>
						Apagar
					</Button>
				</Modal.Footer>
			</Modal>
		);
	};

	const modalEditAguardente = () => {
		return (
			<Modal centered size="lg" show={showModalEditAguardente} onHide={handleCloseEdit} animation={true}>
				<Modal.Header closeButton>
					<Modal.Title style={{ color: '#8A3535', fontFamily: 'Artifika', fontWeight: 'bold' }}>
						Editar dados do produto {activeItemName}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col>
							<Form.Label>Nome </Form.Label>
							<Form.Control
								id="nome"
								defaultValue={activeItemName}
								required
								onChange={handleName}
								type="text"
								placeholder="Nome"
							/>
						</Col>

						<Col>
							<Form.Label>Quantidade por garrafa (em ML) </Form.Label>
							<Form.Control
								onChange={handleQuantity}
								defaultValue={activeItemQuantity}
								id="quantidade"
								type="number"
								min="1"
								placeholder="Quantidade"
							/>
						</Col>
					</Row>
					<br />
					<Row>
						<Col>
							<Form.Label>Validade </Form.Label>
							<Form.Control
								required
								onChange={handleValidity}
								defaultValue={activeItemValidity}
								id="validade"
								min="2021"
								type="number"
								placeholder=" Validade"
							/>
						</Col>
						<Col>
							<Form.Label>Data de Colheita </Form.Label>
							<Form.Control
								required
								onChange={handleHarvest}
								defaultValue={activeItemHarvest}
								id="data_colheita"
								max="2021-05-03"
								type="date"
								placeholder="Data de Colheita"
							/>
						</Col>
					</Row>
					<br />
					<Row>
						<Col md={6}>
							<Form.Label>Preço </Form.Label>
							<Form.Control
								required
								onChange={handlePrice}
								defaultValue={activeItemPrice}
								id="preco"
								min="0.01"
								type="number"
								placeholder="Preço"
								step=".01"
							/>
						</Col>
					</Row>
					<br />
					<Row>
						<Col>
							<Form.Label>Tipo de Aguardente </Form.Label>
							<Form.Control required onChange={handleType} as="select" defaultValue={activeItemType}>
								<option>Medronho</option>
								<option>Ceriais</option>
								<option>Cana de Madeira</option>
								<option>Pera</option>
							</Form.Control>
						</Col>
						<Col>
							<Form.Label>Quantidade de Stock </Form.Label>
							<Form.Control
								required
								onChange={handleStock}
								defaultValue={activeItemStock}
								id="stock"
								min="1"
								type="number"
								placeholder="Stock"
							/>
						</Col>
					</Row>
					<br />
					<Row>
						<Col>
							<Form>
								<Form.Group>
									<Form.File
										onChange={handlePhoto}
										id="exampleFormControlFile1"
										label="Inserir foto"
									/>
								</Form.Group>
							</Form>
						</Col>
						<Col>
							<Image height="120" width="80" className="padding_image" src={activeItemPhoto}></Image>
						</Col>
					</Row>
					<Row style={{ marginTop: 20 }}>
						<Button
							type="submit"
							onClick={() => handleSubmit(activeItemID)}
							variant="primary"
							size="lg"
							block
						>
							Alterar
						</Button>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleCloseEdit} variant="secondary">
						Cancelar
					</Button>
				</Modal.Footer>
			</Modal>
		);
	};

	const modalEditWine = () => {
		return (
			<Modal show={ShowModalEditWine} centered size="lg" onHide={handleCloseEdit} animation={true}>
				<Modal.Header closeButton>
					<Modal.Title style={{ color: '#8A3535', fontFamily: 'Artifika', fontWeight: 'bold' }}>
						Editar dados do produto {activeItemName}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<br />

						<Row>
							<Col md={4}></Col>
						</Row>

						<Row>
							<Col>
								<Form.Label>Nome </Form.Label>
								<Form.Control
									id="nome"
									required
									defaultValue={activeItemName}
									onChange={handleName}
									type="text"
									placeholder="Nome"
								/>
							</Col>

							<Col>
								<Form.Label>Quantidade por garrafa (em ML) </Form.Label>
								<Form.Control
									required
									onChange={handleQuantity}
									defaultValue={activeItemQuantity}
									id="quantidade"
									type="number"
									min="1"
									placeholder="Quantidade por garrafa"
								/>
							</Col>
						</Row>
						<br />
						<Row>
							<Col>
								<Form.Label> Validade </Form.Label>
								<Form.Control
									required
									onChange={handleValidity}
									defaultValue={activeItemValidity}
									id="validade"
									min="2021"
									type="number"
									placeholder=" Validade"
								/>
							</Col>
							<Col>
								<Form.Label>Data de Colheita </Form.Label>
								<Form.Control
									required
									onChange={handleHarvest}
									defaultValue={activeItemHarvest}
									id="data_colheita"
									max="2021-05-03"
									type="date"
									placeholder="Data de Colheita"
								/>
							</Col>
						</Row>
						<br />
						<Row>
							<Col md={6}>
								<Form.Label>Preço </Form.Label>
								<Form.Control
									required
									onChange={handlePrice}
									defaultValue={activeItemPrice}
									id="preco"
									min="0.01"
									type="number"
									placeholder="Preço"
									step=".01"
								/>
							</Col>
						</Row>
						<br />
						<Row>
							<Col>
								<Form.Label>Tipo de Vinho </Form.Label>
								<Form.Control required onChange={handleType} as="select" defaultValue={activeItemType}>
									<option>Tinto</option>
									<option>Branco</option>
									<option>Rose</option>
									<option>Espumante</option>
								</Form.Control>
							</Col>
							<Col>
								<Form.Label>Quantidade de Stock </Form.Label>
								<Form.Control
									required
									onChange={handleStock}
									defaultValue={activeItemStock}
									id="stock"
									min="1"
									type="number"
									placeholder="Stock"
								/>
							</Col>
						</Row>
						<br />
						<Row>
							<Col>
								<Form>
									<Form.Group>
										<Form.File
											onChange={handlePhoto}
											id="exampleFormControlFile1"
											label="Inserir foto"
										/>
									</Form.Group>
								</Form>
							</Col>
							<Col>
								<Image height="120" width="80" className="padding_image" src={activeItemPhoto}></Image>
							</Col>
						</Row>
						<Row style={{ marginTop: 20 }}>
							<Button
								type="submit"
								onClick={() => handleSubmit(activeItemID)}
								variant="primary"
								size="lg"
								block
							>
								Alterar
							</Button>
						</Row>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleCloseEdit}>
						Cancelar
					</Button>
				</Modal.Footer>
			</Modal>
		);
	};

	const modalEditLicor = () => {
		return (
			<Modal show={showModalEditLicor} centered size="lg" onHide={handleCloseEdit} animation={true}>
				<Modal.Header closeButton>
					<Modal.Title style={{ color: '#8A3535', fontFamily: 'Artifika', fontWeight: 'bold' }}>
						Editar dados do produto {activeItemName}{' '}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<Row></Row>
						<br />

						<Row>
							<Col md={4}></Col>
						</Row>

						<Row>
							<Col>
								<Form.Label>Nome </Form.Label>
								<Form.Control
									id="nome"
									required
									defaultValue={activeItemName}
									onChange={handleName}
									type="text"
									placeholder="Nome"
								/>
							</Col>

							<Col>
								<Form.Label>Quantidade por garrafa (em ML) </Form.Label>
								<Form.Control
									required
									onChange={handleQuantity}
									defaultValue={activeItemQuantity}
									id="quantidade"
									type="number"
									min="1"
									placeholder="Quantidade por garrafa"
								/>
							</Col>
						</Row>
						<br />
						<Row>
							<Col>
								<Form.Label> Validade </Form.Label>
								<Form.Control
									required
									onChange={handleValidity}
									defaultValue={activeItemValidity}
									id="validade"
									min="2021"
									type="number"
									placeholder=" Validade"
								/>
							</Col>
							<Col>
								<Form.Label>Data de Colheita </Form.Label>
								<Form.Control
									required
									onChange={handleHarvest}
									defaultValue={activeItemHarvest}
									id="data_colheita"
									max="2021-05-03"
									type="date"
									placeholder="Data de Colheita"
								/>
							</Col>
						</Row>
						<br />
						<Row>
							<Col md={6}>
								<Form.Label>Preço </Form.Label>
								<Form.Control
									required
									onChange={handlePrice}
									defaultValue={activeItemPrice}
									id="preco"
									min="0.01"
									type="number"
									placeholder="Preço"
									step=".01"
								/>
							</Col>
						</Row>
						<br />
						<Row>
							<Col>
								<Form.Label>Tipo de Licor </Form.Label>
								<Form.Control required onChange={handleType} as="select" defaultValue={activeItemType}>
									<option>Limoncello</option>
									<option>Cafe</option>
									<option>Amendoa</option>
									<option>Chocolate</option>
								</Form.Control>
							</Col>
							<Col>
								<Form.Label>Quantidade de Stock </Form.Label>
								<Form.Control
									required
									onChange={handleStock}
									defaultValue={activeItemStock}
									id="stock"
									min="1"
									type="number"
									placeholder="Stock"
								/>
							</Col>
						</Row>
						<br />
						<Row>
							<Col>
								<Form>
									<Form.Group>
										<Form.File
											onChange={handlePhoto}
											id="exampleFormControlFile1"
											label="Inserir foto"
										/>
									</Form.Group>
								</Form>
							</Col>
							<Col>
								<Image height="120" width="80" className="padding_image" src={activeItemPhoto}></Image>
							</Col>
						</Row>
						<Row style={{ marginTop: 20 }}>
							{' '}
							<Button
								type="submit"
								onClick={() => handleSubmit(activeItemID)}
								variant="primary"
								size="lg"
								block
							>
								Alterar
							</Button>
						</Row>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleCloseEdit} variant="secondary">
						Cancelar
					</Button>
				</Modal.Footer>
			</Modal>
		);
	};

	const modalEditOlive = () => {
		return (
			<Modal show={ShowModalEditOlive} onHide={handleCloseEdit} centered size="lg" animation={true}>
				<Modal.Header closeButton>
					<Modal.Title style={{ color: '#8A3535', fontFamily: 'Artifika', fontWeight: 'bold' }}>
						Editar dados do produto {activeItemName}{' '}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<br />

						<Row>
							<Col md={4}></Col>
						</Row>

						<Row>
							<Col>
								<Form.Label>Nome </Form.Label>
								<Form.Control
									id="nome"
									required
									defaultValue={activeItemName}
									onChange={handleName}
									type="text"
									placeholder="Nome"
								/>
							</Col>

							<Col>
								<Form.Label>Quantidade por garrafa (em ML) </Form.Label>
								<Form.Control
									required
									onChange={handleQuantity}
									defaultValue={activeItemQuantity}
									id="quantidade"
									type="number"
									min="1"
									placeholder="Quantidade por garrafa"
								/>
							</Col>
						</Row>
						<br />
						<Row>
							<Col>
								<Form.Label> Validade </Form.Label>
								<Form.Control
									required
									onChange={handleValidity}
									defaultValue={activeItemValidity}
									id="validade"
									min="2021"
									type="number"
									placeholder=" Validade"
								/>
							</Col>
							<Col>
								<Form.Label>Data de Colheita </Form.Label>
								<Form.Control
									required
									onChange={handleHarvest}
									defaultValue={activeItemHarvest}
									id="data_colheita"
									max="2021-05-03"
									type="date"
									placeholder="Data de Colheita"
								/>
							</Col>
						</Row>
						<br />
						<Row>
							<Col md={6}>
								<Form.Label>Preço </Form.Label>
								<Form.Control
									required
									onChange={handlePrice}
									defaultValue={activeItemPrice}
									id="preco"
									min="0.01"
									type="number"
									placeholder="Preço"
									step=".01"
								/>
							</Col>
						</Row>
						<br />
						<Row>
							<Col>
								<Form.Label>Tipo de Azeite </Form.Label>
								<Form.Control required onChange={handleType} as="select" defaultValue={activeItemType}>
									<option>Virgem</option>
									<option>Extra-Virgem</option>
									<option>Aromatizado</option>
								</Form.Control>
							</Col>
							<Col>
								<Form.Label>Quantidade de Stock </Form.Label>
								<Form.Control
									required
									onChange={handleStock}
									defaultValue={activeItemStock}
									id="stock"
									min="1"
									type="number"
									placeholder="Stock"
								/>
							</Col>
						</Row>
						<br />
						<Row>
							<Col>
								<Form>
									<Form.Group>
										<Form.File
											onChange={handlePhoto}
											id="exampleFormControlFile1"
											label="Inserir foto"
										/>
									</Form.Group>
								</Form>
							</Col>
							<Col>
								<Image height="120" width="80" className="padding_image" src={activeItemPhoto}></Image>
							</Col>
						</Row>
						<Row style={{ marginTop: 20 }}>
							<Button
								type="submit"
								onClick={() => handleSubmit(activeItemID)}
								variant="primary"
								size="lg"
								block
							>
								Alterar
							</Button>
						</Row>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleCloseEdit} variant="secondary">
						Cancelar
					</Button>
				</Modal.Footer>
			</Modal>
		);
	};

	return (
		<>
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
									<FormControl type="text" placeholder="Pesquisar" />
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
										marginTop: 26,
										alignItems: 'center',
										justifyContent: 'center',
										textAlign: 'center',
										borderColor: '#9B3939',
										fontFamily: 'Artifika',
									}}
								>
									<thead style={{ width: 10 }}>
										<tr>
											<th>Nome</th>
											<th>Categoria</th>
											<th>Colheita</th>
											<th>Validade</th>
											<th>Açucar</th>
											<th>Preço</th>
											<th>Foto do Produto</th>
											<th>Estado</th>
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
															<td>{item.validity}</td>
															<td>{item.harvest}</td>
															<td>{item.stock}</td>
															<td>{item.price}</td>
															<td>{item.state}</td>
															<td>
																<Image height="60" width="50" src={item.photo}></Image>
															</td>
															<td>
																<AiFillEdit
																	onClick={() => handleShowEdit(item)}
																	size="25"
																	style={{ color: '#9B3939' }}
																/>
																{showModalEditAguardente
																	? modalEditAguardente()
																	: false}
																{ShowModalEditWine ? modalEditWine() : false}
																{ShowModalEditOlive ? modalEditOlive() : false}
																{showModalEditLicor ? modalEditLicor() : false}
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
											: /* search() */ true}
									</tbody>
								</Table>
							</Card>
						</Col>
						<Col sm={1} />
					</Row>
				</Tab.Container>
			</div>
		</>
	);
};
