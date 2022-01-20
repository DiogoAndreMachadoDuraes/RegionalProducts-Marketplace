import React, { useState } from 'react';
import axios from 'axios';
import { Image, Tab, Row, Col, Button, Table, Modal, Form, Container, InputGroup, FormControl } from 'react-bootstrap';
import { Producer } from '..';
import { AiFillEdit, AiFillDelete, AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';
import { Redirect } from 'react-router-dom';

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
	acidity: string;
	alcohol_content: string;
	price: string;
	photo: string;
	stock: string;
	id_producer: string;
	logo_producer: string;
	name_producer: string;
}

export const ProductListProducer: React.FC = () => {
	const Spacer = require('react-spacer');

	const userId = useSelector((state: StoreState) => state.common.user.id);

	const [showModalEditHoney, setShowModalEditHoney] = useState(false);
	const [showmodalEditJam, setShowmodalEditJam] = useState(false);
	const [ShowModalEditFruit, setShowModalEditFruit] = useState(false);
	const [showModalEdit, setShowModalEdit] = useState(false);
	const [showModalDelete, setShowModalDelete] = useState(false);
	const [searched, setSearched] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [activeItemName, setActiveItemName] = useState('');
	const [activeItemID, setActiveItemID] = useState('');
	const [activeItemQuantity, setActiveItemQuantity] = useState('');
	const [activeItemValidity, setActiveItemValidity] = useState('');
	const [activeItemAcidity, setActiveItemAcidity] = useState('');
	const [activeItemCategory, setActiveItemCategory] = useState('');
	const [activeItemPhoto, setActiveItemPhoto] = useState('');
	const [activeItemAlcoholContent, setActiveItemAlcoholContent] = useState('');
	const [activeItemHarvest, setActiveItemHarvest] = useState('');
	const [activeItemPrice, setActiveItemPrice] = useState('');
	const [activeItemType, setActiveItemType] = useState('');
	const [activeItemStock, setActiveItemStock] = useState('');
	const [activeItemname_producer, setActiveItemname_producer] = useState('');
	const [activeItemlogo_producer, setActiveItemlogo_producer] = useState('');
	const [activeItemid_producer, setActiveItemid_producer] = useState('');
	const [categoryfilter, setCategoryfilter] = useState('');
	const [products, setProducts] = useState<ProductList[]>();

	const token = useSelector((state: StoreState) => state.common.user.token);

	const handleShowEdit = (item: ProductList) => {
		setActiveItemName(item.name);
		setActiveItemID(item.id.$oid);
		setActiveItemQuantity(item.quantity);
		setActiveItemValidity(item.validity);
		setActiveItemAcidity(item.acidity);
		setActiveItemCategory(item.category);
		setActiveItemPhoto(item.photo);
		setActiveItemAlcoholContent(item.alcohol_content);
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
			if (category === 'Mel' || category === 'Compotas' || category === 'Frutos Secos') {
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

	const handleAcidity = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActiveItemAcidity(e.target.value);
	};

	const handleAlcoholContent = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActiveItemAlcoholContent(e.target.value);
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
					acidity: activeItemAcidity,
					alcohol_content: activeItemAlcoholContent,
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
						<Col>
							<Form.Label>Teor Alcóol </Form.Label>
							<Form.Control
								required
								onChange={handleAlcoholContent}
								defaultValue={activeItemAlcoholContent}
								id="teor"
								min="0"
								type="number"
								placeholder="Teor de Alcóol"
							/>
						</Col>
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
							<Col>
								<Form.Label>Teor Alcóol </Form.Label>
								<Form.Control
									required
									onChange={handleAlcoholContent}
									defaultValue={activeItemAlcoholContent}
									id="teor"
									min="0"
									type="number"
									placeholder="Teor de Alcóol"
								/>
							</Col>
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
							<Col>
								<Form.Label>Teor Alcóol </Form.Label>
								<Form.Control
									required
									onChange={handleAlcoholContent}
									defaultValue={activeItemAlcoholContent}
									id="teor"
									min="0"
									type="number"
									placeholder="Teor de Alcóol"
								/>
							</Col>
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
						<td>{item.quantity}</td>
						<td>{item.validity}</td>
						<td>{item.harvest}</td>
						<td>{item.type}</td>
						<td>{item.alcohol_content}</td>
						<td>{item.acidity}</td>
						<td>{item.price}</td>
						<td>
							<Image height="60" width="50" src={item.photo}></Image>
						</td>
						<td>{item.stock}</td>
						<td>
							<AiFillEdit onClick={() => handleShowEdit(item)} size="25" style={{ color: '#8A3535' }} />
							{showModalEditHoney ? modalEditHoney() : false}
							{ShowModalEditFruit ? modalEditFruit() : false}
							{showmodalEditJam ? modalEditJam() : false}
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
								style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}
								size="sm"
								required
								onChange={handleCategoryFilter}
								/* 	onClick={() => getByCategory(categoryfilter)} */
								as="select"
							>
								<option style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>
									Todos os Produtos
								</option>
								<option style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>Todo o Mel</option>
								<option style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>
									Todos as Compotas
								</option>
								<option style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>
									Todos os Frutos Secos
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
								}}
							>
								<thead style={{ width: 10 }}>
									<tr>
										<th>Nome</th>
										<th>Categoria</th>
										<th>Quantidade</th>
										<th>Validade</th>
										<th>Data de Colheita</th>
										<th>Tipo</th>
										<th>Teor de Alcóol</th>
										<th>Acidez</th>
										<th>Preço</th>
										<th>Foto</th>
										<th>Stock</th>
										<th>
											<Button href="/createproduct"> Adicionar Novo Produto</Button>{' '}
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
														<td>{item.type}</td>
														<td>{item.alcohol_content}</td>
														<td>{item.acidity}</td>
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

