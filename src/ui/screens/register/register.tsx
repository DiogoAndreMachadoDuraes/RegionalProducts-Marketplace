import React, { useState } from 'react';
import { Container, Row, Col, Button, InputGroup, Form, Alert } from 'react-bootstrap';
import { AiOutlineUser, AiTwotoneLock } from 'react-icons/ai';
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { list } from './list';
import axios from 'axios';
import './style.css';

export const Register: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [birthday, setBirthday] = useState('');
	const [country, setCountry] = useState('');
	const [location, setLocation] = useState('');
	const [name, setName] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [address, setAddress] = useState('');
	const [telephone, setTelephone] = useState('');
	const [tin, setTin] = useState('');
	const [checkbox, setCheckbox] = useState(false);
	const [showAlertRegister, setShowAlertRegister] = useState(false);
	const [isPasswordShown, setIsPasswordShown] = useState(false);

	const togglePasswordVisiblity = () => {
		setIsPasswordShown(!isPasswordShown);
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

	const handleBirthday = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBirthday(e.target.value);
	};

	const handleCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCountry(e.target.value);
	};

	const handleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocation(e.target.value);
	};

	const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handlePostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPostalCode(e.target.value);
	};

	const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAddress(e.target.value);
	};

	const handleTelephone = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTelephone(e.target.value);
	};

	const handleTin = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTin(e.target.value);
	};

	const handleChangeCheckbox = () => {
		setCheckbox(!checkbox);
	};

	const showAlert = () => {
		window.setTimeout(() => {
			setShowAlertRegister(false);
		}, 5000);
	};

	const handleSubmit = () => {
		axios.post('http://127.0.0.1:5000/register', {
			tin: tin,
			name: name,
			birthday: birthday,
			telephone: telephone,
			address: address,
			location: location,
			country: country,
			postal_code: postalCode,
			password: password,
			email: email,
			state: 'Ativo',
			photo: '',
		});
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		setShowAlertRegister(true);
		showAlert();
	};

	return (
		<>
			<Alert key={'success'} variant={'success'} show={showAlertRegister} style={{ textAlign: 'center' }}>
				Conta de cliente criada com sucesso!
			</Alert>
			<Container>
				<br />
				<br />
				<br />
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<h2 style={{ color: '#9B3939', fontFamily: 'artifika' }}>Criar Conta Cliente</h2>
				</div>
				<br />
				<br />
				<Row>
					<AiOutlineUser size="25" color="#9B3939" />
					<h5 style={{ marginLeft: 5, fontFamily: 'artifika', fontWeight: 'bold' }}>Informação Pessoal</h5>

					<Link
						to="/producerregister"
						style={{ fontFamily: 'artifika', color: '#9B3939', fontWeight: 'bold', marginLeft: '385px' }}
					>
						Gostaria de registar-se como Produtor? Clique aqui!
					</Link>
				</Row>
				<br />
				<form onSubmit={handleSubmit}>
					<Row>
						<Col>
							<Form.Label style={{ fontFamily: 'artifika' }}>Nome Completo </Form.Label>
							<Form.Control placeholder="Nome Completo" required onChange={handleName} />
						</Col>
						<Col>
							<Form.Label style={{ fontFamily: 'artifika' }}>Data de Nascimento </Form.Label>
							<Form.Control
								id="birthday"
								max="2003-01-21"
								type="date"
								placeholder="Data de Nascimento"
								required
								onChange={handleBirthday}
							/>
						</Col>
					</Row>
					<br />
					<Row>
						<Col>
							<Form.Label style={{ fontFamily: 'artifika' }}>Morada </Form.Label>
							<Form.Control
								id="street"
								type="text"
								placeholder="Morada"
								required
								onChange={handleAddress}
							/>
						</Col>
						<Col>
							<Form.Label style={{ fontFamily: 'artifika' }}>Código Postal </Form.Label>
							<Form.Control
								id="postal_code"
								type="text"
								placeholder="Código Postal"
								required
								onChange={handlePostalCode}
							/>
						</Col>
					</Row>
					<br />
					<Row>
						<Col>
							<Form.Label style={{ fontFamily: 'artifika' }}>Contacto </Form.Label>
							<Form.Control
								id="telephone"
								type="number"
								placeholder="Contacto"
								required
								onChange={handleTelephone}
							/>
						</Col>
						<Col>
							<Form.Label style={{ fontFamily: 'artifika' }}>Localidade </Form.Label>
							<Form.Control
								id="locality"
								type="text"
								placeholder="Localidade"
								required
								onChange={handleLocation}
							/>
						</Col>
					</Row>

					<br />
					<Row>
						<Col md={6}>
							<Form.Label style={{ fontFamily: 'artifika' }}>Número de Contribuinte </Form.Label>
							<Form.Control
								id="tin"
								type="number"
								placeholder="Número de Contribuinte"
								required
								onChange={handleTin}
							/>
						</Col>
						<Col>
							<Form.Label style={{ fontFamily: 'artifika' }}>País </Form.Label>
							<Form.Control as="select" required onChange={handleCountry}>
								{list.map((i, index) => (
									<option key={index}>{i.name}</option>
								))}
							</Form.Control>
						</Col>
					</Row>
					<br />
					<br />
					<br />
					<Row>
						<AiTwotoneLock size="25" color="#9B3939" />
						<h5 style={{ marginLeft: 5, fontFamily: 'artifika', fontWeight: 'bold' }}>
							Informação de Login
						</h5>
					</Row>
					<br />
					<Row>
						<Col md={6}>
							<Form.Label style={{ fontFamily: 'artifika' }}>Email </Form.Label>
							<Form.Control
								id="email"
								type="text"
								placeholder="Email"
								required
								onChange={handleEmail}
								name="email"
								value={email}
							/>
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
					<Row style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
						<Col>
							<Form.Group controlId="formBasicCheckbox">
								<Form.Check
									style={{ fontFamily: 'artifika', color: '#9B3939', fontWeight: 'bold' }}
									type="checkbox"
									required
									label="Aceito os Termos e Condições / Politica de Privacidade"
									checked={checkbox}
									onChange={handleChangeCheckbox}
								/>
							</Form.Group>
						</Col>
					</Row>
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
							disabled={
								password !== confirmPassword ||
								confirmPassword === '' ||
								password === '' ||
								checkbox === false
							}
							style={{
								color: 'white',
								backgroundColor: '#9B3939',
								fontFamily: 'artifika',
							}}
						>
							Criar Conta
						</Button>
					</Row>
				</form>
				<br />
			</Container>
		</>
	);
};
