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

/*import { Redirect } from "react-router-dom";*/

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
	acidity: string;
	alcohol_content: string;
	price: string;
	photo: string;
	stock: string;
	id_producer: string;
	logo_producer: string;
	name_producer: string;
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
		/*     const { token } = this.state;
		 */
		const config = {
			/*  headers: { Authorization: `Bearer ${token}` }, */
		};

		axios
			.put(
				`http://127.0.0.1:5000/products/${id}`,
				/* {
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
        }, */
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
		/* const { token } = this.state; */

		const config = {
			/* headers: { Authorization: `Bearer ${token}` }, */
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

		if (e.target.value === 'Todos os Vinhos') {
			setCategoryfilter('Vinho');
		}
		if (e.target.value === 'Todos os Azeites') {
			setCategoryfilter('Azeite');
		}
		if (e.target.value === 'Todos os Licores') {
			setCategoryfilter('Licor');
		}
		if (e.target.value === 'Todas as Aguardentes') {
			setCategoryfilter('Aguardente');
		}
		if (e.target.value === 'Vinho Branco') {
			setCategoryfilter('Branco');
		}
		if (e.target.value === 'Vinho Tinto') {
			setCategoryfilter('Tinto');
		}
		if (e.target.value === 'Vinho Rose') {
			setCategoryfilter('Rose');
		}
		if (e.target.value === 'Vinho Espumante') {
			setCategoryfilter('Espumante');
		}
		if (e.target.value === 'Azeite Virgem') {
			setCategoryfilter('Virgem');
		}
		if (e.target.value === 'Azeite Extra-Virgem') {
			setCategoryfilter('Extra-Virgem');
		}
		if (e.target.value === 'Azeite Aromatizado') {
			setCategoryfilter('Aromatizado');
		}
		if (e.target.value === 'Aguardente de Medronho') {
			setCategoryfilter('Medronho');
		}
		if (e.target.value === 'Aguardente de Cereais') {
			setCategoryfilter('Cereais');
		}
		if (e.target.value === 'Aguardente de Cana de Madeira') {
			setCategoryfilter('Cana de Madeira');
		}
		if (e.target.value === 'Aguardente de Pera') {
			setCategoryfilter('Pera');
		}
		if (e.target.value === 'Licor de Limoncello') {
			setCategoryfilter('Limoncello');
		}
		if (e.target.value === 'Licor de Cafe') {
			setCategoryfilter('Cafe');
		}
		if (e.target.value === 'Licor de Amendoas') {
			setCategoryfilter('Amendoa');
		}
		if (e.target.value === 'Licor de Chocolate') {
			setCategoryfilter('Chocolate');
		}
	};

	const getByCategory = (category: string) => {
		/*  const { token } = this.state; */

		const config = {
			/*   headers: { Authorization: `Bearer ${token}` }, */
		};

		if (category === 'Todos') {
			axios.get(`http://127.0.0.1:5000/productslist`, config).then((res) => {
				const products = res.data;
				setProducts(products);
			});
		} else {
			if (
				category === 'Branco' ||
				category === 'Tinto' ||
				category === 'Rose' ||
				category === 'Espumante' ||
				category === 'Virgem' ||
				category === 'Extra-Virgem' ||
				category === 'Aromatizado' ||
				category === 'Cereais' ||
				category === 'Medronho' ||
				category === 'Cana de Madeira' ||
				category === 'Pera' ||
				category === 'Chocolate' ||
				category === 'Amendoa' ||
				category === 'Cafe' ||
				category === 'Limoncello'
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
					<Modal.Title>Eliminar Produto</Modal.Title>
				</Modal.Header>
				<Modal.Body>Pretende eliminar o produto {activeItemName}?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseEdit}>
						Cancelar
					</Button>
					<Button
						variant="primary"
						type="submit"
						/*             onClick={() => delete(activeItemID) && handleCloseEdit}
						 */
					>
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
					<Modal.Title>Editar dados do produto {activeItemName}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{/* <Form onSubmit={handleSubmit}> */}
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
						{' '}
						<Button
							type="submit"
							/* onClick={() =>
                handleSubmit(activeItemID) && handleCloseEdit
                } */
							variant="primary"
							size="lg"
							block
						>
							Alterar
						</Button>
					</Row>
					{/*  </Form> */}
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
					<Modal.Title>Editar dados do produto {activeItemName}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<br />

						<Row>
							<Col md={4}></Col>
						</Row>
						{/* <form onSubmit={handleSubmit}> */}
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
							{' '}
							<Button
								type="submit"
								/* onClick={() =>
                     handleSubmit(activeItemID) && handleCloseEdit
                   } */
								variant="primary"
								size="lg"
								block
							>
								Alterar
							</Button>
						</Row>
						{/* </form> */}
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
					<Modal.Title>Editar dados do produto {activeItemName} </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<Row></Row>
						<br />

						<Row>
							<Col md={4}></Col>
						</Row>
						{/*  <form onSubmit={handleSubmit}> */}
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
								/* onClick={() =>
                     handleSubmit(activeItemID) && handleCloseEdit
                   } */
								variant="primary"
								size="lg"
								block
							>
								Alterar
							</Button>
						</Row>
						{/* </form> */}
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
					<Modal.Title>Editar dados do produto {activeItemName} </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<br />

						<Row>
							<Col md={4}></Col>
						</Row>
						{/* <form onSubmit={handleSubmit}> */}
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
								<Form.Label>Acidez </Form.Label>
								<Form.Control
									onChange={handleAcidity}
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
							{' '}
							<Button
								type="submit"
								/* onClick={() =>
                     handleSubmit(activeItemID) && handleCloseEdit
                   } */
								variant="primary"
								size="lg"
								block
							>
								Alterar
							</Button>
						</Row>
						{/* </form> */}
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
							<td>{item.name_producer}</td>
							<td>{item.name}</td>
							<td>{item.category}</td>
							<td>{item.quantity}</td>
							<td>{item.validity}</td>
							<td>{item.harvest}</td>
							<td>{item.type}</td>
							<td>{item.alcohol_content} </td>
							<td>{item.acidity}</td>
							<td>{item.stock}</td>
							<td>{item.price}</td>
							<td>
								<Image height="60" width="50" src={item.photo}></Image>
							</td>
							<td>
								<AiFillEdit
									onClick={() => handleShowEdit(item)}
									size="25"
									style={{ color: '444903' }}
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
									style={{ color: '#444903' }}
								/>
								{showModalDelete ? modalDelete() : false}
							</td>
						</tr>
					);
				});
			}
		}
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
										{
											/* searchTerm === ""
                    ? */ products !== undefined &&
												products?.map((item) => {
													return (
														<tr>
															<td>{item.name_producer}</td>
															<td>{item.name}</td>
															<td>{item.category}</td>
															<td>{item.quantity}</td>
															<td>{item.validity}</td>
															<td>{item.harvest}</td>
															<td>{item.type}</td>
															<td>{item.alcohol_content} </td>
															<td>{item.acidity}</td>
															<td>{item.stock}</td>
															<td>{item.price}</td>
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
											/* :  search()  false */
										}
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

/* class TableProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      showModalEditAguardente: false,
      showModalEditLicor: false,
      showModalEditWine: false,
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
    const { token } = this.state;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.get(`http://127.0.0.1:5000/productslist`, config).then((res) => {
      const products = res.data;
      this.setState({ products });
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
      this.setState({ showModalEditAguardente: true });
    }

    if (item.category === "Licor") {
      this.setState({ showModalEditLicor: true });
    }

    if (item.category === "Vinho") {
      this.setState({ showModalEditWine: true });
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
    this.setState({ showModalEditAguardente: false });
    this.setState({ showModalEditWine: false });
    this.setState({ showModalEditLicor: false });
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
    const { token } = this.state;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (category === "Todos") {
      axios.get(`http://127.0.0.1:5000/productslist`, config).then((res) => {
        const products = res.data;
        this.setState({ products });
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
          .get(`http://127.0.0.1:5000/products/type/${category}`, config)
          .then((res) => {
            const products = res.data;
            this.setState(products);
          });
      } else {
        axios
          .get(`http://127.0.0.1:5000/products/category/${category}`, config)
          .then((res) => {
            const products = res.data;
            this.setState(products);
          });
      }
    }
  }

  modalDelete() {
    const { showModalDelete, activeItemName, activeItemID } = this.state;
    return (
      <Modal
        show={showModalDelete}
        size="lg"
        onHide={this.handleCloseEdit}
        animation={true}
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
            type="submit"
            onClick={() => this.delete(activeItemID) && this.handleCloseEdit}
          >
            Apagar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  modalEditAguardente() {
    const {
      showModalEditAguardente,
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
        show={showModalEditAguardente}
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

  modalEditWine() {
    const {
      showModalEditWine,
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
        show={showModalEditWine}
        centered
        size="lg"
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
          <Button variant="primary" onClick={this.handleCloseEdit}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  modalEditLicor() {
    const {
      showModalEditLicor,
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
        show={showModalEditLicor}
        centered
        size="lg"
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
        show={showModalEditOlive}
        onHide={this.handleCloseEdit}
        centered
        size="lg"
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar dados do produto {activeItemName} </Modal.Title>
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
      showModalEditLicor,
      showModalEditOlive,
      showModalEditWine,
      showModalEditAguardente,
    } = this.state;

    const name = Object.values(products).filter((a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (name.length !== 0) {
      return name.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.name_producer}</td>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.quantity}</td>
            <td>{item.validity}</td>
            <td>{item.harvest}</td>
            <td>{item.type}</td>
            <td>{item.alcohol_content} </td>
            <td>{item.acidity}</td>
            <td>{item.stock}</td>
            <td>{item.price}</td>
            <td>
              <Image height="60" width="50" src={item.photo}></Image>
            </td>
            <td>
              <AiFillEdit
                onClick={() => this.handleShowEdit(item)}
                size="25"
                style={{ color: "444903" }}
              />
              {showModalEditAguardente ? this.modalEditAguardente() : false}
              {showModalEditWine ? this.modalEditWine() : false}
              {showModalEditOlive ? this.modalEditOlive() : false}
              {showModalEditLicor ? this.modalEditLicor() : false}
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
      showModalDelete,
      showModalEditLicor,
      showModalEditOlive,
      showModalEditWine,
      showModalEditAguardente,
    } = this.state; */
/* if( type != "admin" ){
          return (
              <Redirect to="/nopermissions" />
          );
      } */
/* return (
      <div>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row style={{ marginTop: 35 }}>
            <Col sm={1}></Col>
            <Col sm={6}>
              {" "}
              <h1 style={{ color: "#AAAA74" }}>Lista de Produtos</h1>
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
              <Form.Label>Filtar por Categoria </Form.Label>
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
                hover
                responsive="sm"
                style={{
                  marginTop: 26,
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <thead style={{ width: 10 }}>
                  <tr>
                    <th>Produtor</th>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Quantidade</th>
                    <th>Validade</th>
                    <th>Colheita</th>
                    <th>Tipo</th>
                    <th>Teor de Alcóol</th>
                    <th>Acidez</th>
                    <th>Stock</th>
                    <th>Preco</th>
                    <th>Foto</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="9">Não existem produtos </td>
                    </tr>
                  )}
                  {searchTerm === ""
                    ? products.map((item) => {
                        return (
                          <tr>
                            <td>{item.name_producer}</td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                            <td>{item.validity}</td>
                            <td>{item.harvest}</td>
                            <td>{item.type}</td>
                            <td>{item.alcohol_content} </td>
                            <td>{item.acidity}</td>
                            <td>{item.stock}</td>
                            <td>{item.price}</td>
                            <td>
                              <Image
                                height="60"
                                width="50"
                                src={item.photo}
                              ></Image>
                            </td>
                            <td>
                              <AiFillEdit
                                onClick={() => this.handleShowEdit(item)}
                                size="25"
                                style={{ color: "444903" }}
                              />
                              {showModalEditAguardente
                                ? this.modalEditAguardente()
                                : false}
                              {showModalEditWine ? this.modalEditWine() : false}
                              {showModalEditOlive
                                ? this.modalEditOlive()
                                : false}
                              {showModalEditLicor
                                ? this.modalEditLicor()
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

            <Col sm={1} />
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

export default TableProducts;
 */
