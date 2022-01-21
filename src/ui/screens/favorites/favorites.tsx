import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Breadcrumb, Row, Alert, Col, Card, Button, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { BsFillHeartFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';

interface Favorite {
	_id: { $oid: string };
	date: string;
	hour: string;
	id_client: string;
	id_product: string;
	name_product: string;
	photo_product: string;
	price_product: number;
	quantity_product: number;
}

export const Favorites: React.FC = () => {
	const history = useHistory();

	const userId = useSelector((state: StoreState) => state.common.user.id);
	const email = useSelector((state: StoreState) => state.common.user.email);
	const token = useSelector((state: StoreState) => state.common.user.token);

	const [favorites, setFavorites] = useState<Favorite[]>();
	const [hasfavorites, setHasfavorites] = useState(false);
	const [showDeleteFavorite, setShowDeleteFavorite] = useState(false);
	const [showAddCart, setShowAddCart] = useState(false);

	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	useEffect(() => {
		const fecthAPI = async () => {
			axios.get(`http://127.0.0.1:5000/favorites/${userId}`, config).then((res) => {
				const favorites = res.data;
				setFavorites(favorites);
				if (favorites.lenght === 0) {
					setHasfavorites(false);
				} else {
					setHasfavorites(true);
				}
			});
		};
		fecthAPI();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showDeleteFavorite]);

	const showAlertAddCart = () => {
		window.setTimeout(() => {
			setShowAddCart(false);
		}, 5000);
	};

	const showAlertDeletFavorite = () => {
		window.setTimeout(() => {
			setShowDeleteFavorite(false);
		}, 5000);
	};

	const handleDeleteFavorite = (id: string) => {
		axios.delete(`http://127.0.0.1:5000/favorite/delete/${id}`, config);
		setShowDeleteFavorite(true);
		showAlertDeletFavorite();
	};

	const handleAddCart = (product: Favorite) => {
		axios.post(
			`http://127.0.0.1:5000/cart/client/${userId}`,
			{
				email_client: email,
				id_client: userId,
				id_product: product.id_product,
				name_product: product.name_product,
				photo_product: product.photo_product,
				price_product: product.price_product,
				quantity: product.quantity_product,
			},
			config
		);
		setShowAddCart(true);
		showAlertAddCart();
	};

	const renderFavorite = (x: Favorite, index: number) => {
		return (
			<Card key={index} style={{ width: '16rem', marginRight: 20 }}>
				<Card.Img variant="top" src={x.photo_product} width={200} height={200} />
				<div
					style={{
						marginTop: -190,
						marginRight: 10,
						display: 'flex',
						justifyContent: 'right',
						marginBottom: 170,
					}}
				>
					<BsFillHeartFill color="red" size={25} onClick={() => handleDeleteFavorite(x._id.$oid)} />
				</div>
				<Card.Body
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						fontFamily: 'artifika',
					}}
				>
					<Card.Title
						style={{
							fontWeight: 600,
							fontFamily: 'artifika',
						}}
					>
						<Link
							to={'/productDetail/' + x.id_product}
							style={{
								fontWeight: 600,
								color: 'black',
								fontFamily: 'artifika',
							}}
						>
							<i>{x.name_product}</i>
						</Link>
					</Card.Title>
					<Card.Text style={{ fontSize: 14 }}>
						<span style={{ fontWeight: 600, fontFamily: 'artifika' }}>Preço: </span>
						{x.price_product} €
					</Card.Text>
					<Button
						variant="primary"
						style={{ backgroundColor: '#9B3939', fontFamily: 'artifika' }}
						onClick={() => handleAddCart(x)}
					>
						Adicionar ao Carrinho
					</Button>
				</Card.Body>
			</Card>
		);
	};

	return (
		<div>
			<Alert key={'info'} variant={'info'} show={showDeleteFavorite} style={{ textAlign: 'center' }}>
				O produto foi removido dos favoritos
			</Alert>
			<Alert key={'success'} variant={'success'} show={showAddCart} style={{ textAlign: 'center' }}>
				O produto foi adicionado ao carrinho
			</Alert>
			<div>
				<Breadcrumb style={{ marginTop: 20, marginLeft: 38 }} id="breadcrumb">
					<Breadcrumb.Item onClick={() => history.push('/')}>
						<span style={{ fontFamily: 'artifika', color: '#9B3939' }}>Home</span>
					</Breadcrumb.Item>
					<Breadcrumb.Item active style={{ color: '#9B3939' }}>
						<span style={{ fontFamily: 'artifika', color: 'black' }}>Favoritos</span>
					</Breadcrumb.Item>
				</Breadcrumb>
			</div>
			<br />
			<Container>
				<h1 style={{ fontFamily: 'artifika', color: '#9B3939' }}>Favoritos</h1>
				<br />
				{hasfavorites ? (
					<Row>{favorites?.map((x, index) => renderFavorite(x, index))}</Row>
				) : (
					<Row style={{ marginTop: 50, marginBottom: 150, textAlign: 'center' }}>
						<Col sm={2} />
						<Col sm={8}>
							<h4>Não tem nenhum produto como favorito!</h4>
						</Col>
						<Col sm={2} />
					</Row>
				)}
			</Container>
			<br />
			<br />
		</div>
	);
};