/* class TableProductsofProducer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      showModalEditHoney: false,
      showmodalEditJam: false,
      showModalEditFruit: false,
      showModalEditOlive: false,
      showModalDelete: false,
      activeItemName: "",
      activeItemQuantity: "",
      activeItemValidity: "",
      activeItemAcidity: "",
      activeItemCategory: "",
      activeItemPhoto: "",
      activeItemAlcoholContent: "",
      activeItemHarvest: "",
      activeItemPrice: "",
      activeItemType: "",
      activeItemID: "",
      activeItemid_producer: "",
      activeItemlogo_producer: "",
      activeItemname_producer: "",
      categoryfilter: "",
      searchTerm: "",
      searched: false,
    };
  }

  async componentDidMount() {
    try {
      let token = await localStorage.getItem("token");
      let type = await localStorage.getItem("type");
      let userId = await localStorage.getItem("userId");
      let name = await localStorage.getItem("name");
      if (token !== null) {
        this.setState({
          isLogged: true,
          token,
          type,
          userId,
          name,
        });
        console.log(userId);
      } else {
        this.setState({
          isLogged: false,
        });
      }
    } catch (e) {
      console.log("Error rending data: " + e);
    }
    const { token, userId } = this.state;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(`http://127.0.0.1:5000/products/producer/${userId}`, config)
      .then((res) => {
        const products = res.data;
        this.setState(products);
      });
  }

  handleShowEdit(item) {
    this.setState({
      activeItemName: item.name,
      activeItemID: item._id.$oid,
      activeItemQuantity: item.quantity,
      activeItemValidity: item.validity,
      activeItemAcidity: item.acidity,
      activeItemCategory: item.category,
      activeItemPhoto: item.photo,
      activeItemAlcoholContent: item.alcohol_content,
      activeItemHarvest: item.harvest,
      activeItemPrice: item.price,
      activeItemType: item.type,
      activeItemStock: item.stock,
      activeItemname_producer: item.name_producer,
      activeItemlogo_producer: item.logo_producer,
      activeItemid_producer: item.id_producer,
    });

    if (item.category === "Aguardente") {
      this.setState({ showModalEditHoney: true });
    }

    if (item.category === "Licor") {
      this.setState({ showmodalEditJam: true });
    }

    if (item.category === "Vinho") {
      this.setState({ showModalEditFruit: true });
    }
    if (item.category === "Azeite") {
      this.setState({ showModalEditOlive: true });
    }
  }

  handleShowDelete(item) {
    this.setState({
      activeItemID: item._id.$oid,
      showModalDelete: true,
      activeItemName: item.name,
    });
  }

  handleCategoryFilter = (e) => {
    if (e.target.value === "Todos os Produtos") {
      this.setState({ categoryfilter: "Todos" });
    }

    if (e.target.value === "Todos os Vinhos") {
      this.setState({ categoryfilter: "Vinho" });
    }
    if (e.target.value === "Todos os Azeites") {
      this.setState({ categoryfilter: "Azeite" });
    }
    if (e.target.value === "Todos os Licores") {
      this.setState({ categoryfilter: "Licor" });
    }
    if (e.target.value === "Todas as Aguardentes") {
      this.setState({ categoryfilter: "Aguardente" });
    }
    if (e.target.value === "Vinho Branco") {
      this.setState({ categoryfilter: "Branco" });
    }
    if (e.target.value === "Vinho Tinto") {
      this.setState({ categoryfilter: "Tinto" });
    }
    if (e.target.value === "Vinho Rose") {
      this.setState({ categoryfilter: "Rose" });
    }
    if (e.target.value === "Vinho Espumante") {
      this.setState({ categoryfilter: "Espumante" });
    }
    if (e.target.value === "Azeite Virgem") {
      this.setState({ categoryfilter: "Virgem" });
    }
    if (e.target.value === "Azeite Extra-Virgem") {
      this.setState({ categoryfilter: "Extra-Virgem" });
    }
    if (e.target.value === "Azeite Aromatizado") {
      this.setState({ categoryfilter: "Aromatizado" });
    }
    if (e.target.value === "Aguardente de Medronho") {
      this.setState({ categoryfilter: "Medronho" });
    }
    if (e.target.value === "Aguardente de Cereais") {
      this.setState({ categoryfilter: "Cereais" });
    }
    if (e.target.value === "Aguardente de Cana de Madeira") {
      this.setState({ categoryfilter: "Cana de Madeira" });
    }
    if (e.target.value === "Aguardente de Pera") {
      this.setState({ categoryfilter: "Pera" });
    }
    if (e.target.value === "Licor de Limoncello") {
      this.setState({ categoryfilter: "Limoncello" });
    }
    if (e.target.value === "Licor de Cafe") {
      this.setState({ categoryfilter: "Cafe" });
    }
    if (e.target.value === "Licor de Amendoas") {
      this.setState({ categoryfilter: "Amendoa" });
    }
    if (e.target.value === "Licor de Chocolate") {
      this.setState({ categoryfilter: "Chocolate" });
    }
  };

  getByCategory(category) {
    const { token, userId } = this.state;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (category === "Todos") {
      axios
        .get(`http://127.0.0.1:5000/products/producer/${userId}`, config)
        .then((res) => {
          const products = res.data;
          this.setState(products);
        });
    } else {
      if (
        category === "Branco" ||
        category === "Tinto" ||
        category === "Rose" ||
        category === "Espumante" ||
        category === "Virgem" ||
        category === "Extra-Virgem" ||
        category === "Aromatizado" ||
        category === "Cereais" ||
        category === "Medronho" ||
        category === "Cana de Madeira" ||
        category === "Pera" ||
        category === "Chocolate" ||
        category === "Amendoa" ||
        category === "Cafe" ||
        category === "Limoncello"
      ) {
        axios
          .get(
            `http://127.0.0.1:5000/products/${userId}/Category/${category}`,
            config
          )
          .then((res) => {
            const products = res.data;
            this.setState(products);
          });
      } else {
        axios
          .get(`http://127.0.0.1:5000/products/${userId}/${category}`, config)
          .then((res) => {
            const products = res.data;
            this.setState(products);
          });
      }
    }
  }

  handleName = (e) => {
    this.setState({ activeItemName: e.target.value });
  };

  handleType = (e) => {
    this.setState({ activeItemType: e.target.value });
  };

  handleQuantity = (e) => {
    this.setState({ activeItemQuantity: e.target.value });
  };

  handleValidity = (e) => {
    this.setState({ activeItemValidity: e.target.value });
  };

  handleHarvest = (e) => {
    this.setState({ activeItemHarvest: e.target.value });
  };

  handleCategory = (e) => {
    this.setState({ activeItemCategory: e.target.value });
  };

  handleAcidity = (e) => {
    this.setState({ activeItemAcidity: e.target.value });
  };

  handleAlcoholContent = (e) => {
    this.setState({ activeItemAlcoholContent: e.target.value });
  };

  handlePrice = (e) => {
    this.setState({ activeItemPrice: e.target.value });
  };

  handlePhoto = (e) => {
    this.setState({ activeItemPhoto: URL.createObjectURL(e.target.files[0]) });
  };

  handleStock = (e) => {
    this.setState({ activeItemStock: e.target.value });
  };

  handleSubmit(id) {
    const { token } = this.state;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .put(
        `http://127.0.0.1:5000/products/${id}`,
        {
          name: this.state.activeItemName,
          type: this.state.activeItemType,
          quantity: this.state.activeItemQuantity,
          validity: this.state.activeItemValidity,
          harvest: this.state.activeItemHarvest,
          category: this.state.activeItemCategory,
          acidity: this.state.activeItemAcidity,
          alcohol_content: this.state.activeItemAlcoholContent,
          price: this.state.activeItemPrice,
          photo: this.state.activeItemPhoto,
          stock: this.state.activeItemStock,
          id_producer: this.state.activeItemid_producer,
          logo_producer: this.state.activeItemlogo_producer,
          name_producer: this.state.activeItemname_producer,
        },
        config
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }

  handleCloseEdit = () => {
    this.setState({ showModalEditHoney: false });
    this.setState({ showModalEditFruit: false });
    this.setState({ showmodalEditJam: false });
    this.setState({ showModalEditOlive: false });
    this.setState({ showModalDelete: false });
  };

  delete(id) {
    const { token } = this.state;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.delete(`http://127.0.0.1:5000/products/${id}`, config).then((res) => {
      console.log(res);
      console.log(res.data);
    });
    window.location.reload();
  }

  modalDelete() {
    const { showModalDelete, activeItemName, activeItemID } = this.state;
    return (
      <Modal
        show={showModalDelete}
        onHide={this.handleCloseDelete}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>Pretende eliminar o produto {activeItemName}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCloseEdit}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => this.delete(activeItemID) && this.handleCloseEdit}
          >
            Apagar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  modalEditHoney() {
    const {
      showModalEditHoney,
      activeItemName,
      activeItemQuantity,
      activeItemStock,
      activeItemAlcoholContent,
      activeItemHarvest,
      activeItemID,
      activeItemPhoto,
      activeItemPrice,
      activeItemType,
      activeItemValidity,
    } = this.state;
    return (
      <Modal
        centered
        size="lg"
        show={showModalEditHoney}
        onHide={this.handleCloseEdit}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar dados do produto {activeItemName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col>
                <Form.Label>Nome </Form.Label>
                <Form.Control
                  id="nome"
                  defaultValue={activeItemName}
                  required
                  onChange={this.handleName}
                  type="text"
                  placeholder="Nome"
                />
              </Col>

              <Col>
                <Form.Label>Quantidade por garrafa (em ML) </Form.Label>
                <Form.Control
                  onChange={this.handleQuantity}
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
                  onChange={this.handleValidity}
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
                  onChange={this.handleHarvest}
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
              <Col>
                <Form.Label>Teor Alcóol </Form.Label>
                <Form.Control
                  required
                  onChange={this.handleAlcoholContent}
                  defaultValue={activeItemAlcoholContent}
                  id="teor"
                  min="0"
                  type="number"
                  placeholder="Teor de Alcóol"
                />
              </Col>
              <Col md={6}>
                <Form.Label>Preço </Form.Label>
                <Form.Control
                  required
                  onChange={this.handlePrice}
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
                <Form.Control
                  required
                  onChange={this.handleType}
                  as="select"
                  defaultValue={activeItemType}
                >
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
                  onChange={this.handleStock}
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
                      onChange={this.handlePhoto}
                      id="exampleFormControlFile1"
                      label="Inserir foto"
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col>
                <Image
                  height="120"
                  width="80"
                  className="padding_image"
                  src={activeItemPhoto}
                ></Image>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              {" "}
              <Button
                type="submit"
                onClick={() =>
                  this.handleSubmit(activeItemID) && this.handleCloseEdit
                }
                variant="primary"
                size="lg"
                block
              >
                Alterar
              </Button>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleCloseEdit} variant="secondary">
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  modalEditFruit() {
    const {
      showModalEditFruit,
      activeItemName,
      activeItemQuantity,
      activeItemStock,
      activeItemAlcoholContent,
      activeItemHarvest,
      activeItemID,
      activeItemPhoto,
      activeItemPrice,
      activeItemType,
      activeItemValidity,
    } = this.state;
    return (
      <Modal
        centered
        size="lg"
        show={showModalEditFruit}
        onHide={this.handleCloseEdit}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar dados do produto {activeItemName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <br />

            <Row>
              <Col md={4}></Col>
            </Row>
            <form onSubmit={this.handleSubmit}>
              <Row>
                <Col>
                  <Form.Label>Nome </Form.Label>
                  <Form.Control
                    id="nome"
                    required
                    defaultValue={activeItemName}
                    onChange={this.handleName}
                    type="text"
                    placeholder="Nome"
                  />
                </Col>

                <Col>
                  <Form.Label>Quantidade por garrafa (em ML) </Form.Label>
                  <Form.Control
                    required
                    onChange={this.handleQuantity}
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
                    onChange={this.handleValidity}
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
                    onChange={this.handleHarvest}
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
                <Col>
                  <Form.Label>Teor Alcóol </Form.Label>
                  <Form.Control
                    required
                    onChange={this.handleAlcoholContent}
                    defaultValue={activeItemAlcoholContent}
                    id="teor"
                    min="0"
                    type="number"
                    placeholder="Teor de Alcóol"
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Preço </Form.Label>
                  <Form.Control
                    required
                    onChange={this.handlePrice}
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
                  <Form.Control
                    required
                    onChange={this.handleType}
                    as="select"
                    defaultValue={activeItemType}
                  >
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
                    onChange={this.handleStock}
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
                        onChange={this.handlePhoto}
                        id="exampleFormControlFile1"
                        label="Inserir foto"
                      />
                    </Form.Group>
                  </Form>
                </Col>
                <Col>
                  <Image
                    height="120"
                    width="80"
                    className="padding_image"
                    src={activeItemPhoto}
                  ></Image>
                </Col>
              </Row>
              <Row style={{ marginTop: 20 }}>
                {" "}
                <Button
                  type="submit"
                  onClick={() =>
                    this.handleSubmit(activeItemID) && this.handleCloseEdit
                  }
                  variant="primary"
                  size="lg"
                  block
                >
                  Alterar
                </Button>
              </Row>
            </form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleCloseEdit} variant="secondary">
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  modalEditOlive() {
    const {
      showModalEditOlive,
      activeItemName,
      activeItemQuantity,
      activeItemStock,
      activeItemAcidity,
      activeItemHarvest,
      activeItemID,
      activeItemPhoto,
      activeItemPrice,
      activeItemType,
      activeItemValidity,
    } = this.state;
    return (
      <Modal
        centered
        size="lg"
        show={showModalEditOlive}
        onHide={this.handleCloseEdit}
        animation={true}
      >
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
            <form onSubmit={this.handleSubmit}>
              <Row>
                <Col>
                  <Form.Label>Nome </Form.Label>
                  <Form.Control
                    id="nome"
                    required
                    defaultValue={activeItemName}
                    onChange={this.handleName}
                    type="text"
                    placeholder="Nome"
                  />
                </Col>

                <Col>
                  <Form.Label>Quantidade por garrafa (em ML) </Form.Label>
                  <Form.Control
                    required
                    onChange={this.handleQuantity}
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
                    onChange={this.handleValidity}
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
                    onChange={this.handleHarvest}
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
                <Col>
                  <Form.Label>Acidez </Form.Label>
                  <Form.Control
                    onChange={this.handleAcidity}
                    defaultValue={activeItemAcidity}
                    required
                    min="0"
                    id="acidez"
                    type="number"
                    placeholder="Acidez"
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Preço </Form.Label>
                  <Form.Control
                    required
                    onChange={this.handlePrice}
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
                  <Form.Control
                    required
                    onChange={this.handleType}
                    as="select"
                    defaultValue={activeItemType}
                  >
                    <option>Virgem</option>
                    <option>Extra-Virgem</option>
                    <option>Aromatizado</option>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label>Quantidade de Stock </Form.Label>
                  <Form.Control
                    required
                    onChange={this.handleStock}
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
                        onChange={this.handlePhoto}
                        id="exampleFormControlFile1"
                        label="Inserir foto"
                      />
                    </Form.Group>
                  </Form>
                </Col>
                <Col>
                  <Image
                    height="120"
                    width="80"
                    className="padding_image"
                    src={activeItemPhoto}
                  ></Image>
                </Col>
              </Row>
              <Row style={{ marginTop: 20 }}>
                {" "}
                <Button
                  type="submit"
                  onClick={() =>
                    this.handleSubmit(activeItemID) && this.handleCloseEdit
                  }
                  variant="primary"
                  size="lg"
                  block
                >
                  Alterar
                </Button>
              </Row>
            </form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleCloseEdit} variant="secondary">
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  modalEditJam() {
    const {
      showmodalEditJam,
      activeItemName,
      activeItemQuantity,
      activeItemStock,
      activeItemAlcoholContent,
      activeItemHarvest,
      activeItemID,
      activeItemPhoto,
      activeItemPrice,
      activeItemType,
      activeItemValidity,
    } = this.state;
    return (
      <Modal
        centered
        size="lg"
        show={showmodalEditJam}
        onHide={this.handleCloseEdit}
        animation={true}
      >
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
            <form onSubmit={this.handleSubmit}>
              <Row>
                <Col>
                  <Form.Label>Nome </Form.Label>
                  <Form.Control
                    id="nome"
                    required
                    defaultValue={activeItemName}
                    onChange={this.handleName}
                    type="text"
                    placeholder="Nome"
                  />
                </Col>

                <Col>
                  <Form.Label>Quantidade por garrafa (em ML) </Form.Label>
                  <Form.Control
                    required
                    onChange={this.handleQuantity}
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
                    onChange={this.handleValidity}
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
                    onChange={this.handleHarvest}
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
                <Col>
                  <Form.Label>Teor Alcóol </Form.Label>
                  <Form.Control
                    required
                    onChange={this.handleAlcoholContent}
                    defaultValue={activeItemAlcoholContent}
                    id="teor"
                    min="0"
                    type="number"
                    placeholder="Teor de Alcóol"
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Preço </Form.Label>
                  <Form.Control
                    required
                    onChange={this.handlePrice}
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
                  <Form.Control
                    required
                    onChange={this.handleType}
                    as="select"
                    defaultValue={activeItemType}
                  >
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
                    onChange={this.handleStock}
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
                        onChange={this.handlePhoto}
                        id="exampleFormControlFile1"
                        label="Inserir foto"
                      />
                    </Form.Group>
                  </Form>
                </Col>
                <Col>
                  <Image
                    height="120"
                    width="80"
                    className="padding_image"
                    src={activeItemPhoto}
                  ></Image>
                </Col>
              </Row>
              <Row style={{ marginTop: 20 }}>
                {" "}
                <Button
                  type="submit"
                  onClick={() =>
                    this.handleSubmit(activeItemID) && this.handleCloseEdit
                  }
                  variant="primary"
                  size="lg"
                  block
                >
                  Alterar
                </Button>
              </Row>
            </form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleCloseEdit} variant="secondary">
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  editSearch = (e) => {
    this.setState({
      searched: true,
      searchTerm: e.target.value,
    });
  };

  search = () => {
    const {
      searchTerm,
      products,
      showModalDelete,
      showmodalEditJam,
      showModalEditOlive,
      showModalEditFruit,
      showModalEditHoney,
    } = this.state;

    const name = Object.values(products).filter((a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (name.length !== 0) {
      return name.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.quantity}</td>
            <td>{item.validity}</td>
            <td>{item.harvest}</td>
            <td>{item.type}</td>
            <td>{item.alcohol_content}</td>
            <td>{item.acidity}</td>
            <td>{item.price}</td>
            <td>
              <Image height="60" width="50" src={item.photo}></Image>
            </td>
            <td>{item.stock}</td>
            <td>
              <AiFillEdit
                onClick={() => this.handleShowEdit(item)}
                size="25"
                style={{ color: "444903" }}
              />
              {showModalEditHoney ? this.modalEditHoney() : false}
              {showModalEditFruit ? this.modalEditFruit() : false}
              {showModalEditOlive ? this.modalEditOlive() : false}
              {showmodalEditJam ? this.modalEditJam() : false}
            </td>
            <td>
              <AiFillDelete
                onClick={() => this.handleShowDelete(item)}
                size="25"
                style={{ color: "444903" }}
              />
              {showModalDelete ? this.modalDelete() : false}
            </td>
          </tr>
        );
      });
    }
  };

  render() {
    const {
      categoryfilter,
      searchTerm,
      products,
      showModalEditHoney,
      showmodalEditJam,
      showModalEditOlive,
      showModalEditFruit,
      showModalDelete,
      name,
    } = this.state;
    /* if( type != "producer" ){
          return (
              <Redirect to="/nopermissions" />
          );
      } */
