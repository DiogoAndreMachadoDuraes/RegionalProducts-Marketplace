import React, { useState } from 'react';
import { Col, Container, Form, Row, Button, Image, InputGroup, Alert, Breadcrumb } from 'react-bootstrap';
import { AiOutlineUser, AiTwotoneLock } from 'react-icons/ai';
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';
import { useHistory } from 'react-router-dom';

export const EditProducer: React.FC = () => {
	const Spacer = require('react-spacer');

	const userId = useSelector((state: StoreState) => state.common.user.id);
	const producerInfo = useSelector((state: StoreState) => state.producer.producer);
	const token = useSelector((state: StoreState) => state.common.user.token);
	const history = useHistory();

	const [isPasswordShown, setIsPasswordShown] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [email, setEmail] = useState(producerInfo.email);
	const [country, setCountry] = useState(producerInfo.country);
	const [address, setAddress] = useState(producerInfo.address);
	const [location, setLocation] = useState(producerInfo.location);
	const [name, setName] = useState(producerInfo.name);
	const [postalCode, setPostalCode] = useState(producerInfo.postal_code);
	const [telephone, setTelephone] = useState(producerInfo.telephone);
	const [tin, setTin] = useState(producerInfo.tin);
	const [logo, setLogo] = useState(producerInfo.logo);
	const [socialNetwork, setSocialNetwork] = useState(producerInfo.social_network);

	const [showEditProducer, setShowEditProducer] = useState(false);

	const togglePasswordVisiblity = () => {
		setIsPasswordShown(!isPasswordShown);
	};

	const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleTin = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTin(parseInt(e.target.value));
	};

	const handleSocialNetwork = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSocialNetwork(e.target.value);
	};

	const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLogo(e.target.value);
	};

	const handleTelephone = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTelephone(e.target.value);
	};

	const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAddress(e.target.value);
	};

	const handleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocation(e.target.value);
	};

	const handleCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCountry(e.target.value);
	};

	const handlePostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPostalCode(e.target.value);
	};

	const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(e.target.value);
	};

	const showAlert = () => {
		window.setTimeout(() => {
			setShowEditProducer(false);
		}, 5000);
	};

	const handleSubmit = async () => {
		try {
			await fetch('http://127.0.0.1:5000/producer', {
				method: 'PUT',
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: userId,
					email: email,
					logo: logo,
					password: password,
					country: country,
					location: location,
					name: name,
					postal_code: postalCode,
					region: location,
					social_network: socialNetwork,
					state: producerInfo.state,
					address: address,
					telephone: telephone,
					tin: tin,
				}),
			});
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			setShowEditProducer(true);
			showAlert();
		} catch (e) {
			console.log('Error to edit producer: ');
		}
	};

	return (
		<>
			<Alert key={'success'} variant={'success'} show={showEditProducer} style={{ textAlign: 'center' }}>
				As informações da sua conta foram alteradas com sucesso
			</Alert>
			<div>
				<Breadcrumb style={{ marginTop: 20, marginLeft: 38 }} id="breadcrumb">
					<Breadcrumb.Item onClick={() => history.push('/')}>
						<span style={{ fontFamily: 'artifika', color: '#9B3939' }}>Home</span>
					</Breadcrumb.Item>
					<Breadcrumb.Item onClick={() => history.push('/producerProfile')}>
						<span style={{ fontFamily: 'artifika', color: '#9B3939' }}>Perfil</span>
					</Breadcrumb.Item>
					<Breadcrumb.Item active style={{ color: '#9B3939' }}>
						<span style={{ fontFamily: 'artifika', color: 'black' }}>Editar Perfil</span>
					</Breadcrumb.Item>
				</Breadcrumb>
			</div>
			<Container>
				<br />
				<h3 style={{ color: '#8A3535', fontFamily: 'Artifika', textAlign: 'center' }}>
					Editar Informação da Conta de {name}
				</h3>
				<br />
				<br />
				<Row>
					<Row>
						<Col sm={4} />
						<Col sm={4}>
							<Image src={logo} width={100} height={100} style={{ marginLeft: 300 }} roundedCircle />
						</Col>
						<Col sm={4} />
					</Row>
				</Row>
				<br />
				<Row>
					<Col md={30}>
						<Spacer horizontal="10px" />
						<h5 style={{ fontFamily: 'Artifika' }}>
							<AiOutlineUser size="24" color="#8A3535" />
							Informação Pessoal
						</h5>
					</Col>
					<Col md={{ span: 11, offset: 11 }}></Col>
				</Row>
				<br />
				<Row>
					<Col>
						<Form.Label style={{ fontFamily: 'Artifika' }}>Nome Completo </Form.Label>
						<Form.Control onChange={handleName} defaultValue={name} />
					</Col>

					<Col>
						<Form.Label style={{ fontFamily: 'Artifika' }}>Rede Social </Form.Label>
						<Form.Control onChange={handleSocialNetwork} defaultValue={socialNetwork} />
					</Col>
				</Row>
				<br />
				<Row>
					<Col>
						<Form.Label style={{ fontFamily: 'Artifika' }}>Morada </Form.Label>
						<Form.Control onChange={handleAddress} defaultValue={address} />
					</Col>
					<Col>
						<Form.Label style={{ fontFamily: 'Artifika' }}>Código Postal </Form.Label>
						<Form.Control onChange={handlePostalCode} defaultValue={postalCode} />
					</Col>
				</Row>
				<br />
				<Row>
					<Col>
						<Form.Label style={{ fontFamily: 'Artifika' }}>Contacto </Form.Label>
						<Form.Control onChange={handleTelephone} defaultValue={telephone} />
					</Col>
					<Col>
						<Form.Label style={{ fontFamily: 'Artifika' }}>Região </Form.Label>
						<Form.Control onChange={handleLocation} defaultValue={location} />
					</Col>
				</Row>
				<br />
				<Row>
					<Col md={6}>
						<Form.Label style={{ fontFamily: 'Artifika' }}>Número de Contribuinte </Form.Label>
						<Form.Control onChange={handleTin} defaultValue={tin} />
					</Col>
					<Col>
						<Form.Label style={{ fontFamily: 'Artifika' }}>País </Form.Label>
						<Form.Control required onChange={handleCountry} as="select" defaultValue={country}>
							<option>Portugal</option>
							<option>Espanha</option>
						</Form.Control>
					</Col>
				</Row>

				<br />
				<Row>
					<Col md={3}>
						<h5 style={{ marginTop: 20, fontFamily: 'Artifika' }}>
							<AiTwotoneLock size="20" color="#8A3535" />
							Informação de Login
						</h5>
					</Col>
				</Row>
				<br />
				<Row>
					<Col md={6}>
						<Form.Label style={{ fontFamily: 'Artifika' }}>Email </Form.Label>
						<Form.Control onChange={handleEmail} defaultValue={email} />
					</Col>
				</Row>
				<br />
				<Row>
					<Col>
						<Form.Label style={{ fontFamily: 'artifika' }}>Palavra-Passe </Form.Label>
						<InputGroup className="mb-1">
							<Form.Control
								placeholder="Palavra-Passe"
								onChange={handlePassword}
								defaultValue={password}
								name="password"
								type={isPasswordShown ? 'text' : 'password'}
								style={{ color: 'black', opacity: 1 }}
							/>
							<InputGroup.Append>
								<InputGroup.Text id="inputGroupAppend" style={{ backgroundColor: 'white' }}>
									{isPasswordShown ? (
										<BsFillEyeFill
											onClick={togglePasswordVisiblity}
											size="20"
											style={{ color: '#9B3939' }}
										/>
									) : (
										<BsFillEyeSlashFill
											onClick={togglePasswordVisiblity}
											size="20"
											style={{ color: '#9B3939' }}
										/>
									)}
								</InputGroup.Text>
							</InputGroup.Append>
						</InputGroup>
					</Col>
					<Col>
						<Form.Label style={{ fontFamily: 'artifika' }}>Confirmar Palavra-Passe</Form.Label>
						<InputGroup className="mb-1">
							<Form.Control
								placeholder="Confirmar Palavra-Passe"
								onChange={handleConfirmPassword}
								defaultValue={confirmPassword}
								name="password"
								type={isPasswordShown ? 'text' : 'password'}
								style={{ color: 'black', opacity: 1 }}
							/>
							<InputGroup.Append>
								<InputGroup.Text id="inputGroupAppend" style={{ backgroundColor: 'white' }}>
									{isPasswordShown ? (
										<BsFillEyeFill
											onClick={togglePasswordVisiblity}
											size="20"
											style={{ color: '#9B3939' }}
										/>
									) : (
										<BsFillEyeSlashFill
											onClick={togglePasswordVisiblity}
											size="20"
											style={{ color: '#9B3939' }}
										/>
									)}
								</InputGroup.Text>
							</InputGroup.Append>
						</InputGroup>
					</Col>
				</Row>
				<br />
				<br />
				<br />
				<Row
					style={{
						display: 'flex',
						justifyContent: 'center',
						textAlign: 'center',
					}}
				>
					<Button
						variant="dark"
						onClick={handleSubmit}
						disabled={password !== confirmPassword || confirmPassword === '' || password === ''}
						style={{
							color: 'white',
							backgroundColor: '#9B3939',
							fontFamily: 'artifika',
						}}
					>
						Submeter alterações
					</Button>
				</Row>
				<br />
				<br />
				<br />
			</Container>
		</>
	);
};
