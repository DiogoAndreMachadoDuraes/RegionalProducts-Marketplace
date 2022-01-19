import React, { useEffect, useState } from 'react';
import './style.css';
import { Breadcrumb, Image, Container, Row, Col, Button } from 'react-bootstrap';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { ImLocation } from 'react-icons/im';
import { RiBookmark3Line } from 'react-icons/ri';
import { GiWineBottle, GiPriceTag } from 'react-icons/gi';
import { GrValidate, GrShare } from 'react-icons/gr';
import { MdLocalShipping } from 'react-icons/md';
import { FacebookShareButton } from 'react-share';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Product, StoreState } from 'store';
import moment from 'moment';

interface ParamType {
	id: string;
}

export const ProductDetail: React.FC = () => {
	const { id } = useParams<ParamType>();
	const isLogged = useSelector((state: StoreState) => state.common.user.isLogged);
	const userId = useSelector((state: StoreState) => state.common.user.id);
	const clientEmail = useSelector((state: StoreState) => state.common.client.email);
	const token = useSelector((state: StoreState) => state.common.user.token);

	const [price, setPrice] = useState(0);
	const [priceTotal, setPriceTotal] = useState(price);
	const [quantityProduct, setQuantityProduct] = useState(0);
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [harvest, setHarvest] = useState('');
	const [validity, setValidity] = useState('');
	const [producerName, setProducerName] = useState('');
	const [quantity, setQuantity] = useState(0);
	const [photo, setPhoto] = useState('');
	const [photoProducer, setPhotoProducer] = useState('');
	const [description /* , setDescription */] = useState(
		`Os nossos produtos primam pela aliança da qualidade e de personalidade ímpar com o sabor de tradição.`
	);
	const history = useHistory();

	const productsList: Product[] = useSelector((state: StoreState) => state.products.products);

	useEffect(() => {
		const finalList = productsList.filter((x) => x._id.$oid === id).map((x) => x);
		if (price === 0) {
			setPrice(finalList[0].price);
			setName(finalList[0].name);
			setCategory(finalList[0].category);
			setHarvest(finalList[0].harvest);
			setValidity(finalList[0].validity);
			setProducerName(finalList[0].name_producer);
			setQuantity(finalList[0].quantity);
			setPhoto(finalList[0].photo);
			setPhotoProducer(finalList[0].logo_producer);
		}
	}, []);

	const onPlus = () => {
		if (quantityProduct !== undefined && price !== undefined) {
			setQuantityProduct(quantityProduct + 1);
			const priceTotal = price * (quantityProduct + 1);
			const total: number = parseFloat(priceTotal.toFixed(2));
			setPriceTotal(total);
		}
	};

	const onMinus = () => {
		if (quantityProduct !== undefined && price !== undefined && quantityProduct >= 1) {
			setQuantityProduct(quantityProduct - 1);
			const priceTotal = price * (quantityProduct - 1);
			setPriceTotal(parseFloat(priceTotal.toFixed(2)));
		}
	};

	const addFavorites = async () => {
		if (isLogged === false) {
			history.push('/login');
		}
		try {
			await fetch('http://127.0.0.1:5000/favorites', {
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id_client: userId,
					date: moment().format('YYYY/MM/DD'),
					hour: moment().format('HH:mm:ss'),
					id_product: id,
					name_product: name,
					photo_product: photo,
					price_product: price,
					quantity_product: 1,
				}),
			});
		} catch (e) {
			console.log('Error to post product on favorites: ' + e);
		}
	};

	const addCart = async () => {
		if (isLogged === false) {
			history.push('/login');
		} else {
			console.log(token);
			try {
				await fetch('http://127.0.0.1:5000/carts', {
					method: 'POST',
					headers: {
						Authorization: 'Bearer ' + token,
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email_client: clientEmail,
						id_client: userId,
						id_product: id,
						name_product: name,
						photo_product: photo,
						price_product: priceTotal,
						quantity: quantityProduct,
					}),
				});
			} catch (e) {
				console.log('Error to post product on shop: ' + e);
			}
		}
	};

	return (
		<>
			<div>
				<Breadcrumb style={{ marginTop: 20, marginLeft: 38 }} id="breadcrumb">
					<Breadcrumb.Item onClick={() => history.push('/')}>
						<span style={{ fontFamily: 'artifika', color: '#9B3939' }}>Home</span>
					</Breadcrumb.Item>
					<Breadcrumb.Item onClick={() => history.push('/product/' + category)}>
						<span style={{ fontFamily: 'artifika', color: '#9B3939' }}>{category}</span>
					</Breadcrumb.Item>
					<Breadcrumb.Item active style={{ color: '#9B3939' }}>
						<span style={{ fontFamily: 'artifika', color: 'black' }}>{name}</span>
					</Breadcrumb.Item>
				</Breadcrumb>
			</div>
			<Container>
				<Row style={{ marginBottom: 70 }}>
					<Col sm={1} />
					<Col sm={4}>
						<Row style={{ justifyContent: 'center' }}>
							<Image src={photo} width="300" style={{ marginTop: 50 }} />
							<div style={{ marginTop: 100 }}>
								<h5 style={{ color: 'black', fontWeight: 'bold' }}>Produtor</h5>
								<p style={{ color: 'black', fontSize: 14, marginTop: 20 }}>
									{name} proveniente colhido e tratado por {producerName} LDA.
								</p>
							</div>
							<Image src={photoProducer} width="150" style={{ marginTop: 50 }} />
						</Row>
					</Col>
					<Col sm={1} />
					<Col sm={6}>
						<Row
							style={{
								justifyContent: 'center',
								textAlign: 'center',
							}}
						>
							{isLogged && (
								<Link to="/favorites" onClick={addFavorites}>
									<RiBookmark3Line
										size="30"
										style={{ marginTop: 10, marginRight: 20, color: 'black' }}
									/>
								</Link>
							)}
							<h1 style={{ color: 'black' }}>{name}</h1>
							<FacebookShareButton
								url={'http://localhost:3000/productDetail/617bc51f0472afba75b9d1b9'}
								quote={
									'Amigos, venham comprar que é de confiança, seguro e a encomenda chega rápido. Façam a vossa encomenda!'
								}
							>
								<GrShare size="18" style={{ marginTop: -20, marginLeft: 20 }} />
							</FacebookShareButton>
						</Row>
						<Row style={{ marginTop: 70 }}>
							<Col sm={1}>
								<ImLocation size="25" />
							</Col>
							<Col sm={5}>
								<h6 style={{ color: 'black', fontSize: 20 }}>Região: {harvest}</h6>
							</Col>
							<Col sm={1}>
								<GiWineBottle size="25" />
							</Col>
							<Col sm={5}>
								<h6 style={{ color: 'black', fontSize: 20 }}>Quantidade: {quantity}</h6>
							</Col>
						</Row>
						<Row style={{ marginTop: 30 }}>
							<Col sm={1}>
								<GrValidate size="25" />
							</Col>
							<Col sm={5}>
								<h5 style={{ color: 'black', fontSize: 20 }}>Validade: {validity}</h5>
							</Col>
							<Col lg={1}>
								<GiPriceTag size="25" />
							</Col>
							<Col lg={5}>
								<h5 style={{ color: 'black', fontSize: 20 }}>Preço: {priceTotal}€</h5>
							</Col>
						</Row>
						<Row style={{ marginTop: 60 }}>
							<h5>Descrição:</h5>
							<p>{description}</p>
						</Row>
						<Row
							style={{
								marginTop: 40,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Col sm={3} />
							<Col sm={1}>
								<AiFillMinusCircle onClick={onMinus} size="35" style={{ color: '#9B3939' }} />
							</Col>
							<Col sm={1}>
								<h4
									style={{
										color: 'black',
										textAlign: 'center',
										marginLeft: 10,
									}}
								>
									{quantityProduct}
								</h4>
							</Col>
							<Col sm={1}>
								<AiFillPlusCircle onClick={onPlus} size="35" style={{ color: '#9B3939' }} />
							</Col>
							<Col sm={2} />
							<Col sm={4}>
								<Button
									variant="dark"
									disabled={quantityProduct === 0}
									onClick={addCart}
									size="lg"
									style={{ color: 'white', backgroundColor: '#9B3939' }}
								>
									Adicionar
								</Button>
							</Col>
						</Row>
						<Row style={{ marginTop: 70 }}>
							<Col sm={2} />
							<Col sm={2}>
								<MdLocalShipping size="40" style={{ color: 'black', marginTop: 8 }} />
							</Col>
							<Col sm={8}>
								<h6 style={{ color: 'black' }}>
									<span style={{ fontWeight: 'bold' }}>Entregas gratuitas </span>a partir de 50€.
								</h6>
								<h6 style={{ color: 'black' }}>Custos de envio: 4,99€.</h6>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</>
	);
};
