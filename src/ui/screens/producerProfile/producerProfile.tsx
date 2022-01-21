import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { SiInstagram } from 'react-icons/si';
import { FaFacebook } from 'react-icons/fa';
import { Image, Container, Row, Tab, Button, Card, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Producer, StoreState } from 'store';
import { useHistory } from 'react-router-dom';

export const ProducerProfile: React.FC = () => {
	const userInfo = useSelector((state: StoreState) => state.common.client);
	const userId = useSelector((state: StoreState) => state.common.user.id);
	const producer = useSelector((state: StoreState) => state.producer.producer);

	const [showModalDelete, setShowModalDelete] = useState(false);
	const [producerName, setProducerName] = useState('');
	const [producerLocation, setProducerLocation] = useState('');
	const [producerAddress, setProducerAddress] = useState('');
	const [producerTelephone, setProducerTelephone] = useState('');
	const [producerlocation, setProducerlocation] = useState('');
	const [showAlertDelete, setShowAlertDelete] = useState(false);

	const history = useHistory();
	const token = useSelector((state: StoreState) => state.common.user.token);

	const handleCloseDelete = () => {
		setShowModalDelete(false);
	};

	const showAlert = () => {
		window.setTimeout(() => {
			setShowAlertDelete(false);
		}, 5000);
	};

	const handleEdit = () => {
		history.push('/editProducer');
	};

	const handleShowDelete = () => {
		setShowModalDelete(true);
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
					<Button variant="primary" onClick={() => handleDelete()}>
						Eliminar
					</Button>
				</Modal.Footer>
			</Modal>
		);
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
					_id: producer,
				}),
			});
			setShowAlertDelete(true);
			showAlert();
			history.push('/');
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			window.location.reload();
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
					<Col>
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
						<h3
							style={{
								fontSize: 18,
								marginLeft: 600,
								marginTop: -70,
								fontWeight: 'bold',
								fontFamily: 'artifika',
							}}
						>
							Redes Sociais: {producer.social_network}
						</h3>
						<Col>
							<a style={{ marginLeft: 600 }} href="https://www.facebook.com/">
								<FaFacebook color="blue" size="30" />
							</a>
							<a style={{ marginLeft: 30 }} href="https://www.instagram.com/">
								<SiInstagram color="#E1306C" size="30" />
							</a>
						</Col>
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

				<Card.ImgOverlay>
					<Container>
						<Row style={{ marginTop: 300, marginLeft: 700 }}>
							<Col xs={12} md={8}>
								<Image src={producer.logo} width="300" fluid />
							</Col>
						</Row>
					</Container>
				</Card.ImgOverlay>
			</Container>
		</>
	);
};

