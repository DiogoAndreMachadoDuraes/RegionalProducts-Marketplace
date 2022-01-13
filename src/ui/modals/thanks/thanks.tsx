import React, { useState } from 'react';
import { Row, Col, Button, Form, Modal } from 'react-bootstrap';

export const Thanks: React.FC = () => {
	const [show, setShow] = useState(true);
	const [avaliation, setAvaliation] = useState('1');

	const handleClose = () => setShow(false);

	/* const postAvaliation = async () => {
		const { orderId, avaliation, token } = this.state;
		try {
			await fetch('http://127.0.0.1:5000/avaliation', {
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: orderId,
					avaliation: avaliation,
				}),
			});
			this.setState({ showSucess: true });
			setTimeout(function () {
				window.location.reload();
			}, 5000);
		} catch (e) {
			console.log('Error to post Avaliation: ' + e);
			this.setState({ showFailure: true });
			setTimeout(function () {
				window.location.reload();
			}, 5000);
		}
	}; */

	return (
		<Modal size="lg" show={show} onHide={handleClose} centered={true} backdrop="static" keyboard={false}>
			<Modal.Body>
				<div style={{ padding: '20px' }}>
					<Modal.Title style={{ marginTop: 20, textAlign: 'center', color: '#9B3939' }}>
						Obrigado pela sua compra!
					</Modal.Title>
					<p style={{ marginTop: 14, fontSize: 14, textAlign: 'center' }}>
						Agradecemos a sua compra e gostariamos de receber a sua avaliação.
					</p>
					<Row id="row">
						<Col sm={2} />
						<Col sm={8} style={{ color: 'black', fontFamily: 'artifika' }}>
							<Row id="row" style={{ marginTop: 60, marginLeft: 25 }}>
								<Col sm={8} style={{ color: 'black', fontFamily: 'artifika' }}>
									<Form>
										<Form.Group controlId="formBasicRange">
											<Form.Label style={{ fontWeight: 'bold' }}>Avaliação da compra:</Form.Label>
											<Form.Control
												required
												as="select"
												defaultValue={avaliation}
												onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
													setAvaliation(e.target.value)
												}
											>
												<option value="1">1 - Muito Fraco</option>
												<option value="2">2 - Fraco</option>
												<option value="3">3 - Normal</option>
												<option value="4">4 - Bom</option>
												<option value="5">5 - Excelente</option>
											</Form.Control>
										</Form.Group>
									</Form>
								</Col>
								<Col sm={4}>
									<Button
										type="submit"
										className="mb-2"
										/* onClick={postRate} */
										style={{
											backgroundColor: '#9B3939',
											color: 'white',
											marginTop: 30,
										}}
									>
										Submeter
									</Button>
								</Col>
							</Row>
						</Col>
						<Col sm={2} />
					</Row>
					<div style={{ textAlign: 'center', marginTop: 25, marginBottom: 20 }}>
						<Button variant="link" style={{ color: '#9B3939' }} onClick={handleClose}>
							Não pretende avaliar?
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};
