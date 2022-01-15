import React from 'react';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Col } from 'react-bootstrap';
import { SupportPanel } from 'ui';

export const TermsConditions: React.FC = () => {
	return (
		<Container fluid>
			<Row style={{ marginLeft: 20 }}>
				<Col sm={2}>
					<SupportPanel onTerms />
				</Col>
				<Col sm={1} />
				<Col sm={8}>
					<h3 style={{ marginTop: 20, color: '#8A3535', fontFamily: 'Artifika' }}>
						<br />
						Termos e Condições
					</h3>
					<h3 style={{ marginTop: 20, fontFamily: 'Artifika' }}>
						<br />
						Considerações gerais
					</h3>
					<br />
					<p style={{ marginTop: 12, textAlign: 'justify', fontFamily: 'Artifika' }}>
						A utilização do Site atribui automaticamente a condição de Utilizador e implica a aceitação,
						plena e sem reservas, de todas as disposições incluídas nos Termos e Condições, na versão
						vigente em cada momento em que acede ao Site. Se não aceitar integralmente qualquer uma das
						condições estabelecidas, não deverá aceder/utilizar o nosso Site. Ao consultar, utilizar ou
						descarregar o conteúdo do Site, está a comprometer-se a respeitar as condições estabelecidas
						neste documento. O Utilizador poderá utilizar o Site, sem necessidade de qualquer registo. No
						entanto, algumas das funcionalidades do Site poderão encontrar-se dependentes de registo. Toda a
						informação prestada pelo Utilizador deverá ser correta e verdadeira. O Utilizador deve atualizar
						a informação facultada, sempre que esta sofra quaisquer alterações. O Utilizador
						responsabiliza-se exclusivamente por quaisquer declarações falsas, incompletas ou incorretas que
						preste e pelos prejuízos que estas possam provocar à empresa ou a terceiros, com a informação
						que faculte. Declinamos a responsabilidade por eventuais danos decorrentes do uso indevido ou
						negligente da palavra-chave definida pelo Utilizador para acesso à sua conta. O Utilizador
						deverá assegurar a confidencialidade da respetiva palavra-chave. O Utilizador Registado terá
						acesso a uma área pessoal, com os dados que tiver indicado no momento do registo. Através do
						registo, o Utilizador poderá aceder aos dados da sua conta e proceder à sua alteração ou
						eliminação definitiva. Pode consultar as suas encomendas, devoluções e comunicações com a
						empresa. No Site encontram-se disponíveis os produtos comercializados pelos Produtos Regionais.
						A informação sobre os produtos apresentada no Site destina-se apenas a fornecer um breve resumo
						informativo para melhor conveniência e informação do visitante. Tomamos todas as providências
						para garantir que as informações e os dados contidos no Site são precisos e atualizados, aquando
						da sua introdução no mesmo. No entanto, não é garantida a atualização ou correção destas
						informações. Não damos qualquer garantia, expressa ou implícita, quanto à exatidão ou
						integridade de qualquer informação (incluindo informação sobre bens e serviços) incluída no
						Site. Reservamos o direito de alterar, apagar ou mover qualquer informação no Site, a qualquer
						momento, sem aviso prévio. Os Utilizadores aceitam e reconhecem expressamente que: - As
						fotografias apresentadas no Site têm caráter meramente ilustrativo, devendo consultar informação
						detalhada sobre os produtos e as respetivas caraterísticas/especificações; - O preço exposto é o
						preço recomendado, podendo, contudo, existir erros ortográficos aos quais não podemos garantir o
						fornecimento caso seja essa a situação; - Faremos todos os esforços razoáveis para incluir
						informação exata e atualizada sobre os produtos no Site. Não obstante, não o podemos garantir; -
						Não garantimos a existência em stock dos artigos incluídos no Site, nem tão pouco assumimos a
						responsabilidade por artigos descontinuados.
					</p>
					<h3 style={{ marginTop: 20, fontFamily: 'Artifika' }}>
						<br />
						Encomendas danificadas ou atrasadas
					</h3>
					<p style={{ textAlign: 'justify', fontFamily: 'Artifika' }}>
						A loja Produtos Regionais responsabiliza-se pela entrega dos produtos em boas condições. Na
						eventualidade das encomendas não serem entregues nas devidas condições, o cliente deverá
						informar a transportadora no acto da entrega e por escrito, ficando com uma evidência na sua
						posse. De seguida deverá enviar um email para geral@regional.pt informando o sucedido e com a
						prova da observação. Após análise, será dado ou não deferimento à reclamação. Nos casos de
						deferimento da reclamação, a loja Produtos Regionais concederá ao cliente um crédito igual ao
						valor do produto, que deverá ser utilizado na compra de qualquer outro produto disponível na
						loja, ou encontrará uma solução que seja de acordo do cliente. Eventuais atrasos na entrega são
						alheios aos Produtos Regionais.
					</p>
					<h3 style={{ marginTop: 20, fontFamily: 'Artifika' }}>
						<br />
						Política de Devoluções
					</h3>
					<p style={{ textAlign: 'justify', fontFamily: 'Artifika' }}>
						A devolução de produtos alimentares obedece ao DL nº 24/2014, Art. 17º. A devolução do produtos
						não alimentares têm os custos de envio por conta do cliente. O cliente poderá resolver o
						contrato sem pagamento de indemnização e sem necessidade de indicar o motivo, no prazo de 14
						dias a partir da receção do produto. O direito de resolução apenas será válido e eficaz se o
						cliente restituir os produtos no prazo máximo de 30 dias a contar da sua receção, nas exatas
						condições originais em que foram expedidos para a morada indicada pelo cliente e mediante
						entrega de cópia do comprovativo de compra. O cliente não pode exercer o direito de livre
						resolução nos contratos cujos bens adquiridos tenham sido personalizados e, bem assim, nos
						contratos cujos bens ou serviços adquiridos, pela sua natureza, não possa ser restituída. Quando
						o direito de livre resolução tiver sido exercido pelo cliente nos termos do acima exposto, os
						Produtos Regionais efetuará o reembolso dos montantes pagos pelo cliente pelo meio que entender
						mais adequado.
					</p>
					<br />
					<br />
				</Col>
				<Col sm={1} />
			</Row>
		</Container>
	);
};