/*     return (
      <div>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row style={{ marginTop: 35 }}>
            <Col sm={1}></Col>
            <Col sm={6}>
              {" "}
              <h1 style={{ color: "#AAAA74" }}>Produtos de {name}</h1>
            </Col>
            <Col sm={4}>
              <InputGroup>
                <FormControl
                  type="text"
                  value={searchTerm}
                  onChange={this.editSearch}
                  placeholder="Procurar Produto"
                />
              </InputGroup>
              <br></br>
              <Form.Label>Filtrar por Categoria </Form.Label>
              <Form.Control
                style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
                size="sm"
                required
                onChange={this.handleCategoryFilter}
                onClick={() => this.getByCategory(categoryfilter)}
                as="select"
              >
                <option
                  style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
                >
                  Todos os Produtos
                </option>
                <option
                  style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
                >
                  Todos os Vinhos
                </option>
                <option>Vinho Branco</option>
                <option>Vinho Tinto</option>
                <option>Vinho Rose</option>
                <option>Vinho Espumante</option>
                <option
                  style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
                >
                  Todos os Azeites
                </option>
                <option>Azeite Virgem</option>
                <option>Azeite Extra-Virgem</option>
                <option>Azeite Aromatizado</option>
                <option
                  style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
                >
                  Todos os Licores
                </option>
                <option>Licor de Limoncello</option>
                <option>Licor de Cafe</option>
                <option>Licor de Amendoas</option>
                <option>Licor de Chocolate</option>
                <option
                  style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
                >
                  Todas as Aguardentes
                </option>
                <option>Aguardente de Medronho</option>
                <option>Aguardente de Cereais</option>
                <option>Aguardente de Cana de Madeira</option>
                <option>Aguardente de Pera</option>
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
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <thead style={{ width: 10 }}>
                  <tr>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Quantidade</th>
                    <th>Validade</th>
                    <th>Data de Colheita</th>
                    <th>Tipo</th>
                    <th>Teor de Alcóol</th>
                    <th>Acidez</th>
                    <th>Preço</th>
                    <th>Foto</th>
                    <th>Stock</th>
                    <th>
                      {" "}
                      <Button href="/createproduct">
                        {" "}
                        Adicionar Novo Produto
                      </Button>{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="9">Não existem produtos </td>
                    </tr>
                  )}
                  {searchTerm === ""
                    ? products.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                            <td>{item.validity}</td>
                            <td>{item.harvest}</td>
                            <td>{item.type}</td>
                            <td>{item.alcohol_content}</td>
                            <td>{item.acidity}</td>
                            <td>{item.price}</td>
                            <td>
                              <Image
                                height="60"
                                width="50"
                                src={item.photo}
                              ></Image>
                            </td>
                            <td>{item.stock}</td>
                            <td>
                              <AiFillEdit
                                onClick={() => this.handleShowEdit(item)}
                                size="25"
                                style={{ color: "444903" }}
                              />
                              {showModalEditHoney
                                ? this.modalEditHoney()
                                : false}
                              {showModalEditFruit ? this.modalEditFruit() : false}
                              {showModalEditOlive
                                ? this.modalEditOlive()
                                : false}
                              {showmodalEditJam
                                ? this.modalEditJam()
                                : false}
                            </td>
                            <td>
                              <AiFillDelete
                                onClick={() => this.handleShowDelete(item)}
                                size="25"
                                style={{ color: "444903" }}
                              />

                              {showModalDelete ? this.modalDelete() : false}
                            </td>
                          </tr>
                        );
                      })
                    : this.search()}
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
    );
  }
}

export default TableProductsofProducer;
 */
