import React, { useEffect, useState } from 'react';
import './style.css';
import {
	Tab,
	Row,
	Col,
	Card,
	Form,
	Modal,
	InputGroup,
	FormControl,
	Table,
	Button,
	Spinner,
	Image,
} from 'react-bootstrap';
import { AiFillEdit, AiFillDelete, AiOutlineSearch } from 'react-icons/ai';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';

interface Producer {
	_id: { $oid: string };
	logo: string;
	email: string;
	password: string;
	country: string;
	location: string;
	name: string;
	postal_code: string;
	social: string;
	state: string;
	address: string;
	telephone: string;
	tin: string;
}

export const ProducerList: React.FC = () => {
	const [producer, setProducer] = useState<Producer[]>();
	const [showModalEdit, setShowModalEdit] = useState(false);
	const [showModalDelete, setShowModalDelete] = useState(false);
	const [searched, setSearched] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [producerId, setProducerId] = useState('');
	const [producerState, setProducerState] = useState('');
	const [producerName, setProducerName] = useState('');
	const [producerEmail, setProducerEmail] = useState('');
	const [producerPassword, setProducerPassword] = useState('');
	const [producerCountry, setProducerCountry] = useState('');
	const [producerlocation, setProducerlocation] = useState('');
	const [producerPostalCode, setProducerPostalCode] = useState('');
	const [producerSocial, setProducerSocial] = useState('');
	const [producerLogo, setProducerLogo] = useState('');
	const [produceraddress, setProduceraddress] = useState('');
	const [producerTin, setProducerTin] = useState('');
	const [producerTelephone, setProducerTelephone] = useState('');

	const [isLoading, setIsLoading] = useState(false);
	const [isLogged, setIsLogged] = useState(false);
	const [type, setType] = useState('');

	const token = useSelector((state: StoreState) => state.common.user.token);

	useEffect(() => {
		const fetchApi = async () => {
			if (producer === undefined || isLoading) {
				try {
					let response = await fetch('http://127.0.0.1:5000/producers', {
						headers: {
							Authorization: 'Bearer ' + token,
							Accept: 'application/json',
							'Content-Type': 'application/json',
						},
					});
					let json = await response.json();
					setProducer(json);
					setIsLoading(true);
				} catch (e) {
					console.log('Error to get data: ' + e);
				}
			}
		};
		fetchApi();
	}, [producer, isLoading, token]);

	const handleCloseEdit = () => {
		setShowModalEdit(false);
	};

	const handleShowEdit = (item: Producer) => {
		setProducerId(item._id.$oid);
		setProducerState(item.state);
		setProducerName(item.name);
		setProducerEmail(item.email);
		setProducerPassword(item.password);
		setProducerCountry(item.country);
		setProducerlocation(item.location);
		setProducerPostalCode(item.postal_code);
		setProducerSocial(item.social);
		setProducerLogo(item.logo);
		setProduceraddress(item.address);
		setProducerTin(item.tin);
		setProducerTelephone(item.telephone);
		setShowModalEdit(true);
	};

	const handleCloseDelete = () => {
		setShowModalDelete(false);
	};

	const handleShowDelete = (item: Producer) => {
		setProducerId(item._id.$oid);
		setProducerName(item.name);
		setShowModalDelete(true);
	};

	const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProducerState(e.target.value);
	};

	const modalEdit = () => {
		return (
			<Modal show={showModalEdit} onHide={handleCloseEdit} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title style={{ color: '#8A3535', fontFamily: 'Artifika', fontWeight: 'bold' }}>
						Editar estado do produtor
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>Nome do Produtor: {producerName}</Modal.Body>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formBasicRange">
							<Form.Label style={{ fontFamily: 'Artifika' }}>
								Estado da conta do produtor {producerName}
							</Form.Label>
							<Form.Control required onChange={handleType} as="select" defaultValue={producerState}>
								<option>Conta Aceite</option>
								<option>Conta Rejeitada</option>
							</Form.Control>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseEdit}>
						Cancelar
					</Button>
					<Button variant="primary" onClick={() => handleEdit()}>
						Guardar
					</Button>
				</Modal.Footer>
			</Modal>
		);
	};

	const modalDelete = () => {
		return (
			<Modal show={showModalDelete} onHide={handleCloseDelete} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title style={{ color: '#8A3535', fontFamily: 'Artifika', fontWeight: 'bold' }}>
						Eliminar o produtor
					</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ fontFamily: 'Artifika' }}>
					Pretende eliminar o utilizador {producerName}?
				</Modal.Body>
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

	const handleEdit = async () => {
		handleCloseEdit();
		try {
			await fetch('http://127.0.0.1:5000/producer', {
				method: 'PUT',
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: producerId,
					logo: producerLogo,
					email: producerEmail,
					password: producerPassword,
					country: producerCountry,
					location: producerlocation,
					name: producerName,
					postal_code: producerPostalCode,
					social: producerSocial,
					state: producerState,
					address: produceraddress,
					telephone: producerTelephone,
					tin: producerTin,
				}),
			});
			alert('Estado editado com sucesso!');
		} catch (e) {
			console.log('Error to Edit Producer: ' + e);
		}
	};

	const handleDelete = async () => {
		handleCloseDelete();
		try {
			await fetch('http://127.0.0.1:5000/producer', {
				method: 'DELETE',
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: producerId,
				}),
			});
			alert('Produtor eliminado com sucesso!');
			window.location.reload();
		} catch (e) {
			console.log('Error to Delete Producer: ' + e);
		}
	};

	const editSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearched(true);
		setSearchTerm(e.target.value);
	};

	const data = (value: string) => {
		if (producer !== undefined && producer !== null) {
			const name = Object.values(producer).filter((a: Producer) =>
				a.name.toLowerCase().includes(value.toLocaleLowerCase())
			);
			if (name.length === 0) {
				return (
					<tr>
						<td colSpan={9}>Não existem dados para mostrar</td>
					</tr>
				);
			} else {
				return producer
					.filter((producer) => producer.name.toLowerCase().includes(value.toLowerCase()))
					.map((item, index) => {
						return (
							<tr key={index}>
								<td>{item.name}</td>
								<td>{item.address}</td>
								<td>{item.postal_code}</td>
								<td>{item.country}</td>
								<td>{item.location}</td>
								<td>{item.telephone}</td>
								<td>
									<Image src={item.logo} width={30} height={30}></Image>
								</td>
								<td>{item.email}</td>
								<td>{item.state}</td>
								<td>
									<AiFillEdit
										size="25"
										onClick={() => handleShowEdit(item)}
										style={{ color: '#9B3939' }}
									/>
									{showModalEdit ? modalEdit() : false}
								</td>
								<td>
									<AiFillDelete
										size="25"
										onClick={() => handleShowDelete(item)}
										style={{ color: '#9B3939' }}
									/>
									{showModalDelete ? modalDelete() : false}
								</td>
							</tr>
						);
					});
			}
		}
	};

	const checkPermissions = () => {
		if ((isLogged === false || type !== 'admin') && isLoading === false) {
			return <Redirect to="/noPermissions" />;
		}
	};

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

	return (
		<>
			<div>
				<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
					<Row id="row">
						<Col sm={1} />
						<Col sm={5} style={{ marginTop: 35 }}>
							<h1 style={{ color: '#8A3535', fontFamily: 'Artifika' }}>Produtores</h1>
						</Col>
						<Col sm={2} />
						<Col sm={3} style={{ marginTop: 35 }}>
							<Form className="mr-auto">
								<InputGroup className="mb-2">
									<FormControl type="text" placeholder="Pesquisar" />
									<InputGroup.Append>
										<InputGroup.Text style={{ backgroundColor: '#9b3939', color: 'white' }}>
											<AiOutlineSearch />
										</InputGroup.Text>
									</InputGroup.Append>
								</InputGroup>
							</Form>
						</Col>
						<Col sm={1} />
					</Row>
				</Tab.Container>
				<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
					<Row id="row" style={{ marginBottom: 200 }}>
						<Col sm={1} />
						<Col sm={10}>
							<Card
								style={{
									color: '#9B3939',
									fontFamily: 'artifika',
									marginTop: 40,
								}}
							>
								<Table
									style={{
										color: 'black',
										fontFamily: 'artifika',
										alignItems: 'center',
										justifyContent: 'center',
										textAlign: 'center',
									}}
								>
									<th>Nome</th>
									<th>Rua</th>
									<th>Código-postal</th>
									<th>País</th>
									<th>Região</th>
									<th>Telefone</th>
									<th>Logótipo</th>
									<th>E-mail</th>
									<th>Estado</th>
									<th></th>
									<tbody>
										{producer == null ? (
											<tr>
												<td colSpan={9}>Não existem produtores para mostrar</td>
											</tr>
										) : (
											data(searchTerm)
										)}
									</tbody>
								</Table>
							</Card>
						</Col>
						<Col sm={1} />
					</Row>
				</Tab.Container>
			</div>
		</>
	);
};
