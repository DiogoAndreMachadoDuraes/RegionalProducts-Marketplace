import React, { useState } from 'react';
import { Card, Row, Col, Button, Container, Form, Image, Modal, Breadcrumb } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';
import axios from 'axios';

export const CreateProduct: React.FC = () => {
	const history = useHistory();
	const idProducer = useSelector((state: StoreState) => state.common.user.id);
	const token = useSelector((state: StoreState) => state.common.user.token);
	const categories = useSelector((state: StoreState) => state.categories.categories);
	const logoProducer = useSelector((state: StoreState) => state.producer.producer.logo);
	const nameProducer = useSelector((state: StoreState) => state.producer.producer.name);
	const emailProducer = useSelector((state: StoreState) => state.producer.producer.email);

	const [showModalOptions, setShowModalOptions] = useState(false);
	const [price, setPrice] = useState('1,29');
	const [name, setName] = useState('Alheira');
	const [category, setCategory] = useState('Enchidos e carne');
	const [harvest, setHarvest] = useState('');
	const [validity, setValidity] = useState('10-12-2026');
	const [quantity, setQuantity] = useState('500g');
	const [photoURL, setPhotoURL] = useState('');
	const [stock, setStock] = useState('');

	const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
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

	const handleStock = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStock(e.target.value);
	};

	const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPrice(e.target.value);
	};

	const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.files !== null) {
			const data = new FormData();
			data.append('file', e.currentTarget.files[0]);
			data.append('filename', '');

			fetch('http://127.0.0.1:5000/upload', {
				method: 'POST',
				body: data,
			}).then((response) => {
				response.json().then((fileurl) => {
					setPhotoURL(`http://127.0.0.1:5000/${fileurl}`);
				});
			});
		}
	};

	const handleClick = () => {
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		axios.post(
			`http://127.0.0.1:5000/products`,
			{
				name: name,
				quantity: quantity,
				validity: validity,
				harvest: harvest,
				category: category,
				price: price,
				photo: photoURL,
				stock: stock,
				id_producer: idProducer,
				logo_producer: logoProducer,
				name_producer: nameProducer,
				email_producer: emailProducer,
			},
			config
		);
		handleModalOptions();
		modalOptions();
	};

	const handleModalOptions = () => {
		setShowModalOptions(true);
	};

	const handleCloseEdit = () => {
		setShowModalOptions(false);
	};

	const modalOptions = () => {
		return (
			<Modal size="lg" show={showModalOptions} onHide={handleCloseEdit} animation={true}>
				<Modal.Header>
					<Modal.Title>Produto criado</Modal.Title>
				</Modal.Header>
				<Modal.Body>O produto {name} foi adicionado com Sucesso!</Modal.Body>
				<Modal.Footer>
					<Row>
						<Col>
							<Button onClick={() => history.push('/productListProducer')} variant="secondary">
								Voltar à lista de Produtos
							</Button>
						</Col>
						<Col>
							<Button onClick={() => history.push('/createProduct')} variant="primary">
								Adicionar novo produto
							</Button>
						</Col>
					</Row>
				</Modal.Footer>
			</Modal>
		);
	};

	return (
		<>
			<div>
				<Breadcrumb style={{ marginTop: 20, marginLeft: 38 }} id="breadcrumb">
					<Breadcrumb.Item onClick={() => history.push('/dashboardProducer')}>
						<span style={{ fontFamily: 'artifika', color: '#9B3939' }}>Home</span>
					</Breadcrumb.Item>
					<Breadcrumb.Item onClick={() => history.push('/productListProducer')}>
						<span style={{ fontFamily: 'artifika', color: '#9B3939' }}>Produtos</span>
					</Breadcrumb.Item>
					<Breadcrumb.Item active style={{ color: '#9B3939' }}>
						<span style={{ fontFamily: 'artifika', color: 'black' }}>Adicionar Produto</span>
					</Breadcrumb.Item>
				</Breadcrumb>
			</div>
			<br />
			<div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'artifika' }}>
				<Card style={{ width: 800 }}>
					<Card.Body>
						<Container>
							<Row>
								<Col>
									<h4>Preencha os seguintes campos para adicionar o seu produto :</h4>
								</Col>
							</Row>
							<br />
							<Row>
								<Col>
									<Form.Label>Nome</Form.Label>
									<Form.Control
										id="name"
										required
										onChange={handleName}
										type="text"
										placeholder="Nome"
									/>
								</Col>
								<Col>
									<Form.Label>Stock</Form.Label>
									<Form.Control
										required
										onChange={handleStock}
										id="stock"
										min="1"
										type="number"
										placeholder="Quantidade de produtos"
									/>
								</Col>
								<Col>
									<Form.Label>Categoria</Form.Label>
									<Form.Control as="select" required onChange={handleCategory}>
										{categories.map((i, index) => (
											<option value={i} key={index}>
												{i}
											</option>
										))}
									</Form.Control>
								</Col>
							</Row>
							<br />
							<Row>
								<Col>
									<Form.Label>Colheita</Form.Label>
									<Form.Control
										required
										onChange={handleHarvest}
										id="harvest"
										placeholder="Zona de colheita"
									/>
								</Col>
								<Col>
									<Form.Label>Validade</Form.Label>
									<Form.Control
										required
										onChange={handleValidity}
										id="validity"
										min="2022-05-03"
										type="date"
										placeholder="Validade"
									/>
								</Col>
							</Row>
							<br />
							<Row>
								<Col>
									<Form.Label>Quantidade</Form.Label>
									<Form.Control
										required
										onChange={handleQuantity}
										id="quantity"
										placeholder="Quantidade"
									/>
								</Col>
								<Col>
									<Form.Label>Preço </Form.Label>
									<Form.Control
										required
										onChange={handlePrice}
										id="price"
										min="0.01"
										type="number"
										placeholder="Preço"
										step=".01"
									/>
								</Col>
							</Row>
							<br />
							<Row>
								<Col style={{ marginTop: 40, marginLeft: 40 }}>
									<input
										type="file"
										alt="image"
										onChange={handlePhoto}
										placeholder="Please insert an image file..."
										accept="image/*"
										required
									/>
								</Col>
								<Col>
									<Image height="120" width="120" className="padding_image" src={photoURL}></Image>
								</Col>
							</Row>
							<Row style={{ marginTop: 20 }}>
								<Button onClick={handleClick} variant="primary" size="lg" block>
									Adicionar
								</Button>
								{showModalOptions && modalOptions()}
							</Row>
						</Container>
					</Card.Body>
				</Card>
			</div>
			<br />
			<br />
			<br />
		</>
	);
};