/* class ProducerProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			producer: [],
			showModalDelete: false,
		};
	}

	async componentDidMount() {
		try {
			let token = await localStorage.getItem('token');
			let type = await localStorage.getItem('type');
			let userId = await localStorage.getItem('userId');
			let name_producer = await localStorage.getItem('name');
			if (token !== null) {
				this.setState({
					isLogged: true,
					token,
					type,
					userId,
					name_producer,
				});
				console.log(userId);
			} else {
				this.setState({
					isLogged: false,
				});
			}
		} catch (e) {
			console.log('Error rending data: ' + e);
		}
		const { token, userId } = this.state;

		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		axios.get(`http://127.0.0.1:5000/producer/${userId}`, config).then((res) => {
			const producer = res.data;
			this.setState({ producer });
			this.setState({
				name: producer.name,
				tin: producer.tin,
				logo: producer.logo,
				telephone: producer.telephone,
				street: producer.street,
				locality: producer.locality,
				country: producer.country,
				postal_code: producer.postal_code,
				email: producer.email,
				password: producer.password,
				social: producer.social,
				state: producer.state,
			});
		});
	}

	handleCloseDelete = () => {
		this.setState({ showModalDelete: false });
	};
	handleShowDelete = () => {
		this.setState({
			showModalDelete: true,
		});
	};
	modalDelete() {
		const { showModalDelete, producer } = this.state;
		return (
			<Modal show={showModalDelete} onHide={this.handleCloseDelete} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Eliminar produtor</Modal.Title>
				</Modal.Header>
				<Modal.Body>Pretende eliminar a sua conta produtor de {producer.name}?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.handleCloseDelete}>
						Fechar
					</Button>
					<Button variant="primary" onClick={() => this.delete() && this.handleCloseDelete}>
						Eliminar
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	delete = async () => {
		const { userId, token } = this.state;

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
			alert('Produtor eliminado com sucesso!');
			window.location.reload();
		} catch (e) {
			console.log('Error to Delete Producer: ' + e);
		}
	};

	render() {
		const { producer, showModalDelete } = this.state;

		return (
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
							}}
						>
							Perfil do Produtor
						</h3>
					</Col>
				</Row>

				<br />
				<Row>
					<Col md={30}></Col>
				</Row>

				<br />
				<Row>
					<Col>
						<h3
							style={{
								fontSize: 18,
								marginTop: 30,
								marginLeft: 40,
								fontWeight: 'bold',
								//fontSize: 20,
							}}
						>
							Nome do Produtor:
						</h3>
						<h4 style={{ fontSize: 18, marginTop: 20, marginLeft: 50 }}>{producer.name}</h4>
						<h3
							style={{
								fontSize: 18,
								marginTop: 40,
								marginLeft: 40,
								fontWeight: 'bold',
							}}
						>
							Rua:
						</h3>
						<h4 style={{ fontSize: 18, marginTop: 20, marginLeft: 50 }}>{producer.street}</h4>
						<h3
							style={{
								fontSize: 18,
								marginTop: 40,
								marginLeft: 40,
								fontWeight: 'bold',
							}}
						>
							Morada:
						</h3>
						<h4 style={{ fontSize: 18, marginTop: 20, marginLeft: 50 }}>{producer.locality}</h4>
						<h3
							style={{
								fontSize: 18,
								marginTop: 40,
								marginLeft: 40,
								fontWeight: 'bold',
							}}
						>
							Contacto:
						</h3>
						<h4 style={{ fontSize: 18, marginTop: 20, marginLeft: 50 }}>{producer.telephone}</h4>
						<h3
							style={{
								fontSize: 18,
								marginLeft: 600,
								marginTop: -70,
								fontWeight: 'bold',
							}}
						>
							Redes Sociais:
						</h3>
						<Col>
							<a style={{ marginLeft: 600 }} href="https://www.facebook.com/">
								<FaFacebook color="blue" size="30" />
							</a>
							<a style={{ marginLeft: 30 }} href="https://www.instagram.com/">
								<SiInstagram color="#E1306C" size="30" />
							</a>
						</Col>
					</Col>
				</Row>

				<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
					<Row id="row" style={{ marginBottom: 80 }}>
						<Col sm={1} />
						<Col sm={1}>
							<Button
								variant="dark"
								href="/editclient"
								size="lg"
								style={{ color: 'white', backgroundColor: '#AAAA74' }}
							>
								Editar{' '}
							</Button>
						</Col>
						<Col sm={8} style={{ marginTop: 100 }} />
						<Col sm={1}>
							<Button
								variant="dark"
								onClick={this.handleShowDelete}
								size="lg"
								style={{ color: 'white', backgroundColor: '#444903' }}
							>
								Eliminar{' '}
							</Button>
							{showModalDelete ? this.modalDelete() : false}
						</Col>
						<Col sm={1} />
					</Row>
				</Tab.Container>

				<Card.ImgOverlay>
					<Container>
						<Row style={{ marginTop: 300, marginLeft: 700 }}>
							<Col xs={12} md={8}>
								<Image
									src="https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize%2F2018%2F08%2F06%2F21%2FLogo-243223_6769_212624417_626643767.jpg"
									alt="Paris"
									width="500"
									fluid
								/>
							</Col>
						</Row>
					</Container>
				</Card.ImgOverlay>
			</Container>
		);
	}
}
export default ProducerProfile; */
