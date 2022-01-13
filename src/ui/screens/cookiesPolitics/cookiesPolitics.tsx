import React from 'react';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Col } from 'react-bootstrap';
import { SupportPanel } from 'ui';

export const CookiesPolitics: React.FC = () => {
	return (
		<Container fluid>
			<Row style={{ marginLeft: 20 }}>
				<Col sm={2}>
					<SupportPanel onCookiesPolitics />
				</Col>
				<Col sm={1} />
				<Col sm={8}>
					<h3 style={{ marginTop: 20, color:'#8A3535', fontFamily:'Artifika' }}>
						<br />
						Política de Cookies
					</h3>
					<br />
					<p style={{ marginTop: 12, textAlign: 'justify', fontFamily:'Artifika' }}>
					Os cookies são pequenos ficheiros de texto que um site aloja no computador (ou dispositivo móvel) de quem o utiliza, através do browser (ou navegador de internet). O seu objectivo é reter as preferências do utilizador, sem o identificar, através de informações genéricas que podem ser úteis em utilizações sucessivas. 

A qualquer momento o utilizador pode, através do browser, decidir ser notificado sobre a recepção de cookies, bem como bloquear a respetiva entrada no seu sistema. No entanto, a recusa de uso de cookies no site pode resultar na impossibilidade de ter acesso a algumas das suas áreas ou de receber informação personalizada.
					</p>

					<h6>Cookies Necessários</h6>
					<p style={{ textAlign: 'justify', fontFamily:'Artifika' }}>
					São cookies essenciais à navegação, sem os quais o website não pode funcionar. Não guardam dados pessoais.
					</p>

					<h6>Cookies Funcionais</h6>
					<p style={{ textAlign: 'justify' , fontFamily:'Artifika'}}>
					Os cookies funcionais guardam informação sobre as escolhas feitas pelos utilizadores de forma a mostrar o site de acordo com as suas necessidades.
					</p>
					<h6>Cookies Análise</h6>
					<p style={{ textAlign: 'justify', fontFamily:'Artifika' }}>
					Cookies estatísticos que nos ajudam a perceber quantos visitantes temos e quais as suas preferências de modo a oferecer um melhor serviço.
					</p>

					<h6>Third Party</h6>
					<p style={{ textAlign: 'justify', fontFamily:'Artifika' }}>
					Cookies colocados por outras empresas e que permitem oferecer funcionalidades específicas, como a a visualização de um vídeo do Youtube.

					</p>

									<br />
				</Col>
				<Col sm={1} />
			</Row>
		</Container>
	);
};
