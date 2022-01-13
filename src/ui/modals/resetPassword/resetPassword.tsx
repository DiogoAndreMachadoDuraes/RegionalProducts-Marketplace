import React, { useState } from 'react';
import { Modal, Row, Col, Button, Form } from 'react-bootstrap';
import { GiUnlocking } from 'react-icons/gi';

export const ResetPassword: React.FC = () => {
	const [show, setShow] = useState(true);
	const [email, setEmail] = useState<string | undefined>(undefined);
	const [isValidEmail, setIsValidEmail] = useState(true);

	const handleClose = () => setShow(false);

	const handleCheckEmail = (email: string) => {
		setEmail(email);
		const expression = /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)$/;
		var validEmail = expression.test(String(email).toLowerCase());

		if (!validEmail) {
			setIsValidEmail(false);
		} else {
			setIsValidEmail(true);
		}
	};

	const handleSendEmail = async () => {
		// TODO DD - send email
		/* try {
			let response = await fetch('http://127.0.0.1:5000/auth', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					
				}),
			});
			let json = await response.json();
		} catch (e) {
			console.log('Error to Reset Password: ' + e);
		} */
	};

	return (
		<Modal size="lg" show={show} onHide={handleClose} centered={true}>
			<Modal.Body>
				<div style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
					<Row id="row">
						<Col sm={1} />
						<Col sm={1} style={{ color: 'black', fontFamily: 'artifika' }}>
							<GiUnlocking size="40" style={{ color: 'black', marginLeft: 20, marginTop: 50 }} />
						</Col>
						<Col
							sm={9}
							style={{
								marginLeft: 20,
								marginTop: 50,
								color: '#9B3939',
								fontFamily: 'artifika',
							}}
						>
							<h3>Repor palavra-passe</h3>
						</Col>
						<Col sm={1} />
					</Row>
					<Row id="row">
						<Col sm={2} />
						<Col
							sm={8}
							style={{
								marginTop: 35,
								color: 'black',
								fontFamily: 'artifika',
							}}
						>
							<p>
								Digite o seu endereço de e-mail abaixo.
								<br />
								Receberá um link para redefinir a sua palavra-passe.
							</p>
						</Col>
						<Col sm={2} />
					</Row>
					<Row id="row">
						<Col sm={2} />
						<Col
							sm={8}
							style={{
								marginTop: 35,
								color: 'black',
								fontFamily: 'artifika',
							}}
						>
							<p>Email</p>
						</Col>
						<Col sm={2} />
					</Row>
					<Row id="row">
						<Col sm={1} />
						<Col
							sm={10}
							style={{
								marginLeft: 10,
								color: 'black',
								fontFamily: 'artifika',
								marginBottom: 50,
							}}
						>
							<Form>
								<Row id="row">
									<Col sm={1} />
									<Col
										sm={8}
										style={{
											color: 'black',
											fontFamily: 'artifika',
										}}
									>
										<Form.Control
											placeholder="Digite o seu e-mail..."
											type="email"
											className={isValidEmail ? 'form-control' : 'form-control is-invalid'}
											name="email"
											value={email}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												handleCheckEmail(e.target.value)
											}
											style={{
												backgroundColor: '#FFFFFF',
												width: 350,
												color: 'black',
											}}
										/>
										{!isValidEmail && (
											<span style={{ color: 'red', fontSize: 12 }}>
												O seu e-mail não é válido!
											</span>
										)}
									</Col>
									<Col
										sm={2}
										style={{
											color: 'black',
											fontFamily: 'artifika',
										}}
									>
										<Button
											type="submit"
											className="mb-2"
											href="login"
											onClick={handleSendEmail}
											disabled={!isValidEmail}
											style={{
												backgroundColor: '#9B3939',
												color: 'white',
											}}
										>
											Submeter
										</Button>
									</Col>
									<Col sm={1} />
								</Row>
							</Form>
						</Col>
						<Col sm={1} />
					</Row>
				</div>
			</Modal.Body>
		</Modal>
	);
};
