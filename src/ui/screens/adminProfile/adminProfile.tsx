import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button, Image } from 'react-bootstrap';
import { AiOutlineUser, AiFillPhone, AiFillCreditCard, AiOutlineMail } from 'react-icons/ai';
import { BsFillPinMapFill } from 'react-icons/bs';
import { GiModernCity } from 'react-icons/gi';
import { IoLocationOutline } from 'react-icons/io5';
import { FaMapSigns } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';
import { images } from 'assets';

export const AdminProfile: React.FC = () => {
	const userId = useSelector((state: StoreState) => state.common.user.id);
	const admin = useSelector((state: StoreState) => state.admin.admin);
	const token = useSelector((state: StoreState) => state.common.user.token);

	const history = useHistory();
	const [showModalDelete, setShowModalDelete] = useState(false);

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
					<Modal.Title>Eliminar cliente</Modal.Title>
				</Modal.Header>
				<Modal.Body>Pretende eliminar a sua conta cliente de {admin.name}?</Modal.Body>
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
		history.push('/editAdmin');
	};

	const handleDelete = async () => {
		try {
			await fetch('http://127.0.0.1:5000/admin', {
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
			console.log('Error to Delete Admin: ' + e);
		}
	};

	return (
		<>
			<Container
				style={{
					marginTop: 50,
					marginBottom: 62,
				}}
			>
				<Row>
					<Col sm={1} />
					<Col sm={10}>
						<h3 style={{ color: '#8A3535', fontFamily: 'artifika' }}>Sobre o Administrador {admin.name}</h3>
					</Col>
					<Col sm={1} />
				</Row>
				<Row>
					<Col sm={4} />
					<Col sm={4}>
						<Image
							src={admin.photo ? admin.photo : images.imageProfileDefault}
							width={225}
							height={225}
							style={{ marginTop: 25 }}
							roundedCircle
						/>
					</Col>
					<Col sm={4} />
				</Row>
				<Row style={{ marginTop: 35 }}>
					<Col sm={1} />
					<Col sm={5}>
						<Row>
							<AiOutlineUser size="22" color="#8A3535" />
							<h6 style={{ marginLeft: 5, fontSize: 16, fontFamily: 'artifika' }}>
								<span style={{ fontWeight: 'bold', fontFamily: 'artifika' }}>Nome:</span> {admin.name}
							</h6>
						</Row>
					</Col>
					<Col sm={1} />
					<Col sm={5}>
						<Row>
							<AiFillCreditCard size="22" color="#8A3535" />
							<h5 style={{ marginLeft: 8, fontSize: 16, fontFamily: 'artifika' }}>
								<span style={{ fontWeight: 'bold', fontFamily: 'artifika' }}>
									Número de contribuinte:
								</span>{' '}
								{admin.tin}
							</h5>
						</Row>
					</Col>
				</Row>
				<Row style={{ marginTop: 25 }}>
					<Col sm={1} />
					<Col sm={5}>
						<Row>
							<AiOutlineMail size="22" color="#8A3535" />
							<h5 style={{ marginLeft: 7, fontSize: 16, fontFamily: 'artifika' }}>
								<span style={{ fontWeight: 'bold', fontFamily: 'artifika' }}>Email:</span> {admin.email}
							</h5>
						</Row>
					</Col>
					<Col sm={1} />
					<Col sm={5}>
						<Row>
							<AiFillPhone size="22" color="#8A3535" />
							<h5 style={{ marginLeft: 5, fontSize: 16, fontFamily: 'artifika' }}>
								<span style={{ fontWeight: 'bold', fontFamily: 'artifika' }}>Contacto:</span>{' '}
								{admin.telephone}
							</h5>
						</Row>
					</Col>
				</Row>
				<Row style={{ marginTop: 25 }}>
					<Col sm={1} />
					<Col sm={5}>
						<Row>
							<FaMapSigns size="22" color="#8A3535" />
							<h5 style={{ marginLeft: 8, fontSize: 16, fontFamily: 'artifika' }}>
								<span style={{ fontWeight: 'bold', fontFamily: 'artifika' }}>Morada:</span>{' '}
								{admin.address}
							</h5>
						</Row>
					</Col>
					<Col sm={1} />
					<Col sm={5}>
						<Row>
							<IoLocationOutline size="22" color="#8A3535" />
							<h5 style={{ marginLeft: 5, fontSize: 16, fontFamily: 'artifika' }}>
								<span style={{ fontWeight: 'bold', fontFamily: 'artifika' }}>Código Postal:</span>{' '}
								{admin.postal_code}
							</h5>
						</Row>
					</Col>
				</Row>
				<Row style={{ marginTop: 25 }}>
					<Col sm={1} />
					<Col sm={5}>
						<Row>
							<GiModernCity size="22" color="#8A3535" style={{ color: '#8A3535' }} />
							<h5 style={{ marginLeft: 8, fontSize: 16, fontFamily: 'artifika' }}>
								<span style={{ fontWeight: 'bold', fontFamily: 'artifika' }}>Cidade:</span>{' '}
								{admin.location}
							</h5>
						</Row>
					</Col>
					<Col sm={1} />
					<Col sm={5}>
						<Row>
							<BsFillPinMapFill size="22" color="#8A3535" style={{ color: '#8A3535' }} />
							<h5 style={{ marginLeft: 8, fontSize: 16, fontFamily: 'artifika' }}>
								<span style={{ fontWeight: 'bold', fontFamily: 'artifika' }}>Localidade:</span>{' '}
								{admin.country}
							</h5>
						</Row>
					</Col>
				</Row>
				<Row style={{ marginTop: 50 }}>
					<Col sm={3} />
					<Col sm={3}>
						<Button
							variant="dark"
							onClick={handleEdit}
							style={{
								color: '#9B3939',
								backgroundColor: 'white',
								fontWeight: 'bold',
								fontFamily: 'artifika',
							}}
						>
							Editar dados
						</Button>
					</Col>
					<Col sm={3}>
						<Button
							variant="light"
							onClick={handleShowDelete}
							style={{
								color: 'white',
								backgroundColor: '#8A3535',
								fontFamily: 'artifika',
							}}
						>
							Eliminar conta
						</Button>
						{showModalDelete && modalDelete()}
					</Col>
					<Col sm={3} />
				</Row>
			</Container>
		</>
	);
};
