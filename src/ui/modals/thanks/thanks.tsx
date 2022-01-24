import React, { useState } from 'react';
import { Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';
import { CartList } from 'ui';
import moment from 'moment';
import axios from 'axios';

interface ModalTanksProps {
	show: boolean;
	item?: CartList[];
	price: number;
	onHide: () => void;
}

export const Thanks: React.FC<ModalTanksProps> = ({ show, item, price, onHide }) => {
	const [avaliation, setAvaliation] = useState('');

	const token = useSelector((state: StoreState) => state.common.user.token);
	const country = useSelector((state: StoreState) => state.common.client.country);
	const tin = useSelector((state: StoreState) => state.common.client.tin);
	const address = useSelector((state: StoreState) => state.common.client.address);
	const postalCode = useSelector((state: StoreState) => state.common.client.postal_code);
	const telephone = useSelector((state: StoreState) => state.common.client.telephone);
	const location = useSelector((state: StoreState) => state.common.client.location);
	const userId = useSelector((state: StoreState) => state.common.user.id);

	const handleClick = async () => {
		// eslint-disable-next-line array-callback-return
		item?.map((product) => {
			try {
				fetch('http://127.0.0.1:5000/shop', {
					method: 'POST',
					headers: {
						Authorization: 'Bearer ' + token,
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						country_client: country,
						date: moment().format('YYYY/MM/DD'),
						email_client: product.email_client,
						pdf_invoice: '',
						hour: moment().format('HH:mm:ss'),
						id_client: product.id_client,
						id_product: product.id_product,
						photo_product: product.photo_product,
						location_client: location,
						telephone_client: telephone,
						postal_code: postalCode,
						price_final: price < 49.99 ? price + 4.99 : price,
						quantity_final: product.quantity,
						address_client: address,
						tax: price < 49.99 ? ((price + 4.99) * 0.23).toFixed(2) : (price * 0.23).toFixed(2),
						tin_client: tin,
						vat: '23%',
						avaliation: avaliation,
						name_product: product.name_product,
						status: 'Em processamento',
					}),
				});
			} catch (e) {
				console.log('Error to post order: ' + e);
			}
		});
		try {
			await axios.delete(`http://127.0.0.1:5000/cart/client/` + userId, {
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
		} catch (e) {
			console.log('Error to delete cart: ' + e);
		}
		onHide();
	};

	return (
		<Modal size="lg" show={show} onHide={onHide} centered={true} backdrop="static" keyboard={false}>
			<Modal.Body>
				<div style={{ padding: '20px' }}>
					<Modal.Title
						style={{ marginTop: 20, textAlign: 'center', color: '#9B3939', fontFamily: 'artifika' }}
					>
						Obrigado pela sua compra!
					</Modal.Title>
					<p style={{ marginTop: 14, fontFamily: 'artifika', fontSize: 14, textAlign: 'center' }}>
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
										onClick={handleClick}
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
						<Button
							variant="link"
							style={{ color: '#9B3939', fontFamily: 'artifika' }}
							onClick={handleClick}
						>
							Não pretende avaliar?
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};
