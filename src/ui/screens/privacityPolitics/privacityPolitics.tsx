import React from 'react';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Col } from 'react-bootstrap';
import { SupportPanel } from 'ui';

export const PrivacityPolitics: React.FC = () => {
	return (
		<Container fluid>
			<Row style={{ marginLeft: 20 }}>
				<Col sm={2}>
					<SupportPanel onPrivacityPolitics />
				</Col>
				<Col sm={1} />
				<Col sm={8}>
					<h3 style={{ marginTop: 20, color: '#8A3535', fontFamily: 'Artifika' }}>
						<br />
						Política de privacidade
					</h3>
					<br />
					<p style={{ marginTop: 12, textAlign: 'justify', fontFamily: 'Artifika' }}>
						A loja Produtos Regionais, com sede em Rua Nova do Desterro, nº21 1150-241 Lisboa, contribuinte
						n.º 555555555, é a entidade responsável pela recolha e tratamentos dos seus dados. Caso desejem,
						os clientes poderão em qualquer momento exercer o direito de acesso, alteração, actualização,
						rectificação, apagamento, limitação e portabilidade dos seus dados, previsto no Regulamento
						Geral de Protecção de Dados, aprovado pelo Regulamento (UE) 2016/679 do Parlamento Europeu e do
						Conselho de 27 de Abril de 2016 A protecção, segurança e privacidade dos seus dados pessoais é
						muito importante para a loja Produtos Regionais.
					</p>

					<h6>Como é que recolhemos os seus dados?</h6>
					<p style={{ textAlign: 'justify', fontFamily: 'Artifika' }}>
						Os dados serão recolhidos exclusivamente se preencher algum dos formulários do nosso site.
					</p>
					<h6>Que dados são recolhidos?</h6>
					<p style={{ textAlign: 'justify', fontFamily: 'Artifika' }}>
						Os dados recolhidos são exactamente aqueles descritos em cada formulário. Pedimos sempre os
						dados mínimos, de forma a assegurarmos resposta ao pedido feito. Todos os dados recolhidos são
						encriptados através da utilização de um certificado de segurança — SSL. Os dados são armazenados
						numa base de dados e utilizados exclusivamente pelo Produtos Regionais. Procedemos
						permanentemente à monitorização dos acessos aos sistemas de tecnologias da informação tendo em
						vista prevenir, detectar e impedir o uso indevido dos seus dados pessoais.
						<br />
					</p>
					<br />
					<h6>Durante quanto tempo são mantidos os dados?</h6>
					<p style={{ textAlign: 'justify', fontFamily: 'Artifika' }}>
						A loja Produtos Regionais, apenas mantém os seus dados durante o tempo necessário à prestação do
						serviço pretendido. No caso de formulários de contacto, os dados são apagados num prazo máximo
						de 12 meses.
					</p>
					<br />
					<h6>E o direito à portabilidade?</h6>
					<p style={{ textAlign: 'justify', fontFamily: 'Artifika' }}>
						A loja Produtos Regionais, apenas mantém os seus dados durante o tempo necessário à prestação do
						serviço pretendido. No caso de formulários de contacto, os dados são apagados num prazo máximo
						de 12 meses.
					</p>
					<br />
				</Col>
				<Col sm={1} />
			</Row>
		</Container>
	);
};
