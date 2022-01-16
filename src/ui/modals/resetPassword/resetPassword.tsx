import React, { useState } from 'react';
import { Modal, Row, Col, Button, Form, ModalProps } from 'react-bootstrap';
import { GiUnlocking } from 'react-icons/gi';
import { useHistory } from 'react-router-dom';
import emailjs from '@emailjs/browser';

export const ResetPassword: React.FC<ModalProps> = ({ show, onHide }) => {
	const history = useHistory();
	const [email, setEmail] = useState<string | undefined>(undefined);
	const [isValidEmail, setIsValidEmail] = useState(true);

	const handleChangeEmail = (email: string) => {
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

	const handleSendEmail = () => {
		if (email !== undefined) {
			const newPassword = Math.random().toString(36).slice(-8);

			emailjs.send(
				'service_zbuc09s',
				'template_rgz2mxs',
				{
					message: newPassword,
					reply_to: email,
				},
				'user_DC9PAIZiNcmpGHPruC1FU'
			);

			history.push('/login');
		}
	};

	return (
		<Modal size="lg" show={show} onHide={onHide} centered={true}>
			<Modal.Body>
				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 22 }}>
					<Row id="row">
						<Col sm={1} />
						<Col sm={1} style={{ color: 'black', fontFamily: 'artifika' }}>
							<GiUnlocking size="40" style={{ color: '#9B3939', marginLeft: 20, marginTop: 50 }} />
						</Col>
						<Col
							sm={9}
							style={{
								marginLeft: 20,
								marginTop: 50,
								color: 'black',
								fontWeight: 600,
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
											value={email || ''}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												handleChangeEmail(e.target.value)
											}
											onBlur={handleCheckEmail}
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
											className="mb-2"
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
