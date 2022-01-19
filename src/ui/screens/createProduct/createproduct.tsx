import React, { useState } from 'react';
import axios from 'axios';
import { Card, Accordion, Row, Col, Button, Container, Spinner, Form, Image, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';

interface ProductsList {
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
	id_producer: { $oid: string };
	logo_producer: string;
	name_producer: string;
}

export const CreateProduct: React.FC = () => {
	const Spacer = require('react-spacer');

	const [isLoading, setIsLoading] = useState(false);
	const [isLogged, setIsLogged] = useState(false);
	const [showModalOptions, setShowModalOptions] = useState(false);
	const [products, setProducts] = useState<ProductsList[]>();
	const [price, setPrice] = useState('1,29');
	const [logo_producer, setLogo_producer] = useState('');
	const [name, setName] = useState('Alheira');
	const [category, setCategory] = useState('Enchidos e carne');
	const [harvest, setHarvest] = useState('');
	const [validity, setValidity] = useState('10-12-2026');
	const [quantity, setQuantity] = useState('500g');
	const [id, setId] = useState(1);
	const [photoURL, setPhotoURL] = useState('');
	const [type, setType] = useState('');
	const [acidity, setAcidity] = useState('');
	const [stock, setStock] = useState('');
	const [alcohol_content, setAlcohol_Content] = useState('');
	const [name_producer, setName_producer] = useState('');

	const token = useSelector((state: StoreState) => state.common.user.token);

	const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
		setType(e.target.value);
	};

	const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuantity(e.target.value);
	};

	const handleValidity = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValidity(e.target.value);
	};

	const handleHarvest = (e: React.ChangeEvent<HTMLInputElement>) => {
		setHarvest(e.target.value);
	};

	const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCategory(e.target.value);
	};

	const handleAcidity = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAcidity(e.target.value);
	};

	const handleAlcoholContent = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAlcohol_Content(e.target.value);
	};

	const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPrice(e.target.value);
	};

	const handlePhotoBrandy = (e: React.ChangeEvent<HTMLInputElement>) => {
		const data = new FormData();
		/*  data.append("file", uploadInput0.files[0]); */
		data.append('filename', '');

		fetch('http://127.0.0.1:5000/upload', {
			method: 'POST',
			body: data,
		}).then((response) => {
			response.json().then((fileurl) => {
				setPhotoURL(`http://127.0.0.1:5000/${fileurl}`);
			});
		});
	};

	const handlePhotoWine = (e: React.ChangeEvent<HTMLInputElement>) => {
		const data = new FormData();
		/*      data.append("file", uploadInput1.files[0]); */
		data.append('filename', '');

		fetch('http://127.0.0.1:5000/upload', {
			method: 'POST',
			body: data,
		}).then((response) => {
			response.json().then((fileurl) => {
				setPhotoURL(`http://127.0.0.1:5000/${fileurl}`);
			});
		});
	};

	const handlePhotoOlive = (e: React.ChangeEvent<HTMLInputElement>) => {
		const data = new FormData();
		/* data.append("file", uploadInput2.files[0]); */
		data.append('filename', '');

		fetch('http://127.0.0.1:5000/upload', {
			method: 'POST',
			body: data,
		}).then((response) => {
			response.json().then((fileurl) => {
				setPhotoURL(`http://127.0.0.1:5000/${fileurl}`);
			});
		});
	};

	const handlePhotoLicor = (e: React.ChangeEvent<HTMLInputElement>) => {
		const data = new FormData();
		/*   data.append("file", this.uploadInput3.files[0]); */
		data.append('filename', '');

		fetch('http://127.0.0.1:5000/upload', {
			method: 'POST',
			body: data,
		}).then((response) => {
			response.json().then((fileurl) => {
				setPhotoURL(`http://127.0.0.1:5000/${fileurl}`);
			});
		});
	};

	const handleStock = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStock(e.target.value);
	};

	const handleCategoryWine = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCategory('Vinho');
	};

	const handleCategoryOlive = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCategory('Azeite');
	};

	const handleCategoryBrandy = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCategory('Aguardente');
	};

	const handleCategoryLicor = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCategory('Licor');
	};

	const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setShowModalOptions(true);
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		axios
			.post(
				`http://127.0.0.1:5000/products`,
				{
					name: name,
					type: type,
					quantity: quantity,
					validity: validity,
					harvest: harvest,
					category: category,
					acidity: acidity,
					alcohol_content: alcohol_content,
					price: price,
					photo: photoURL,
					stock: stock,
					id_producer: id,
					logo_producer: logo_producer,
					name_producer: name_producer,
				},
				config
			)
			.then((res) => {
				console.log(res);
				console.log(res.data);
			});
	};

	const handleModalOptions = () => {
		setShowModalOptions(true);
	};

	const handleCloseEdit = () => {
		setShowModalOptions(false);
	};

	/*  const checkPermissions = () => {
      if ((isLogged === false || type !== "client") && isLoading === false) {
        return <Redirect to="/nopermissions" />;
      }
    }; */

	const load = () => {
		if (isLoading === false) {
			return (
				<Spinner
					animation="border"
					variant="success"
					style={{
						marginTop: 25,
						marginBottom: 108,
						alignItems: 'center',
						justifyContent: 'center',
						display: 'flex',
					}}
				/>
			);
		}
	};

	const modalOptions = () => {
		return (
			<Modal size="lg" show={showModalOptions} animation={true}>
				<Modal.Header>
					<Modal.Title>O produto {name} foi adicionado com Sucesso!</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col md={6}>
							<Button href="/productlistproducer" variant="secondary">
								Voltar à lista de Produtos
							</Button>
						</Col>

						<Col md={6}>
							<Button href="/createproduct" variant="primary">
								Adicionar outro Produto
							</Button>
						</Col>
					</Row>
				</Modal.Body>
			</Modal>
		);
	};

	return (
		<>
			<div>
				<Container
					style={{
						backgroundImage:
							'url(https://images.pexels.com/photos/2954929/pexels-photo-2954929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
					}}
					fluid
				>
					<Accordion>
						<Row>
							<Col sm={2} />
							<Col style={{ marginTop: 30, fontFamily: 'artifika' }}>
								<Card>
									<Card.Header style={{ backgroundColor: '#9B3939' }}>
										<Accordion.Toggle
											as={Button}
											variant="link"
											eventKey="0"
											style={{ color: 'white' }}
										>
											<h2>Adicionar Vinho</h2>
										</Accordion.Toggle>
									</Card.Header>
									<Accordion.Collapse eventKey="0" style={{ color: 'black', fontFamily: 'artifika' }}>
										<Card.Body>
											<Container>
												<Row>
													<Col>
														<h4>
															Preencha os seguintes campos para adicionar um novo vinho :
														</h4>
													</Col>
												</Row>
												<br />
												<Row>
													<Col md={4}></Col>
												</Row>
												{/*    <form onSubmit={handleSubmit}> */}
												<Row>
													<Col>
														<Form.Label>Nome </Form.Label>
														<Form.Control
															id="nome"
															required
															onChange={handleName}
															type="text"
															placeholder="Nome"
														/>
													</Col>

													<Col>
														<Form.Label>Quantidade por garrafa (em ML )</Form.Label>
														<Form.Control
															required
															onChange={handleQuantity}
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
														<Form.Control required onChange={handleType} as="select">
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
															{/* <form onChange={handlePhotoWine}> */}
															<div>
																<input
																	ref={(ref) => {
																		/*  uploadInput1 = ref; */
																	}}
																	type="file"
																/>
															</div>

															<br />
															{/*    </form> */}
														</Form>
													</Col>
													<Col>
														<Image
															height="120"
															width="80"
															className="padding_image"
															src={photoURL}
														></Image>
													</Col>
												</Row>
												<Row style={{ marginTop: 20 }}>
													{' '}
													<Button
														type="submit"
														/* onClick={() =>
                                handleCategoryWine() &&
                                handleModalOptions
                              } */
														variant="primary"
														size="lg"
														block
													>
														Adicionar
														{showModalOptions ? modalOptions() : false}
													</Button>
												</Row>
												{/*                         </form>
												 */}{' '}
											</Container>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
								<Card>
									<Card.Header style={{ backgroundColor: 'white' }}>
										<Accordion.Toggle
											as={Button}
											variant="link"
											eventKey="1"
											style={{ color: '#9B3939' }}
										>
											<h2>Adicionar Azeite</h2>
										</Accordion.Toggle>
									</Card.Header>
									<Accordion.Collapse eventKey="1" style={{ color: 'black' }}>
										<Card.Body>
											<Container>
												<Row>
													<Col>
														<h4>
															Preencha os seguintes campos para adicionar um novo azeite :
														</h4>
													</Col>
												</Row>
												<br />

												<Row>
													<Col md={4}></Col>
												</Row>

												{/* <Form onSubmit={handleSubmit}> */}
												<Row>
													<Col>
														<Form.Label>Nome </Form.Label>
														<Form.Control
															id="nome"
															required
															onChange={handleName}
															type="text"
															placeholder="Nome"
														/>
													</Col>

													<Col>
														<Form.Label>Quantidade por garrafa em (ml)</Form.Label>
														<Form.Control
															onChange={handleQuantity}
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
														<Form.Control required onChange={handleType} as="select">
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
															{/*  <form onChange={handlePhotoOlive} >*/}
															<div>
																<input
																	ref={(ref) => {
																		/*  uploadInput2 = ref; */
																	}}
																	type="file"
																/>
															</div>

															<br />
															{/*  </form> */}
														</Form>
													</Col>
													<Col>
														<Image
															height="120"
															width="80"
															className="padding_image"
															src={photoURL}
														></Image>
													</Col>
												</Row>
												<Row style={{ marginTop: 20 }}>
													{' '}
													<Button
														type="submit"
														/*   onClick={handleCategoryOlive} */
														variant="primary"
														size="lg"
														block
													>
														Adicionar
													</Button>
												</Row>
												{/*    </Form> */}
											</Container>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
								<Card>
									<Card.Header style={{ backgroundColor: '#9B3939' }}>
										<Accordion.Toggle
											as={Button}
											variant="link"
											eventKey="2"
											style={{ color: 'white' }}
										>
											<h2>Adicionar Aguardente</h2>
										</Accordion.Toggle>
									</Card.Header>
									<Accordion.Collapse eventKey="2" style={{ color: 'black' }}>
										<Card.Body>
											<Container>
												<Row>
													<Col>
														<h4>
															Preencha os seguintes campos para adicionar uma nova
															Aguardente :
														</h4>
													</Col>
												</Row>
												<br />

												<Row>
													<Col md={4}></Col>
												</Row>

												{/* <Form onSubmit={handleSubmit}> */}
												<Row>
													<Col>
														<Form.Label>Nome </Form.Label>
														<Form.Control
															id="nome"
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
														<Form.Control required onChange={handleType} as="select">
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
															{/* <form onChange={handlePhotoBrandy}> */}
															<div>
																<input
																	ref={(ref) => {
																		/*  uploadInput0 = ref; */
																	}}
																	type="file"
																/>
															</div>

															<br />
															{/*  </form> */}
														</Form>
													</Col>
													<Col>
														<Image
															height="120"
															width="80"
															className="padding_image"
															src={photoURL}
														></Image>
													</Col>
												</Row>
												<Row style={{ marginTop: 20 }}>
													{' '}
													<Button
														type="submit"
														/* onClick={handleCategoryBrandy} */
														variant="primary"
														size="lg"
														block
													>
														Adicionar
													</Button>
												</Row>
												{/*   </Form> */}
											</Container>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
								<Card>
									<Card.Header style={{ backgroundColor: 'white' }}>
										<Accordion.Toggle
											as={Button}
											variant="link"
											eventKey="3"
											style={{ color: '#9B3939' }}
										>
											<h2>Adicionar Licor</h2>
										</Accordion.Toggle>
									</Card.Header>
									<Accordion.Collapse eventKey="3" style={{ color: 'black' }}>
										<Card.Body>
											<Container>
												<Row>
													<Col>
														<h4>
															Preencha os seguintes campos para adicionar um novo licor :
														</h4>
													</Col>
												</Row>
												<br />

												<Row>
													<Col md={4}></Col>
												</Row>

												{/*  <Form onSubmit={handleSubmit}> */}
												<Row>
													<Col>
														<Form.Label>Nome </Form.Label>
														<Form.Control
															id="nome"
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
														<Form.Control required onChange={handleType} as="select">
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
														{/*   <form onChange={handlePhotoLicor}> */}
														<div>
															<input
																ref={(ref) => {
																	/*  uploadInput3 = ref; */
																}}
																type="file"
															/>
														</div>

														<br />
														{/* </form> */}
													</Col>
													<Col>
														<Image
															height="120"
															width="80"
															className="padding_image"
															src={photoURL}
														></Image>
													</Col>
												</Row>
												<Row style={{ marginTop: 20 }}>
													{' '}
													<Button
														type="submit"
														/*   onClick={handleCategoryLicor} */
														variant="primary"
														size="lg"
														block
													>
														Adicionar
													</Button>
												</Row>
												{/*   </Form> */}
											</Container>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Col>
							<Col sm={2} />
						</Row>
					</Accordion>
					<br></br>
				</Container>
			</div>
		</>
	);
};

