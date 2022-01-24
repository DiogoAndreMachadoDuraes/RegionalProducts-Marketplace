import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Container, Form, Image, Modal, Breadcrumb } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Product, StoreState } from 'store';
import axios from 'axios';

interface EditProductParams {
	id: string;
}

export const EditProduct: React.FC = () => {
	const { id } = useParams<EditProductParams>();
	const history = useHistory();
	const type = useSelector((state: StoreState) => state.common.user.type);
	const idProducer = useSelector((state: StoreState) => state.common.user.id);
	const token = useSelector((state: StoreState) => state.common.user.token);
	const categories = useSelector((state: StoreState) => state.categories.categories);
	const logoProducer = useSelector((state: StoreState) => state.producer.producer.logo);
	const nameProducer = useSelector((state: StoreState) => state.producer.producer.name);
	const emailProducer = useSelector((state: StoreState) => state.producer.producer.email);

	const [product, setProduct] = useState<Product | any>();
	const [showModalOptions, setShowModalOptions] = useState(false);
	const [photoURL, setPhotoURL] = useState('');

	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	useEffect(() => {
		axios.get(`http://127.0.0.1:5000/products/` + id, config).then((res) => {
			const product = res.data;
			setProduct(product.products);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProduct({ ...product, name: e.target.value || undefined });
	};

	const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProduct({ ...product, quantity: e.target.value || undefined });
	};

	const handleValidity = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProduct({ ...product, validity: e.target.value || undefined });
	};

	const handleHarvest = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProduct({ ...product, harvest: e.target.value || undefined });
	};

	const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProduct({ ...product, category: e.target.value || undefined });
	};

	const handleStock = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProduct({ ...product, stock: Number(e.target.value) || undefined });
	};

	const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProduct({ ...product, price: Number(e.target.value) || undefined });
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

		axios.put(
			`http://127.0.0.1:5000/products/` + id,
			{
				name: product.name,
				quantity: product.quantity,
				validity: product.validity,
				harvest: product.harvest,
				category: product.category,
				price: product.price,
				photo: photoURL,
				stock: product.stock,
				id_producer: idProducer !== '' ? idProducer : product.id_producer,
				logo_producer: logoProducer !== '' ? logoProducer : product.id_producer,
				name_producer: nameProducer !== '' ? nameProducer : product.id_producer,
				email_producer: emailProducer !== '' ? emailProducer : product.id_producer,
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
				<Modal.Body>O produto {product.name} foi adicionado com Sucesso!</Modal.Body>
				<Modal.Footer>
					<Row>
						{type === 'admin' && <Col />}
						<Col>
							<Button onClick={() => history.push('/productListProducer')} variant="secondary">
								Voltar à lista de Produtos
							</Button>
						</Col>
						{type === 'producer' && (
							<Col>
								<Button onClick={() => history.push('/createProduct')} variant="primary">
									Adicionar novo produto
								</Button>
							</Col>
						)}
					</Row>
				</Modal.Footer>
			</Modal>
		);
	};

	return (
		<>
			<div>
				{type === 'producer' && (
					<Breadcrumb style={{ marginTop: 20, marginLeft: 38 }} id="breadcrumb">
						<Breadcrumb.Item onClick={() => history.push('/dashboardProducer')}>
							<span style={{ fontFamily: 'artifika', color: '#9B3939' }}>Home</span>
						</Breadcrumb.Item>
						<Breadcrumb.Item onClick={() => history.push('/productListProducer')}>
							<span style={{ fontFamily: 'artifika', color: '#9B3939' }}>Produtos</span>
						</Breadcrumb.Item>
						<Breadcrumb.Item active style={{ color: '#9B3939' }}>
							<span style={{ fontFamily: 'artifika', color: 'black' }}>Editar Produto</span>
						</Breadcrumb.Item>
					</Breadcrumb>
				)}
				{type === 'admin' && (
					<Breadcrumb style={{ marginTop: 20, marginLeft: 38 }} id="breadcrumb">
						<Breadcrumb.Item onClick={() => history.push('/dashboardAdmin')}>
							<span style={{ fontFamily: 'artifika', color: '#9B3939' }}>Home</span>
						</Breadcrumb.Item>
						<Breadcrumb.Item onClick={() => history.push('/productList')}>
							<span style={{ fontFamily: 'artifika', color: '#9B3939' }}>Produtos</span>
						</Breadcrumb.Item>
						<Breadcrumb.Item active style={{ color: '#9B3939' }}>
							<span style={{ fontFamily: 'artifika', color: 'black' }}>Editar Produto</span>
						</Breadcrumb.Item>
					</Breadcrumb>
				)}
			</div>
			<br />
			<div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'artifika' }}>
				<Card style={{ width: 800 }}>
					<Card.Body>
						<Container>
							<Row>
								<Col>
									<h4>Edite os seguintes campos com os dados do produto :</h4>
								</Col>
							</Row>
							<br />
							<Row>
								<Col>
									<Form.Label>Nome</Form.Label>
									<Form.Control
										id="name"
										required
										defaultValue={product?.name}
										onChange={handleName}
										type="text"
										placeholder="Nome"
									/>
								</Col>
								<Col>
									<Form.Label>Stock</Form.Label>
									<Form.Control
										required
										defaultValue={product?.stock}
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
										defaultValue={product?.harvest}
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
										defaultValue={product?.quantity}
										onChange={handleQuantity}
										id="quantity"
										placeholder="Quantidade"
									/>
								</Col>
								<Col>
									<Form.Label>Preço </Form.Label>
									<Form.Control
										required
										defaultValue={product?.price}
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
									<Image
										height="120"
										width="120"
										className="padding_image"
										src={photoURL ? photoURL : product?.photo}
									></Image>
								</Col>
							</Row>
							<Row style={{ marginTop: 20 }}>
								<Button onClick={handleClick} variant="primary" size="lg" block>
									Editar
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
