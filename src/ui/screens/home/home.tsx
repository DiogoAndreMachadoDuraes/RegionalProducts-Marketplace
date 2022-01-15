import React, { useEffect, useState } from 'react';
import { Card, Container, Button, Modal, Row, Carousel } from 'react-bootstrap';
import { BsFillHeartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
/* import { useHistory } from 'react-router-dom'; */
import { StoreState, productList /* , getCategories */ } from 'store';
import { images } from 'assets';
import axios from 'axios';

interface Product {
	id: string;
	category: string;
	email_producer: string;
	harvest_date: string;
	id_producer: number;
	logo_producer: string;
	name: string;
	name_producer: string;
	photo: string;
	price: number;
	quantity: number;
	stock: number;
	validity: string;
}

export const Home: React.FC = () => {
	const productsList = useSelector((state: StoreState) => state.products.products);
	/* const history = useHistory(); */

	const dispatch = useDispatch();
	const [showModalOptionsFavorites /* , setShowModalOptionsFavorites */] = useState(false);
	const [showModalOptionsCart /* , setShowModalOptionsCart */] = useState(false);
	const [products, setProducts] = useState<Product[]>(productsList);
	const [categories, setCategories] = useState<string[]>();

	const getAllCategories = () => {
		let categoriesRepeted: string[] = [];

		products.map((x, index) => (categoriesRepeted[index] = x.category));

		let categories = categoriesRepeted.filter(function (el, i) {
			return categoriesRepeted.indexOf(el) === i;
		});

		setCategories(categories);
	};

	useEffect(() => {
		const fecthAPI = async () => {
			if (productsList.length === 0) {
				try {
					axios.get(`http://127.0.0.1:5000/productslist`).then((res) => {
						const products = res.data;
						setProducts(products);
						dispatch(productList(products));
					});
				} catch (e) {
					console.log('Error rending data: ' + e);
				}
			}
		};
		fecthAPI();
		getAllCategories();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, productsList]);

	/* const handlegotodetail = () => {
		history.push('/productDetail'); */
	/* this.props.history.push('/productdetail', {
			id_product: product._id.$oid,
			acidity: product.acidity,
			quantity: product.quantity,
			name: product.name,
			harvest: product.harvest,
			validity: product.validity,
			category: product.category,
			type: product.type,
			price: product.price,
			photo: product.photo,
			alcohol_content: product.alcohol_content,
			id_producer: product.id_producer,
			name_producer: product.name_producer,
			photo_producer: product.photo_producer,
		}); */
	/* }; */

	const modalOptionsCart = () => {
		return (
			<Modal size="sm" show={showModalOptionsCart} animation={true}>
				<Modal.Header>
					<Modal.Title>O produto foi adicionado ao Carrinho!</Modal.Title>
				</Modal.Header>
			</Modal>
		);
	};

	const modalOptionsFavorites = () => {
		return (
			<Modal size="sm" show={showModalOptionsFavorites} animation={true}>
				<Modal.Header>
					<Modal.Title>O produto foi adicionado aos Favoritos!</Modal.Title>
				</Modal.Header>
			</Modal>
		);
	};

	/* const handleModalOptionsCart = () => {
		setShowModalOptionsCart(true);
	};

	const handleModalOptionsFavorites = () => {
		setShowModalOptionsFavorites(true);
	}; */

	/* const handleaddToCart = (product) => {
		const { userId, token, isLogged } = this.state;

		if (isLogged === false) {
			this.props.history.push('/login');
		} else {
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};

			axios.get(`http://127.0.0.1:5000/cart/client/${userId}`, config).then(
				(response) => {
					const carts = response.data;
					this.setState({ carts });
					const products2 = carts.products;
					this.setState(products2);

					var teste = {
						id_product: product._id.$oid,
						name_product: product.name,
						photo_product: product.photo,
						price_product: product.price,
						quantity_product: '1',
					};
					products2.push(teste);

					axios.put(
						`http://127.0.0.1:5000/cart/client/${userId}`,
						{
							id_client: userId,
							email_client: 'email',
							products: products2,
						},
						config
					);
					this.setState({ showModalOptionsCart: true });
					setTimeout(function () {
						window.location.reload();
					}, 1000);
				},
				(error) => {
					axios.post(
						'http://127.0.0.1:5000/carts',
						{
							id_client: userId,
							email_client: 'email',
							products: [
								{
									id_product: product._id.$oid,
									name_product: product.name,
									photo_product: product.photo,
									price_product: product.price,
									quantity_product: '1',
								},
							],
						},
						config
					);
					this.setState({ showModalOptionsCart: true });
					setTimeout(function () {
						window.location.reload();
					}, 1000);
				}
			);
		}
	};

	const handleaddToFavorite = (product) => {
		const { userId, token, isLogged } = this.state;

		if (isLogged === false) {
			this.props.history.push('/login');
		} else {
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};

			axios.get(`http://127.0.0.1:5000/favorites/${userId}`, config).then(
				(response) => {
					const favorites = response.data;
					this.setState({ favorites });
					const products3 = favorites.products;
					this.setState(products3);
					var teste = {
						id_product: product._id.$oid,
						name_product: product.name,
						photo_product: product.photo,
						price_product: product.price,
						quantity_product: product.quantity,
					};
					products3.push(teste);

					axios.put(
						`http://127.0.0.1:5000/favorites/${userId}`,
						{
							id_client: userId,
							date: moment().format('YYYY/MM/DD HH:mm:ss'),
							products: products3,
						},
						config
					);
					this.setState({ showModalOptionsFavorites: true });
					setTimeout(function () {
						window.location.reload();
					}, 1000);
				},
				(error) => {
					axios.post(
						'http://127.0.0.1:5000/favorites',
						{
							id_client: userId,
							date: moment().format('YYYY/MM/DD HH:mm:ss'),
							products: [
								{
									id_product: product._id.$oid,
									name_product: product.name,
									photo_product: product.photo,
									price_product: product.price,
									quantity_product: product.quantity,
								},
							],
						},
						config
					);
					this.setState({ showModalOptionsFavorites: true });
					setTimeout(function () {
						window.location.reload();
					}, 1000);
				}
			);
		}
	}; */

	/* const renderProduct = (product: Product, index: number) => {
		return (
			<Card key={index}>
				<Card.Title className="text-right" style={{ marginRight: 10 }}>
					<BsFillHeartFill
						color="#C8C8C8"
						onClick={() => handleaddToFavorite(product) && handleModalOptionsFavorites}
					>
						{showModalOptionsFavorites ? modalOptionsFavorites() : false}
					</BsFillHeartFill>
				</Card.Title>
				<Card.Img variant="top" src={product.photo} onClick={() => handlegotodetail(product)}></Card.Img>
				<Card.Body>
					<Card.Title onClick={() => handlegotodetail(product)}>{product.name}</Card.Title>
					<Card.Text>{product.price} €</Card.Text>

					<Button variant="primary" onClick={() => handleaddToCart(product) && handleModalOptionsCart}>
						Adicionar ao Carrinho
						{showModalOptionsCart ? modalOptionsCart() : false}
					</Button>
				</Card.Body>
			</Card>
		);
	}; */

	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex: React.SetStateAction<number>, e: any) => {
		setIndex(selectedIndex);
	};

	return (
		<div>
			<Container style={{ marginTop: 25, marginBottom: 80 }}>
				<Carousel activeIndex={index} onSelect={handleSelect}>
					<Carousel.Item>
						<img className="d-block w-100" src={images.logo} width={800} height={400} alt="First slide" />
						<Carousel.Caption>
							<h3 style={{ color: 'black' }}>Bem Vindo!</h3>
							<p style={{ color: 'black' }}>Aqui encontrará os melhores produtos aos melhores preços.</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img className="d-block w-100" src={images.quei} width={800} height={400} alt="Second slide" />
						<Carousel.Caption>
							<h3>Venha conhecer a nossa gama de queijos!</h3>
							<p>Delicioso, típico e original queijo dos melhores produtores nacionais.</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src={images.enchidos}
							width={800}
							height={400}
							alt="Third slide"
						/>
						<Carousel.Caption>
							<h3>Ou então o melhor fumeiro do país!</h3>
							<p>Não espere mais, compre os melhores enchidos connosco.</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
				<h1 style={{ color: '#9B3939', textAlign: 'center', marginTop: 60 }}>Top Vendas Mensais</h1>
				{categories?.map((category) => {
					return (
						<>
							<h1 style={{ color: '#9B3939' }}>{category}</h1>
							<br />
							<Row style={{ marginBottom: 40 }}>
								<br />
								{products
									?.filter((x) => x.category === category)
									.slice(0, 4)
									.map((x, index) => {
										return (
											<Card key={index} style={{ width: '16rem', marginRight: 20 }}>
												<Card.Img
													variant="top"
													src={x.photo}
													width={200}
													height={200} /* onClick={() => handlegotodetail(product)} */
												/>
												<Card.ImgOverlay>
													<div
														className="text-right"
														style={{ marginTop: -10, marginRight: -5 }}
													>
														<BsFillHeartFill
															color="red"
															size={25}
															/* onClick={() => handleaddToFavorite(product) && handleModalOptionsFavorites} */
														>
															{showModalOptionsFavorites
																? modalOptionsFavorites()
																: false}
														</BsFillHeartFill>
													</div>
												</Card.ImgOverlay>
												<Card.Body
													style={{
														display: 'flex',
														flexDirection: 'column',
														justifyContent: 'center',
													}}
												>
													<Card.Title
														style={{
															fontWeight: 600,
														}} /* onClick={() => handlegotodetail(product)} */
													>
														<i>{x.name}</i>
													</Card.Title>
													<Card.Text style={{ fontSize: 14 }}>
														<span style={{ fontWeight: 600 }}>Preço: </span>
														{x.price} €
													</Card.Text>
													<Button
														variant="primary"
														style={{ backgroundColor: '#9B3939' }}
														/* onClick={() => handleaddToCart(product) && handleModalOptionsCart} */
													>
														Adicionar ao Carrinho
														{showModalOptionsCart ? modalOptionsCart() : false}
													</Button>
												</Card.Body>
											</Card>
										);
									})}
							</Row>
						</>
					);
				})}
			</Container>
		</div>
	);
};
