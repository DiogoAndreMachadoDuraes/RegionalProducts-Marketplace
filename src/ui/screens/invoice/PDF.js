import React from 'react';
import Pdf from 'react-to-pdf';
import { Image, Row, Col } from 'react-bootstrap';
import { images } from 'assets';
import { FaFileInvoice } from 'react-icons/fa';

const ref = React.createRef();

const PDF = (props) => {
	return (
		<>
			<div>
				<Pdf targetRef={ref} filename="fatura.pdf">
					{({ toPdf }) => (
						<button
							onClick={toPdf}
							style={{
								marginLeft: 600,
								marginTop: 0,
								fontFamily: 'artifika',
								backgroundColor: '#9B3939',
								color: 'white',
							}}
						>
							{' '}
							<FaFileInvoice size="15" style={{ color: 'white', marginTop: -5 }} /> Fatura/Recibo{' '}
						</button>
					)}
				</Pdf>
			</div>
			<div className="Invoice" ref={ref} style={{ width: 800, height: 800, marginTop: 50 }}>
				<Row id="row" style={{ marginTop: 30 }}>
					<Col sm={1} />
					<Col sm={11} style={{ color: '#9B3939', fontFamily: 'artifika' }}>
						<Row id="row">
							<Col sm={1}>
								<FaFileInvoice size="30" style={{ color: 'black' }} />
							</Col>
							<Col sm={3} style={{ color: '#9B3939', fontFamily: 'artifika' }}>
								<h3> Fatura </h3>
							</Col>
							<Col sm={8} />
						</Row>
					</Col>
				</Row>
				<Row id="row" style={{ marginTop: 40 }}>
					<Col sm={1} />
					<Col sm={5} style={{ color: 'black', fontFamily: 'artifika' }}>
						<h4>{props.name}</h4>
					</Col>
					<Col sm={2} />
					<Col sm={3} style={{ color: 'black', fontFamily: 'artifika' }}>
						<h5 className="card-text" style={{ color: 'black', fontFamily: 'artifika' }}>
							Fatura nº {props.id}
						</h5>
					</Col>
					<Col sm={1} />
				</Row>
				<Row id="row" style={{ marginTop: 20 }}>
					<Col sm={1} />
					<Col sm={5} style={{ color: 'black', fontFamily: 'artifika' }}>
						<h6>NIF: {props.tin}</h6>
					</Col>
					<Col sm={2} />
					<Col sm={3} style={{ color: 'black', fontFamily: 'artifika' }}>
						<h6 className="card-text" style={{ color: 'black', fontFamily: 'artifika' }}>
							Data: {props.date}
						</h6>
					</Col>
					<Col sm={1} />
				</Row>
				<Row id="row">
					<Col sm={1} />
					<Col sm={5} style={{ color: 'black', fontFamily: 'artifika' }}>
						<h6>{props.street},</h6>
					</Col>
					<Col sm={2} />
					<Col sm={3} style={{ color: 'black', fontFamily: 'artifika' }}>
						<h6 className="card-text" style={{ color: 'black', fontFamily: 'artifika' }}>
							Telefone: {props.telephone}
						</h6>
					</Col>
					<Col sm={1} />
				</Row>
				<Row id="row">
					<Col sm={1} />
					<Col sm={5} style={{ color: 'black', fontFamily: 'artifika' }}>
						<h6>
							{props.postalCode} {props.locality}
						</h6>
					</Col>
					<Col sm={2} />
					<Col sm={3} style={{ color: 'black', fontFamily: 'artifika' }}>
						<h6 className="card-text" style={{ color: 'black', fontFamily: 'artifika' }}>
							Email: {props.email}
						</h6>
					</Col>
					<Col sm={1} />
				</Row>
				<Row id="row" style={{ marginTop: 20 }}>
					<Col sm={12}>
						<hr style={{ backgroundColor: '#9B3939', height: 5, width: 700 }} />
					</Col>
				</Row>
				<Row id="row" style={{ textAlign: 'center' }}>
					<Col sm={1} />
					<Col sm={4}>
						<h5 className="card-text" style={{ color: 'black', fontFamily: 'artifika' }}>
							{' '}
							Descrição{' '}
						</h5>
					</Col>
					<Col sm={3}>
						<h5 className="card-text" style={{ color: 'black', fontFamily: 'artifika' }}>
							{' '}
							Quantidade{' '}
						</h5>
					</Col>
					<Col sm={3}>
						<h5 className="card-text" style={{ color: 'black', fontFamily: 'artifika' }}>
							Preço{' '}
						</h5>
					</Col>
					<Col sm={1} />
				</Row>
				<Row id="row" style={{ marginTop: 40, textAlign: 'center' }}>
					<Col sm={1} />
					<Col sm={4}>
						<Image src={images.medusa} style={{ width: 150, height: 160 }} />
					</Col>
					<Col sm={3}>
						<h5 className="card-text" style={{ color: 'black', fontFamily: 'artifika' }}>
							{' '}
							{props.quantity}
						</h5>
					</Col>
					<Col sm={3}>
						<h5 className="card-text" style={{ color: 'black', fontFamily: 'artifika' }}>
							{' '}
							€ {props.price}
						</h5>
					</Col>
					<Col sm={1} />
				</Row>
				<Row id="row">
					<Col sm={12}>
						<hr style={{ backgroundColor: '#9B3939', height: 5, width: 700 }} />
					</Col>
				</Row>
				<Row id="row" style={{ marginTop: 20 }}>
					<Col sm={8} />
					<Col sm={3}>
						<h5 className="card-text" style={{ color: 'black', fontFamily: 'artifika' }}>
							{' '}
							TOTAL: € {props.price}{' '}
						</h5>
					</Col>
					<Col sm={1} />
				</Row>
			</div>
		</>
	);
};
export default PDF;
