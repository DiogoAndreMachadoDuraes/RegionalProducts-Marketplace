import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Carousel, Col } from 'react-bootstrap';
import { StoreState, productList, categoryList, Product } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { images } from 'assets';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const productsList: Product[] = useSelector((state: StoreState) => state.products.products);
	const categoriesList = useSelector((state: StoreState) => state.categories.categories);

	const [products, setProducts] = useState<Product[]>(productsList);
	const [categories, setCategories] = useState<string[]>(categoriesList);

	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex: React.SetStateAction<number>, e: any) => {
		setIndex(selectedIndex);
	};

	useEffect(() => {
		const fecthAPI = async () => {
			try {
				await axios.get(`http://127.0.0.1:5000/productslist`).then((res) => {
					const products = res.data;
					setProducts(products);
					products.forEach((x: Product) => {
						dispatch(productList(x));
					});

					let categoriesRepeted: string[] = [];
					products?.map((x: Product, index: number) => (categoriesRepeted[index] = x.category));
					let categories = categoriesRepeted.filter(function (el, i) {
						return categoriesRepeted.indexOf(el) === i;
					});
					setCategories(categories);
					dispatch(categoryList(categories));
				});
			} catch (e) {
				console.log('Error rending data: ' + e);
			}
		};
		if (productsList.length === 0) {
			fecthAPI();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderCard = (x: Product, index: number) => {
		return (
			<Card key={index} style={{ width: '16rem', marginRight: 20 }}>
				<Card.Img
					variant="top"
					src={x.photo}
					width={200}
					height={200}
					onClick={() => history.push('/productDetail/' + x._id.$oid)}
				/>
				<Card.Body
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
					}}
				>
					<Card.Title
						style={{
							textAlign: 'center',
							fontFamily: 'artifika',
							fontWeight: 600,
						}}
					>
						<Link
							to={'/productDetail/' + x._id.$oid}
							style={{
								color: '#9B3939',
							}}
						>
							{x.name}
						</Link>
					</Card.Title>
					<Row>
						<Col sm={5}>
							<Card.Text style={{ fontSize: 14, fontFamily: 'artifika' }}>
								<span
									style={{
										fontWeight: 600,
									}}
								>
									Preço:{' '}
								</span>
								{x.price} €
							</Card.Text>
						</Col>
						<Col sm={7}>
							<Card.Text style={{ fontSize: 14, fontFamily: 'artifika' }}>
								<span
									style={{
										fontWeight: 600,
									}}
								>
									Quantidade:{' '}
								</span>
								{x.quantity}
							</Card.Text>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		);
	};

	return (
		<div>
			<Container style={{ marginTop: 25, marginBottom: 80 }}>
				<Carousel activeIndex={index} onSelect={handleSelect}>
					<Carousel.Item>
						<img className="d-block w-100" src={images.mix} width={700} height={500} alt="First slide" />
						<Carousel.Caption>
							<Card style={{ opacity: 0.8 }}>
								<h3 style={{ color: 'black', fontWeight: 700, fontFamily: 'artifika' }}>Bem Vindo!</h3>
								<p style={{ color: 'black', fontWeight: 'bold', fontFamily: 'artifika' }}>
									Aqui encontrará os melhores produtos aos melhores preços.
								</p>
							</Card>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img className="d-block w-100" src={images.quei} width={700} height={500} alt="Second slide" />
						<Carousel.Caption>
							<Card style={{ opacity: 0.8 }}>
								<h3 style={{ color: 'black', fontWeight: 700, fontFamily: 'artifika' }}>
									Venha conhecer a nossa gama de queijos!
								</h3>
								<p style={{ color: 'black', fontWeight: 'bold', fontFamily: 'artifika' }}>
									Delicioso, típico e original queijo dos melhores produtores nacionais.
								</p>
							</Card>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src={images.enchidos}
							width={700}
							height={500}
							alt="Third slide"
						/>
						<Carousel.Caption>
							<Card style={{ opacity: 0.8 }}>
								<h3 style={{ color: 'black', fontWeight: 700, fontFamily: 'artifika' }}>
									Disfrute do melhor fumeiro do país!
								</h3>
								<p style={{ color: 'black', fontWeight: 'bold', fontFamily: 'artifika' }}>
									Não espere mais, compre os melhores enchidos e carnes connosco.
								</p>
							</Card>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src={images.granola}
							width={700}
							height={500}
							alt="Fourth slide"
						/>
						<Carousel.Caption>
							<Card style={{ opacity: 0.8 }}>
								<h3 style={{ color: 'black', fontWeight: 700, fontFamily: 'artifika' }}>
									À sua disposição uma gama selecionada de frutos secos!
								</h3>
								<p style={{ color: 'black', fontWeight: 'bold', fontFamily: 'artifika' }}>
									Experimente!
								</p>
							</Card>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img className="d-block w-100" src={images.kiwi} width={700} height={500} alt="Fifth slide" />
						<Carousel.Caption>
							<Card style={{ opacity: 0.8 }}>
								<h3 style={{ color: 'black', fontWeight: 700, fontFamily: 'artifika' }}>
									A melhor seleção de compotas e geleias!
								</h3>
								<p style={{ color: 'black', fontWeight: 'bold', fontFamily: 'artifika' }}>
									Edição limitada, compre já!
								</p>
							</Card>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
				<h1 style={{ color: '#9B3939', textAlign: 'center', marginTop: 60, fontFamily: 'artifika' }}>
					Top Vendas Mensais
				</h1>
				<br />
				{categories?.map((category, index) => {
					return (
						<div key={index}>
							<h1 style={{ color: 'black', fontFamily: 'artifika' }}>{category}</h1>
							<br />
							<Row style={{ marginBottom: 40, fontFamily: 'artifika' }}>
								<br />
								{products
									?.filter((x) => x.category === category)
									.slice(0, 4)
									.map((x, index) => renderCard(x, index))}
							</Row>
						</div>
					);
				})}
			</Container>
		</div>
	);
};
