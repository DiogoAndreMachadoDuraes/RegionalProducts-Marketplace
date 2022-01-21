import React from 'react';
import { Col, Row, Form, Container, InputGroup, Button } from 'react-bootstrap';
import { AiOutlineUser, AiTwotoneLock } from 'react-icons/ai';
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
import { ModalSuccess } from './modalSuccess';
import { useProducerRegister } from './useProducerRegister';

export const ProducerRegister: React.FC = () => {
	const {
		show,
		name,
		password,
		confirmPassword,
		checkbox,
		isPasswordShown,
		handleChangeCheckbox,
		handleName,
		handleTin,
		handleTelephone,
		handleStreet,
		handlePostalCode,
		handleLocation,
		handleSocial,
		handleRegion,
		handleCountry,
		handleLogo,
		handleEmail,
		handlePassword,
		togglePasswordVisiblity,
		handleClose,
		handleLogin,
		handleSubmit,
		handleConfirmPassword,
	} = useProducerRegister();

	return (
		<>
			<Container>
				<br />
				<br />
				<br />
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<h2 style={{ color: '#9B3939', fontFamily: 'artifika' }}>Criar Conta Produtor</h2>
				</div>
				<br />
				<br />
				<Row>
					<AiOutlineUser size="25" color="#9B3939" />
					<h5 style={{ marginLeft: 5, fontFamily: 'artifika', fontWeight: 'bold' }}>Informação Pessoal</h5>
				</Row>
				<br />
				<Row>
					<Col>
						<Form.Label style={{ fontFamily: 'artifika' }}>Nome Completo </Form.Label>
						<Form.Control placeholder="Nome Completo" required onChange={handleName} />
					</Col>
					<Col>
						<Form.Label style={{ fontFamily: 'artifika' }}>Número de Contribuinte </Form.Label>
						<Form.Control
							type="number"
							placeholder="Número de Contribuinte"
							required
							onChange={handleTin}
						/>
					</Col>
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
				</Row>
				<br />
				<Row>
					<Col>
						<Form.Label style={{ fontFamily: 'artifika' }}>Rua</Form.Label>
						<Form.Control placeholder="Rua" required onChange={handleStreet} />
					</Col>
					<Col>
						<Form.Label style={{ fontFamily: 'artifika' }}>Código Postal </Form.Label>
						<Form.Control
							id="postal_code"
							type="number"
							placeholder="Código Postal"
							required
							onChange={handlePostalCode}
						/>
					</Col>
					<Col>
						<Form.Label style={{ fontFamily: 'artifika' }}>Localidade </Form.Label>
						<Form.Control placeholder="Localidade" required onChange={handleLocation} />
					</Col>
				</Row>
				<br />
				<Row>
					<Col>
						<Form.Label style={{ fontFamily: 'artifika' }}>Rede Social </Form.Label>
						<Form.Control placeholder="Rede Social" onChange={handleSocial} />
					</Col>
					<Col>
						<Form.Label style={{ fontFamily: 'artifika' }}>Região</Form.Label>
						<Form.Control placeholder="Região" required onChange={handleRegion} />
					</Col>
					<Col>
						<Form.Label style={{ fontFamily: 'artifika' }}>País </Form.Label>
						<Form.Control title="País" as="select" required onChange={handleCountry}>
							<option>Portugal</option>
							<option>Espanha</option>
						</Form.Control>
					</Col>
				</Row>
				<br />
				<Row>
					<Col md={6}>
						<Form.Label style={{ fontFamily: 'artifika' }}> Comprovativo das finanças </Form.Label>
						<Form.Group>
							<Form.File
								id="custom-file-translate-html"
								label="Escolher ficheiro"
								data-browse="Procurar"
								custom
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.File id="insertLogo" label="Inserir logotipo" onChange={handleLogo} />
						</Form.Group>
					</Col>
				</Row>
				<br />
				<br />
				<Row>
					<AiTwotoneLock size="25" color="#9B3939" />
					<h5 style={{ marginLeft: 5, fontFamily: 'artifika', fontWeight: 'bold' }}>Informação de Login</h5>
				</Row>
				<br />
				<Row>
					<Col md={6}>
						<Form.Label style={{ fontFamily: 'artifika' }}>Email </Form.Label>
						<Form.Control placeholder="Email" onChange={handleEmail} />
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
								value={confirmPassword}
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
				<ModalSuccess show={show} handleClose={handleClose} name={name} handleLogin={handleLogin} />
				<Row style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
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
						Criar Conta
					</Button>
				</Row>
				<br />
				<br />
				<br />
				<br />
			</Container>
		</>
	);
};
