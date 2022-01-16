import React from 'react';
import { images } from 'assets';
import { BsFillEyeSlashFill, BsFillEyeFill, BsEnvelopeOpen } from 'react-icons/bs';
import { InputGroup, Image, Row, Col, Form, Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ResetPassword } from 'ui';
import { useLogin } from './useLogin';

export const Login: React.FC = () => {
	const {
		handleEmail,
		email,
		isValidEmail,
		handleCheckEmail,
		password,
		handlePassword,
		handleCheckPassword,
		isShowedPassword,
		isValidPassword,
		changeShowedPassword,
		login,
		handleShow,
		show,
		handleClose,
	} = useLogin();

	return (
		<Container style={{ marginTop: 40, marginBottom: 70 }}>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<div style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
					<h1 style={{ color: '#9B3939' }}>Produtos Regionais</h1>
					<h6>Venha conhecer a nossa gama de produtos.</h6>
				</div>
				<div
					style={{
						backgroundColor: '#f9eeee',
						boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
						borderRadius: 20,
						width: 400,
						marginLeft: 250,
					}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							marginTop: 40,
							filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
						}}
					>
						<Image src={images.logoExpanded} width="250" height="120" style={{ borderRadius: 40 }} />
					</div>
					<Form inline autoComplete="off" style={{ padding: 20, marginTop: 45, justifyContent: 'center' }}>
						<Row id="row" style={{ display: 'flex', justifyContent: 'center' }}>
							<Col sm={1} />
							<Col sm={10} style={{ color: 'black', fontFamily: 'artifika' }}>
								<Form.Group controlId="formBasicEmail" style={{ color: 'black' }}>
									<InputGroup className="mb-1">
										<Form.Control
											type="email"
											className={isValidEmail ? 'form-control' : 'form-control is-invalid'}
											name="email"
											value={email || ''}
											onChange={handleEmail}
											onBlur={handleCheckEmail}
											placeholder="Email"
											style={{ color: 'black', opacity: 1 }}
										/>
										<InputGroup.Append>
											<InputGroup.Text style={{ backgroundColor: 'white' }}>
												<BsEnvelopeOpen size="20" style={{ color: 'black' }} />
											</InputGroup.Text>
										</InputGroup.Append>
									</InputGroup>
									{!isValidEmail && (
										<span style={{ color: 'red', fontSize: 12 }}>O seu e-mail não é válido!</span>
									)}
								</Form.Group>
							</Col>
							<Col sm={1} />
						</Row>
						<Row id="row" style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
							<Col sm={1} />
							<Col sm={10} style={{ color: 'black', fontFamily: 'artifika' }}>
								<Form.Group controlId="formBasicPassword" style={{ color: 'black' }}>
									<InputGroup className="mb-1">
										<Form.Control
											value={password || ''}
											onChange={handlePassword}
											onBlur={handleCheckPassword}
											className={isValidPassword ? 'form-control' : 'form-control is-invalid'}
											name="password"
											type={isShowedPassword ? 'text' : 'password'}
											placeholder="Palavra-passe"
											style={{ color: 'black', opacity: 1 }}
										/>
										<InputGroup.Append>
											<InputGroup.Text style={{ backgroundColor: 'white' }}>
												{isShowedPassword ? (
													<BsFillEyeFill
														onClick={changeShowedPassword}
														size="20"
														style={{ color: 'black' }}
													/>
												) : (
													<BsFillEyeSlashFill
														onClick={changeShowedPassword}
														size="20"
														style={{ color: 'black' }}
													/>
												)}
											</InputGroup.Text>
										</InputGroup.Append>
									</InputGroup>
									{!isValidPassword && (
										<span style={{ color: 'red', fontSize: 12 }}>
											A sua palavra-passe está incorreta!
										</span>
									)}
								</Form.Group>
							</Col>
							<Col sm={1} />
						</Row>
						<Row
							id="row"
							style={{ marginTop: 20, textAlign: 'center', display: 'flex', justifyContent: 'center' }}
						>
							<Col sm={1} />
							<Col sm={10}>
								<Button
									onClick={login}
									disabled={!email || !password || !isValidEmail || !isValidPassword}
									style={{
										color: 'white',
										fontFamily: 'artifika',
										backgroundColor: '#9B3939',
										width: 100,
										borderRadius: 5,
									}}
								>
									Entrar
								</Button>
							</Col>
							<Col sm={1} />
						</Row>
						<Row id="row" style={{ marginTop: 20, textAlign: 'center' }}>
							<Col sm={1} />
							<Col sm={10}>
								<Navbar.Text>
									<Button
										onClick={handleShow}
										style={{
											color: 'black',
											fontFamily: 'artifika',
											backgroundColor: 'transparent',
											fontSize: '15px',
											border: 0,
										}}
									>
										Esqueceu-se da palavra-passe?
									</Button>
								</Navbar.Text>
							</Col>
							<Col sm={1} />
						</Row>
						<Row id="row" style={{ marginTop: -15, textAlign: 'center', marginBottom: 7 }}>
							<Col sm={1} />
							<Col sm={10}>
								<Navbar.Text>
									<Link
										to="producerRegister"
										style={{ color: 'black', fontFamily: 'artifika', fontSize: '14px' }}
									>
										É produtor? <span style={{ fontWeight: 'bold' }}>Clique aqui!</span>
									</Link>
								</Navbar.Text>
							</Col>
							<Col sm={1} />
						</Row>
					</Form>
				</div>
			</div>
			<ResetPassword show={show} onHide={handleClose} />
		</Container>
	);
};
