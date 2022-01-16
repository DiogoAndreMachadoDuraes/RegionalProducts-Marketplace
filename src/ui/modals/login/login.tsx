import React, { useState } from 'react';
import { images } from 'assets';
import { BsFillEyeSlashFill, BsFillEyeFill, BsEnvelopeOpen } from 'react-icons/bs';
import { InputGroup, Image, Row, Col, Button, Form, Navbar, Modal, ModalProps } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { userInfo, userLogin } from 'store/User';
import { ResetPassword } from 'ui';
import axios from 'axios';

export const LoginModal: React.FC<ModalProps> = ({ show, onHide }) => {
	const [email, setEmail] = useState<string | undefined>(undefined);
	const [password, setPassword] = useState<string | undefined>(undefined);
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [isValidPassword, setIsValidPassword] = useState(true);
	const [isShowedPassword, setIsShowedPassword] = useState(false);
	const [forgetPasswordShow, setForgetPasswordShow] = useState(false);
	const history = useHistory();

	const handleEmail = (email: string) => {
		setEmail(email);
	};

	const handleCheckEmail = () => {
		const expression = /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)$/;
		var validEmail = expression.test(String(email).toLowerCase());

		if (!validEmail) {
			setIsValidEmail(false);
		} else {
			setIsValidEmail(true);
		}
	};

	const handlePassword = (password: string) => {
		setPassword(password);
	};

	const handleCheckPassword = () => {
		if (password !== undefined && password.length < 8) {
			setIsValidPassword(false);
		} else {
			setIsValidPassword(true);
		}
	};

	const changeShowedPassword = () => {
		setIsShowedPassword(!isShowedPassword);
	};

	const handleForgetPassword = () => {
		setForgetPasswordShow(!forgetPasswordShow);
	};

	const dispatch = useDispatch();

	const login = async () => {
		try {
			let response = await fetch('http://127.0.0.1:5000/auth', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			});
			let json = await response.json();
			const type: string = json.type;
			const token: string = json.token;
			const userId: string = json.id;

			try {
				const config = {
					headers: { Authorization: `Bearer ${token}` },
				};

				await axios.get(`http://127.0.0.1:5000/client/${userId}`, config).then((res) => {
					const client = res.data;
					dispatch(userInfo(client));
				});
			} catch (e) {
				console.log('Error to get Client: ' + e);
			}

			if (type === 'client') {
				dispatch(userLogin(json));
				onHide();
				history.push('/');
			} else {
				if (type === 'admin') {
					dispatch(userLogin(json));
					onHide();
					history.push('/');
				} else {
					if (type === 'producer') {
						dispatch(userLogin(json));
						onHide();
						history.push('/');
					} else {
						alert('O email e/ou palavra-passe estão incorretos!');
					}
				}
			}
		} catch (e) {
			console.log('Error to Authenticate: ' + e);
		}
	};

	return (
		<Modal size="lg" show={show} onHide={onHide} centered={true}>
			<Modal.Body>
				<div style={{ padding: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							marginTop: 55,
							marginLeft: 20,
							filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
						}}
					>
						<Image src={images.logo} width="250" height="200" style={{ borderRadius: 50 }} />
					</div>
					<div
						style={{
							marginLeft: 80,
							borderRight: '2px solid black',
						}}
					></div>
					<Form inline autoComplete="off" style={{ marginLeft: 37 }}>
						<Row id="row" style={{ display: 'flex', justifyContent: 'center' }}>
							<Col sm={1} />
							<Col sm={10} style={{ color: 'black', fontFamily: 'artifika' }}>
								<h5>E-mail</h5>
								<Form.Group controlId="formBasicEmail" style={{ color: 'black' }}>
									<InputGroup className="mb-2">
										<Form.Control
											type="email"
											className={isValidEmail ? 'form-control' : 'form-control is-invalid'}
											name="email"
											value={email || ''}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												handleEmail(e.target.value)
											}
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
								</Form.Group>
								{!isValidEmail && (
									<span style={{ color: 'red', fontSize: 12 }}>O seu e-mail não é válido!</span>
								)}
							</Col>
							<Col sm={1} />
						</Row>
						<Row id="row" style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
							<Col sm={1} />
							<Col sm={10} style={{ color: 'black', fontFamily: 'artifika' }}>
								<h5>Palavra-passe</h5>
								<Form.Group controlId="formBasicPassword" style={{ color: 'black' }}>
									<InputGroup className="mb-2">
										<Form.Control
											value={password || ''}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												handlePassword(e.target.value)
											}
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
								</Form.Group>
								{!isValidPassword && (
									<span style={{ color: 'red', fontSize: 12 }}>
										A sua palavra-passe está incorreta!
									</span>
								)}
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
									variant="light"
									size="sm"
									onClick={login}
									disabled={!email || !password || !isValidEmail || !isValidPassword}
									style={{
										color: 'white',
										fontFamily: 'artifika',
										backgroundColor: '#9B3939',
									}}
								>
									Entrar
								</Button>
							</Col>
							<Col sm={1} />
						</Row>
						<Row id="row" style={{ marginTop: 28, marginLeft: 24 }}>
							<Col sm={1} />
							<Col sm={10}>
								<Navbar.Text>
									<Button
										onClick={handleForgetPassword}
										style={{
											color: 'black',
											fontFamily: 'artifika',
											backgroundColor: 'transparent',
											border: 0,
										}}
									>
										Esqueceu-se da palavra-passe?
									</Button>
								</Navbar.Text>
								{forgetPasswordShow && <ResetPassword show={forgetPasswordShow} />}
							</Col>
							<Col sm={1} />
						</Row>
						<Row id="row" style={{ marginTop: -10, marginLeft: 45 }}>
							<Col sm={1} />
							<Col sm={10}>
								<Navbar.Text>
									<Link
										onClick={() => onHide()}
										to="producerRegister"
										style={{ color: 'black', fontFamily: 'artifika' }}
									>
										É produtor? <span style={{ fontWeight: 'bold' }}>Clique aqui!</span>
									</Link>
								</Navbar.Text>
							</Col>
							<Col sm={1} />
						</Row>
					</Form>
				</div>
			</Modal.Body>
		</Modal>
	);
};