/* class CreateProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      name: "",
      type: "",
      quantity: "",
      validity: "",
      harvest: "",
      category: "",
      acidity: "",
      alcohol_content: "",
      price: "",
      photo: null,
      stock: "",
      id_producer: "",
      logo_producer: "",
      name_producer: "",
      showModalOptions: false,
      photoURL: "",
      isLoading: false,
    };
  }

  async componentDidMount() {
    let token = await localStorage.getItem("token");
    let type_client = await localStorage.getItem("type");
    let userId = await localStorage.getItem("userId");
    let name_producer = await localStorage.getItem("name");

    if (token !== null) {
      this.setState({
        isLogged: true,
        token,
        type_client,
        userId,
        name_producer,
        isLoading: true,
      });
    }
  }

  handleName = (e) => {
    this.setState({ name: e.target.value });
  };

  handleType = (e) => {
    this.setState({ type: e.target.value });
  };

  handleQuantity = (e) => {
    this.setState({ quantity: e.target.value });
  };

  handleValidity = (e) => {
    this.setState({ validity: e.target.value });
  };

  handleHarvest = (e) => {
    this.setState({ harvest: e.target.value });
  };

  handleCategory = (e) => {
    this.setState({ category: e.target.value });
  };

  handleAcidity = (e) => {
    this.setState({ acidity: e.target.value });
  };

  handleAlcoholContent = (e) => {
    this.setState({ alcohol_content: e.target.value });
  };

  handlePrice = (e) => {
    this.setState({ price: e.target.value });
  };

  handlePhotoBrandy = (e) => {
    const data = new FormData();
    data.append("file", this.uploadInput0.files[0]);
    data.append("filename", "");

    fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: data,
    }).then((response) => {
      response.json().then((fileurl) => {
        this.setState({ photoURL: `http://127.0.0.1:5000/${fileurl}` });
      });
    });
  };

  handlePhotoWine = (e) => {
    const data = new FormData();
    data.append("file", this.uploadInput1.files[0]);
    data.append("filename", "");

    fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: data,
    }).then((response) => {
      response.json().then((fileurl) => {
        this.setState({ photoURL: `http://127.0.0.1:5000/${fileurl}` });
      });
    });
  };
  handlePhotoOlive = (e) => {
    const data = new FormData();
    data.append("file", this.uploadInput2.files[0]);
    data.append("filename", "");

    fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: data,
    }).then((response) => {
      response.json().then((fileurl) => {
        this.setState({ photoURL: `http://127.0.0.1:5000/${fileurl}` });
      });
    });
  };
  handlePhotoLicor = (e) => {
    const data = new FormData();
    data.append("file", this.uploadInput3.files[0]);
    data.append("filename", "");

    fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: data,
    }).then((response) => {
      response.json().then((fileurl) => {
        this.setState({ photoURL: `http://127.0.0.1:5000/${fileurl}` });
      });
    });
  };

  handleStock = (e) => {
    this.setState({ stock: e.target.value });
  };

  handleCategoryWine = (e) => {
    this.setState({ category: "Vinho" });
  };

  handleCategoryOlive = (e) => {
    this.setState({ category: "Azeite" });
  };

  handleCategoryBrandy = (e) => {
    this.setState({ category: "Aguardente" });
  };

  handleCategoryLicor = (e) => {
    this.setState({ category: "Licor" });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ showModalOptions: true });

    const { token, userId, name_producer } = this.state;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(
        `http://127.0.0.1:5000/products`,
        {
          name: this.state.name,
          type: this.state.type,
          quantity: this.state.quantity,
          validity: this.state.validity,
          harvest: this.state.harvest,
          category: this.state.category,
          acidity: this.state.acidity,
          alcohol_content: this.state.alcohol_content,
          price: this.state.price,
          photo: this.state.photoURL,
          stock: this.state.stock,
          id_producer: userId,
          logo_producer: this.state.logo_producer,
          name_producer: name_producer,
        },
        config
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  handleModalOptions = () => {
    this.setState({ showModalOptions: true });
  };

  handleCloseEdit = () => {
    this.setState({ showModalOptions: false });
  };

  checkPermissions = () => {
    const { isLogged, isLoading, type } = this.state;
    if ((isLogged === false || type !== "client") && isLoading === false) {
      return <Redirect to="/nopermissions" />;
    }
  };

  load = () => {
    const { isLoading } = this.state;
    if (isLoading === false) {
      return (
        <Spinner
          animation="border"
          variant="success"
          style={{
            marginTop: 25,
            marginBottom: 108,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        />
      );
    }
  };

  modalOptions() {
    const { showModalOptions, name } = this.state;
    return (
      <Modal size="md" show={showModalOptions} animation={true}>
        <Modal.Header>
          <Modal.Title>
            O produto {name} foi adicionado com Sucesso!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Button href="/productlistproducer" variant="secondary">
                Voltar à lista de Produtos
              </Button>
            </Col>

            <Col md={6}>
              <Button href="/createproduct" variant="primary">
                Adicionar outro Produto
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }

  render() {
    const { showModalOptions, photoURL } = this.state;
    this.load();
    this.checkPermissions();

    return (
      <div>
        <Container
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/2954929/pexels-photo-2954929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
          }}
          fluid
        >
          <Accordion>
            <Row>
              <Col sm={2} />
              <Col style={{ marginTop: 30, fontFamily: "artifika" }}>
                <Card>
                  <Card.Header style={{ backgroundColor: "#AAAA74" }}>
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey="0"
                      style={{ color: "black" }}
                    >
                      <h2>Adicionar Vinho</h2>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0" style={{ color: "black" }}>
                    <Card.Body>
                      {" "}
                      <Container>
                        <Row>
                          <Col>
                            <h4>
                              Preencha os seguintes campos para adicionar um
                              novo vinho :
                            </h4>
                          </Col>
                        </Row>
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
                                onChange={this.handleName}
                                type="text"
                                placeholder="Nome"
                              />
                            </Col>

                            <Col>
                              <Form.Label>
                                Quantidade por garrafa (em ML )
                              </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleQuantity}
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
                                <form onChange={this.handlePhotoWine}>
                                  <div>
                                    <input
                                      ref={(ref) => {
                                        this.uploadInput1 = ref;
                                      }}
                                      type="file"
                                    />
                                  </div>

                                  <br />
                                </form>
                              </Form>
                            </Col>
                            <Col>
                              <Image
                                height="120"
                                width="80"
                                className="padding_image"
                                src={photoURL}
                              ></Image>
                            </Col>
                          </Row>
                          <Row style={{ marginTop: 20 }}>
                            {" "}
                            <Button
                              type="submit"
                              onClick={() =>
                                this.handleCategoryWine() &&
                                this.handleModalOptions
                              }
                              variant="primary"
                              size="lg"
                              block
                            >
                              Adicionar
                              {showModalOptions ? this.modalOptions() : false}
                            </Button>
                          </Row>
                        </form>
                      </Container>{" "}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header style={{ backgroundColor: "#AAAA74" }}>
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey="1"
                      style={{ color: "black" }}
                    >
                      <h2>Adicionar Azeite</h2>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1" style={{ color: "black" }}>
                    <Card.Body>
                      <Container>
                        <Row>
                          <Col>
                            <h4>
                              Preencha os seguintes campos para adicionar um
                              novo azeite :
                            </h4>
                          </Col>
                        </Row>
                        <br />

                        <Row>
                          <Col md={4}></Col>
                        </Row>

                        <Form onSubmit={this.handleSubmit}>
                          <Row>
                            <Col>
                              <Form.Label>Nome </Form.Label>
                              <Form.Control
                                id="nome"
                                required
                                onChange={this.handleName}
                                type="text"
                                placeholder="Nome"
                              />
                            </Col>

                            <Col>
                              <Form.Label>
                                Quantidade por garrafa em (ml)
                              </Form.Label>
                              <Form.Control
                                onChange={this.handleQuantity}
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
                                <form onChange={this.handlePhotoOlive}>
                                  <div>
                                    <input
                                      ref={(ref) => {
                                        this.uploadInput2 = ref;
                                      }}
                                      type="file"
                                    />
                                  </div>

                                  <br />
                                </form>
                              </Form>
                            </Col>
                            <Col>
                              <Image
                                height="120"
                                width="80"
                                className="padding_image"
                                src={photoURL}
                              ></Image>
                            </Col>
                          </Row>
                          <Row style={{ marginTop: 20 }}>
                            {" "}
                            <Button
                              type="submit"
                              onClick={this.handleCategoryOlive}
                              variant="primary"
                              size="lg"
                              block
                            >
                              Adicionar
                            </Button>
                          </Row>
                        </Form>
                      </Container>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header style={{ backgroundColor: "#AAAA74" }}>
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey="2"
                      style={{ color: "black" }}
                    >
                      <h2>Adicionar Aguardente</h2>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="2" style={{ color: "black" }}>
                    <Card.Body>
                      <Container>
                        <Row>
                          <Col>
                            <h4>
                              Preencha os seguintes campos para adicionar uma
                              nova Aguardente :
                            </h4>
                          </Col>
                        </Row>
                        <br />

                        <Row>
                          <Col md={4}></Col>
                        </Row>

                        <Form onSubmit={this.handleSubmit}>
                          <Row>
                            <Col>
                              <Form.Label>Nome </Form.Label>
                              <Form.Control
                                id="nome"
                                required
                                onChange={this.handleName}
                                type="text"
                                placeholder="Nome"
                              />
                            </Col>

                            <Col>
                              <Form.Label>
                                Quantidade por garrafa (em ML){" "}
                              </Form.Label>
                              <Form.Control
                                onChange={this.handleQuantity}
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
                                <form onChange={this.handlePhotoBrandy}>
                                  <div>
                                    <input
                                      ref={(ref) => {
                                        this.uploadInput0 = ref;
                                      }}
                                      type="file"
                                    />
                                  </div>

                                  <br />
                                </form>
                              </Form>
                            </Col>
                            <Col>
                              <Image
                                height="120"
                                width="80"
                                className="padding_image"
                                src={photoURL}
                              ></Image>
                            </Col>
                          </Row>
                          <Row style={{ marginTop: 20 }}>
                            {" "}
                            <Button
                              type="submit"
                              onClick={this.handleCategoryBrandy}
                              variant="primary"
                              size="lg"
                              block
                            >
                              Adicionar
                            </Button>
                          </Row>
                        </Form>
                      </Container>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header style={{ backgroundColor: "#AAAA74" }}>
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey="3"
                      style={{ color: "black" }}
                    >
                      <h2>Adicionar Licor</h2>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="3" style={{ color: "black" }}>
                    <Card.Body>
                      <Container>
                        <Row>
                          <Col>
                            <h4>
                              Preencha os seguintes campos para adicionar um
                              novo licor :
                            </h4>
                          </Col>
                        </Row>
                        <br />

                        <Row>
                          <Col md={4}></Col>
                        </Row>

                        <Form onSubmit={this.handleSubmit}>
                          <Row>
                            <Col>
                              <Form.Label>Nome </Form.Label>
                              <Form.Control
                                id="nome"
                                required
                                onChange={this.handleName}
                                type="text"
                                placeholder="Nome"
                              />
                            </Col>

                            <Col>
                              <Form.Label>
                                Quantidade por garrafa (em ML){" "}
                              </Form.Label>
                              <Form.Control
                                onChange={this.handleQuantity}
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
                              <form onChange={this.handlePhotoLicor}>
                                <div>
                                  <input
                                    ref={(ref) => {
                                      this.uploadInput3 = ref;
                                    }}
                                    type="file"
                                  />
                                </div>

                                <br />
                              </form>
                            </Col>
                            <Col>
                              <Image
                                height="120"
                                width="80"
                                className="padding_image"
                                src={photoURL}
                              ></Image>
                            </Col>
                          </Row>
                          <Row style={{ marginTop: 20 }}>
                            {" "}
                            <Button
                              type="submit"
                              onClick={this.handleCategoryLicor}
                              variant="primary"
                              size="lg"
                              block
                            >
                              Adicionar
                            </Button>
                          </Row>
                        </Form>
                      </Container>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Col>
              <Col sm={2} />
            </Row>
          </Accordion>
          <br></br>
        </Container>
      </div>
    );
  }
}
export default CreateProduct;
 */
