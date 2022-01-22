import React, { useState } from 'react';
import { Image, Tab, Row, Col, Button, Table, Modal, Form, Container, InputGroup, FormControl } from 'react-bootstrap';
import { AiFillEdit, AiFillDelete, AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';
import { useHistory } from 'react-router-dom';
import { Producer } from '..';
import axios from 'axios';

interface ProductList {
	id: {
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
}

export const ProductListProducer: React.FC = () => {
	const [products, setProducts] = useState<ProductList[]>();

	const userId = useSelector((state: StoreState) => state.common.user.id);
	const token = useSelector((state: StoreState) => state.common.user.token);

	const [showModalEditHoney, setShowModalEditHoney] = useState(false);
	const [showmodalEditJam, setShowmodalEditJam] = useState(false);
	const [ShowModalEditFruit, setShowModalEditFruit] = useState(false);
	const [showmodalEditSausages, setShowmodalEditSausages] = useState(false);

	const [showModalEdit, setShowModalEdit] = useState(false);
	const [showModalDelete, setShowModalDelete] = useState(false);
	const [searched, setSearched] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
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

	const history = useHistory();

	const handleShowEdit = (item: ProductList) => {
		setActiveItemName(item.name);
		setActiveItemID(item.id.$oid);
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

		if (activeItemCategory === 'Mel') {
			setShowModalEditHoney(true);
		}

		if (activeItemCategory === 'Compotas') {
			setShowmodalEditJam(true);
		}

		if (activeItemCategory === 'Frutos Secos') {
			setShowModalEditFruit(true);
		}
		if (activeItemCategory === 'Enchidos e Carne') {
			setShowmodalEditSausages(true);
		}
	};

	const handleShowDelete = (item: ProductList) => {
		setActiveItemID(item.id.$oid);
		setActiveItemName(item.name);
		setShowModalDelete(true);
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

	const getByCategory = (category: string, id: string) => {
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		if (category === 'Todos') {
			axios.get(`http://127.0.0.1:5000/products/producer/${userId}`, config).then((res) => {
				const products = res.data;
				setProducts(products);
			});
		} else {
			if (
				category === 'Mel' ||
				category === 'Compotas' ||
				category === 'Frutos Secos' ||
				category === 'Enchidos e Carne'
			) {
				axios.get(`http://127.0.0.1:5000/products/${userId}/Category/${category}`, config).then((res) => {
					const products = res.data;
					setProducts(products);
				});
			} else {
				axios.get(`http://127.0.0.1:5000/products/${userId}/${category}`, config).then((res) => {
					const products = res.data;
					setProducts(products);
				});
			}
		}
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
				},
				config
			)
			.then((res) => {
				console.log(res);
				console.log(res.data);
			});
	};

	const handleCloseEdit = () => {
		setShowModalEditHoney(false);
		setShowModalEditFruit(false);
		setShowmodalEditJam(false);
		setShowModalDelete(false);
	};

	const handleCloseDelete = (id: string) => {
		handleCloseEdit();
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		axios.delete(`http://127.0.0.1:5000/products/${userId}`, config).then((res) => {
			console.log(res);
			console.log(res.data);
		});
		window.location.reload();
	};

	const modalDelete = () => {
		return (
			<Modal show={showModalDelete} onHide={handleCloseDelete} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Eliminar Produto</Modal.Title>
				</Modal.Header>
				<Modal.Body>Pretende eliminar o produto {activeItemName}?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseEdit}>
						Cancelar
					</Button>
					<Button variant="primary" onClick={() => handleCloseDelete(activeItemID)}>
						Apagar
					</Button>
				</Modal.Footer>
			</Modal>
		);
	};

	const modalEditHoney = () => {
		return (
			<Modal centered size="lg" show={showModalEditHoney} onHide={handleCloseEdit} animation={true}>
				<Modal.Header closeButton>
					<Modal.Title>Editar dados do produto {activeItemName}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col>
							<Form.Label>Nome do Produto </Form.Label>
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
							<Form.Label>Tipo de Mel </Form.Label>
							<Form.Control required onChange={handleType} as="select" defaultValue={activeItemType}>
								<option>Mel Natural</option>
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

	const modalEditFruit = () => {
		return (
			<Modal centered size="lg" show={ShowModalEditFruit} onHide={handleCloseEdit} animation={true}>
				<Modal.Header closeButton>
					<Modal.Title>Editar dados do produto {activeItemName}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<br />

						<Row>
							<Col md={4}></Col>
						</Row>

						<Row>
							<Col>
								<Form.Label>Nome do Produto</Form.Label>
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
								<Form.Label>Tipo de Frutos Secos </Form.Label>
								<Form.Control required onChange={handleType} as="select" defaultValue={activeItemType}>
									<option>Amêndoa</option>
									<option>Granola sem açucar</option>
									<option>Pinhão</option>
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

	const modalEditJam = () => {
		return (
			<Modal centered size="lg" show={showmodalEditJam} onHide={handleCloseEdit} animation={true}>
				<Modal.Header closeButton>
					<Modal.Title>Editar dados do produto {activeItemName} </Modal.Title>
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
								<Form.Label>Nome do Produto</Form.Label>
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
								<Form.Label>Tipo de Compotas </Form.Label>
								<Form.Control required onChange={handleType} as="select" defaultValue={activeItemType}>
									<option>Compota de Figos</option>
									<option>Compota de Morango</option>
									<option>Compota de Kiwi</option>
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

	const modalEditSausages = () => {
		return (
			<Modal centered size="lg" show={showmodalEditSausages} onHide={handleCloseEdit} animation={true}>
				<Modal.Header closeButton>
					<Modal.Title>Editar dados do produto {activeItemName} </Modal.Title>
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
								<Form.Label>Nome do Produto</Form.Label>
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
								<Form.Label>Tipo de Enchidos e Carne</Form.Label>
								<Form.Control required onChange={handleType} as="select" defaultValue={activeItemType}>
									<option>Presunto</option>
									<option>Almu</option>
									<option>Alheiras</option>
									<option>Bucho</option>
									<option>Salpicão</option>
									<option>Chouriço</option>
									<option>Farinheira</option>
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

	const editSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearched(true);
		setSearchTerm(e.target.value);
	};

	const search = () => {
		if (products !== undefined) {
			const name = Object.values(products).filter((a) => a.name.toLowerCase().includes(searchTerm.toLowerCase()));
			return name.map((item, index) => {
				return (
					<tr key={index}>
						<td>{item.name}</td>
						<td>{item.category}</td>
						<td>{item.validity}</td>
						<td>{item.quantity}</td>
						<td>{item.harvest}</td>
						<td>{item.stock}</td>
						<td>{item.price}</td>
						<td>{item.photo}</td>
						<td>
							<Image height="60" width="50" src={item.photo}></Image>
						</td>
						<td>{item.stock}</td>
						<td>
							<AiFillEdit onClick={() => handleShowEdit(item)} size="25" style={{ color: '#8A3535' }} />
							{showModalEditHoney ? modalEditHoney() : false}
							{ShowModalEditFruit ? modalEditFruit() : false}
							{showmodalEditJam ? modalEditJam() : false}
							{showmodalEditSausages ? modalEditSausages() : false}
						</td>
						<td>
							<AiFillDelete
								onClick={() => handleShowDelete(item)}
								size="25"
								style={{ color: '#8A3535' }}
							/>
							{showModalDelete ? modalDelete() : false}
						</td>
					</tr>
				);
			});
		}
	};

	return (
		<>
			<div>
				<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
					<Row style={{ marginTop: 35 }}>
						<Col sm={1}></Col>
						<Col sm={6}>
							<div style={{ display: 'flex', marginLeft: 100 }}>
								<h1 style={{ fontFamily: 'artifika', color: '#9B3939' }} className="text-left">
									Produtos de {activeItemname_producer}
								</h1>
							</div>
						</Col>
						<Col sm={4}>
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
							<br></br>
							<Form.Label>Filtrar por Categoria </Form.Label>
							<Form.Control
								style={{ fontSize: 14, fontWeight: 'bold', color: 'black', fontFamily: 'artifika' }}
								size="sm"
								required
								onChange={handleCategoryFilter}
								/* 	onClick={getByCategory()} */
								as="select"
							>
								<option style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>
									Todos os Produtos
								</option>
								<option
									style={{ fontSize: 14, fontWeight: 'bold', color: 'black', fontFamily: 'artifika' }}
								>
									Todo o Mel
								</option>
								<option
									style={{ fontSize: 14, fontWeight: 'bold', color: 'black', fontFamily: 'artifika' }}
								>
									Todos as Compotas
								</option>
								<option
									style={{ fontSize: 14, fontWeight: 'bold', color: 'black', fontFamily: 'artifika' }}
								>
									Todos os Frutos Secos
								</option>
								<option
									style={{ fontSize: 14, fontWeight: 'bold', color: 'black', fontFamily: 'artifika' }}
								>
									Todos os Enchidos e Carne
								</option>
							</Form.Control>
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
									fontFamily: 'artifika',
								}}
							>
								<thead style={{ width: 10, fontFamily: 'artifika' }}>
									<tr>
										<th>Nome</th>
										<th>Categoria</th>
										<th>Quantidade</th>
										<th>Validade</th>
										<th>Colheita</th>
										<th>Preço</th>
										<th>Foto</th>
										<th>Stock</th>
										<th>
											<Button onClick={() => history.push('/createProduct')}>
												Adicionar Novo Produto
											</Button>
										</th>
									</tr>
								</thead>
								<tbody>
									{products?.length === 0 && (
										<tr>
											<td colSpan={9}>Não existem produtos </td>
										</tr>
									)}
									{searchTerm === ''
										? products?.map((item, index) => {
												return (
													<tr key={index}>
														<td>{item.name}</td>
														<td>{item.category}</td>
														<td>{item.quantity}</td>
														<td>{item.validity}</td>
														<td>{item.harvest}</td>
														<td>{item.price}</td>
														<td>
															<Image height="60" width="50" src={item.photo}></Image>
														</td>
														<td>{item.stock}</td>
														<td>
															<AiFillEdit
																onClick={() => handleShowEdit(item)}
																size="25"
																style={{ color: '#9B3939' }}
															/>
															{showModalEditHoney ? modalEditHoney() : false}
															{ShowModalEditFruit ? modalEditFruit() : false}
															{showmodalEditJam ? modalEditJam() : false}
															{showmodalEditSausages ? modalEditSausages() : false}
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
						</Col>
						<Col sm={1} />
					</Row>
				</Tab.Container>
				<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
					<Row id="row" style={{ marginBottom: 80 }}>
						<Col sm={1} />

						<Col sm={8} style={{ marginTop: 50 }} />

						<Col sm={1} />
					</Row>
				</Tab.Container>
			</div>
		</>
	);
};
