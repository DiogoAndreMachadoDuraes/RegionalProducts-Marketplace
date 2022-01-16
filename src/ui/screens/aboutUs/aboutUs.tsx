import React from 'react';
import { Image, Container, Row, Col } from 'react-bootstrap';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { images } from 'assets';

export const AboutUs: React.FC = () => {
	return (
		<>
			<div style={{ marginTop: 70 }}>
				<div className={'text-center'}>
					<h1 style={{ color: '#8A3535', fontFamily: 'Artifika', fontWeight: 'bold' }}>Quem somos</h1>
				</div>
				<Container id="list-group-tabs-example">
					<Row id="row" style={{ marginTop: 50 }}>
						<Col sm={1} />
						<Col sm={4}>
							<Image src={images.image} style={{ borderRadius: '50%' }} fluid />
						</Col>
						<Col sm={2} />
						<Col sm={5} style={{ marginTop: 80 }}>
							<h5 style={{ color: 'black', textAlign: 'justify', fontFamily: 'Artifika' }}>
								O marketplace Produtos Regionais surgiu com o intuito de ajudar a vasta comunidade
								produtora local.
							</h5>
						</Col>
					</Row>
				</Container>
			</div>
			<div style={{ marginTop: 50, marginBottom: 90, textAlign: 'center' }}>
				<h1
					style={{
						color: '#8A3535',
						fontFamily: 'Artifika',
						marginBottom: 25,
						marginTop: 10,
						fontWeight: 'bold',
					}}
				>
					Contactos
				</h1>
				<h5 style={{ color: 'black', fontFamily: 'Artifika' }}>Se tiver alguma questão entre em contacto.</h5>
				<Container id="list-group-tabs-example">
					<Row id="row" style={{ marginTop: 50 }}>
						<Col sm={6} lg={6}>
							<FaPhoneAlt size="80" color="#AA3C3C" />
						</Col>
						<Col sm={6} lg={6}>
							<IoIosMail size="100" color="#AA3C3C" />
						</Col>
					</Row>
					<Row id="row" style={{ marginTop: 5 }}>
						<Col sm={6} lg={6}>
							<a
								href="tel:+351913157290"
								style={{ fontWeight: 'bold', fontSize: 16, color: 'black', fontFamily: 'Artifika' }}
							>
								+351 913 157 290
							</a>
						</Col>
						<Col sm={6} lg={6}>
							<a
								href="mailto:perguntas@produtosregionais.pt"
								style={{ fontWeight: 'bold', fontSize: 16, color: 'black', fontFamily: 'Artifika' }}
							>
								perguntas@produtosregionais.pt
							</a>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
};
