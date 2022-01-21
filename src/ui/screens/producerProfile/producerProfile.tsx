import React, { useState } from 'react';
import { Image, Container, Row, Tab, Button, Col, Modal } from 'react-bootstrap';
import { SiInstagram } from 'react-icons/si';
import { FaFacebook } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';
import { useHistory } from 'react-router-dom';

export const ProducerProfile: React.FC = () => {
	const userId = useSelector((state: StoreState) => state.common.user.id);
	const producer = useSelector((state: StoreState) => state.producer.producer);

	const [showModalDelete, setShowModalDelete] = useState(false);

	const history = useHistory();
	const token = useSelector((state: StoreState) => state.common.user.token);

	const handleCloseDelete = () => {
		setShowModalDelete(false);
	};

	const handleShowDelete = () => {
		setShowModalDelete(true);
	};

	const handleCallDelete = () => {
		handleDelete();
		handleCloseDelete();
	};

	const modalDelete = () => {
		return (
			<Modal show={showModalDelete} onHide={handleCloseDelete} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Eliminar produtor</Modal.Title>
				</Modal.Header>
				<Modal.Body>Pretende eliminar a sua conta produtor de {producer.name}?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseDelete}>
						Fechar
					</Button>
					<Button variant="primary" onClick={handleCallDelete}>
						Eliminar
					</Button>
				</Modal.Footer>
			</Modal>
		);
	};

	const handleEdit = () => {
		history.push('/editProducer');
	};

	const handleDelete = async () => {
		try {
			await fetch('http://127.0.0.1:5000/producer', {
				method: 'DELETE',
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: userId,
				}),
			});
			history.push('/');
			window.location.reload();
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		} catch (e) {
			console.log('Error to Delete Producer: ' + e);
		}
	};

	return (
		<>
			<Container>
				<br />
				<Row>
					<Col xs lg="5">
						<h3
							style={{
								fontSize: 30,
								marginTop: 30,
								marginLeft: 0,
								fontWeight: 'bold',
								fontFamily: 'artifika',
								color: '#9B3939',
							}}
						>
							Acerca do Produtor
						</h3>
					</Col>
				</Row>

				<br />
				<Row>
					<Col md={30}></Col>
				</Row>

				<br />
				<Row>
					<Col sm={6}>
						<h3
							style={{
								fontSize: 18,
								marginTop: 30,
								marginLeft: 40,
								fontWeight: 'bold',
								fontFamily: 'artifika',
							}}
						>
							Nome do Produtor:
						</h3>
						<h4 style={{ fontSize: 16, marginTop: 20, marginLeft: 50, fontFamily: 'artifika' }}>
							{producer.name}
						</h4>
						<h3
							style={{
								fontSize: 18,
								marginTop: 40,
								marginLeft: 40,
								fontWeight: 'bold',
								fontFamily: 'artifika',
							}}
						>
							Endereço principal:
						</h3>
						<h4 style={{ fontSize: 16, fontFamily: 'artifika', marginTop: 20, marginLeft: 50 }}>
							{producer.address}
						</h4>
						<h3
							style={{
								fontSize: 18,
								marginTop: 40,
								marginLeft: 40,
								fontWeight: 'bold',
								fontFamily: 'artifika',
							}}
						>
							Número de Contribuinte:
						</h3>
						<h4 style={{ fontFamily: 'artifika', fontSize: 16, marginTop: 20, marginLeft: 50 }}>
							{producer.tin}
						</h4>
						<h3
							style={{
								fontSize: 18,
								marginTop: 40,
								marginLeft: 40,
								fontWeight: 'bold',
								fontFamily: 'artifika',
							}}
						>
							Região:
						</h3>
						<h4 style={{ fontSize: 16, marginTop: 20, marginLeft: 50, fontFamily: 'artifika' }}>
							{producer.location}
						</h4>
						<h3
							style={{
								fontSize: 18,
								marginTop: 40,
								marginLeft: 40,
								fontWeight: 'bold',
								fontFamily: 'artifika',
							}}
						>
							Código-Postal:
						</h3>
						<h4 style={{ fontSize: 16, marginTop: 20, marginLeft: 50, fontFamily: 'artifika' }}>
							{producer.postal_code} {producer.country}
						</h4>
						<h3
							style={{
								fontSize: 18,
								marginTop: 40,
								marginLeft: 40,
								fontWeight: 'bold',
								fontFamily: 'artifika',
							}}
						>
							Contacto:
						</h3>
						<h4 style={{ fontFamily: 'artifika', fontSize: 16, marginTop: 20, marginLeft: 50 }}>
							{producer.telephone}
						</h4>
					</Col>
					<Col sm={6} style={{ marginTop: 90 }}>
						<Image src={producer.logo} width="180" fluid />
						<h3
							style={{
								fontSize: 18,
								marginTop: 180,
								fontWeight: 'bold',
								fontFamily: 'artifika',
							}}
						>
							Redes Sociais: {producer.social_network}
						</h3>
						<Row>
							<Col style={{ marginTop: 8, marginLeft: 30 }}>
								<a href="https://www.facebook.com/">
									<FaFacebook color="blue" size="30" />
								</a>
								<a style={{ marginLeft: 25 }} href="https://www.instagram.com/">
									<SiInstagram color="#E1306C" size="30" />
								</a>
							</Col>
						</Row>
					</Col>
				</Row>
				<br />
				<br />
				<br />
				<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
					<Row id="row" style={{ marginBottom: 80 }}>
						<Col sm={2} />
						<Col sm={2}>
							<Button
								variant="dark"
								onClick={handleEdit}
								size="lg"
								style={{ color: '#9B3939', backgroundColor: 'white', fontFamily: 'artifika' }}
							>
								Editar dados
							</Button>
						</Col>
						<Col sm={4} style={{ marginTop: 100 }} />
						<Col sm={1}>
							<Button
								variant="dark"
								onClick={handleShowDelete}
								size="lg"
								style={{ color: 'white', backgroundColor: '#9B3939', fontFamily: 'artifika' }}
							>
								Eliminar
							</Button>
							{showModalDelete && modalDelete()}
						</Col>
						<Col sm={1} />
					</Row>
				</Tab.Container>
			</Container>
		</>
	);
};
