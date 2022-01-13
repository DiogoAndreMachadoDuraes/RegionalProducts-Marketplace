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
					<h3 style={{ marginTop: 20 }}>
						<br />
						Política de privacidade
					</h3>
					<h6 style={{ marginTop: 12 }}>1. INFORMAÇÃO E CONSENTIMENTO</h6>
					<p style={{ marginTop: 12, textAlign: 'justify' }}>
						A Lei da Proteção de Dados Pessoais (em diante “LPDP”) e o Regulamento Geral de Proteção de
						Dados (Regulamento (UE) 2016/679 do Parlamento Europeu e do Conselho de 27 de abril de 2016, em
						diante “RGPD”) asseguram a proteção das pessoas singulares no que diz respeito ao tratamento de
						dados pessoais e à livre circulação desses dados. Nos termos legais são considerados "dados
						pessoais" qualquer informação, de qualquer natureza e independentemente do respetivo suporte,
						incluindo som e imagem, relativa a uma pessoa singular identificada ou identificável, pelo que a
						proteção não abrange os dados de pessoas coletivas. Mediante a aceitação da presente Política de
						Privacidade o utilizador presta o seu consentimento informado, expresso, livre e inequívoco para
						que os dados pessoais fornecidos através do site https://www.Wine and Olive marketplace.pt/
						sejam incluídos num ficheiro da responsabilidade da Wine and Olive marketplace Portugal, cujo
						tratamento nos termos da LPDP e do RGPD cumpre as medidas de segurança técnicas e organizativas
						adequadas. A Wine and Olive marketplace Portugal, mantém uma base de dados com o registo dos
						seus clientes. Os dados presentes nesta base são unicamente os dados prestados pelos próprios na
						altura do seu registo, sendo recolhidos e processados automaticamente, nos termos aprovados pela
						Comissão Nacional de Proteção de Dados, pela Wine and Olive marketplace Portugal, entidade
						responsável pelo correspondente ficheiro. Em caso algum será solicitada informação sobre
						convicções filosóficas ou políticas, filiação partidária ou sindical, fé religiosa, vida privada
						e origem racial ou étnica bem como os dados relativos à saúde e à vida sexual, incluindo os
						dados genéticos. Em caso algum levaremos a cabo qualquer das seguintes atividades com os dados
						pessoais que nos sejam facultados através deste site: Ceder a outras pessoas ou outras
						entidades, sem o consentimento prévio do titular dos dados; Transferir para fora do Espaço
						Económico Europeu (EEE), sem o consentimento prévio do titular dos dados.
					</p>

					<h6>2. FINALIDADES DO TRATAMENTO DE DADOS PESSOAIS</h6>
					<p style={{ textAlign: 'justify' }}>
						Os dados pessoais que tratamos através desta página serão unicamente utilizados para as
						seguintes finalidades:
						<br />
						(i) Execução e gestão de contrato de compra e venda ou de prestação de serviços;
						<br />
						(ii) Processamento de encomendas;
						<br />
						(iii) Comunicação com clientes e esclarecimento de dúvidas;
						<br />
						(iv) Processamento de pedidos de informação;
						<br />
						(v) Processamento de reclamações, Processos de Reguladores, Processos pré-contencioso ou
						exercício de direitos em processos judiciais;
						<br />
						(vi) Atividades de análise estatística;
						<br />
						(vii) Verificar, manter e desenvolver sistemas e análises estatísticas;
						<br />
						(viii) Comunicações de marketing direto (caso tenha consentido no tratamento dos seus dados
						pessoais para esta finalidade);
						<br />
						(ix) Prevenção e combate à fraude;
						<br />
						(x) Solicitação de comentários a produtos ou serviços adquiridos;
						<br />
						(xi) Realização de inquéritos de satisfação.
						<br />
						(xii) Gestão e participação em eventos, passatempos e campanhas.
						<br />A Wine and Olive marketplace garante a confidencialidade de todos os dados fornecidos
						pelos seus clientes. Não obstante a Wine and Olive marketplace proceder à recolha e ao
						tratamento de dados de forma segura e que impede a sua perda ou manipulação, utilizando as
						técnicas mais aperfeiçoadas para o efeito, informamos que a recolha em rede aberta permite a
						circulação dos dados pessoais sem condições de segurança, correndo o risco de ser vistos e
						utilizados por terceiros não autorizados. O Website da Wine and Olive marketplace dispõe de um
						chat, no qual os utilizadores podem colocar questões e assim retirar um melhor aproveitamento da
						toda a oferta Wine and Olive marketplace Portugal. Se os utilizadores fornecerem dados pessoais
						à Wine and Olive marketplace Portugal através do referido chat, os mesmos não serão utilizados
						para qualquer finalidade distinta daquilo que for solicitado pelo utilizador. Por outro lado, o
						utilizador consente que se possa aceder à informação relativa ao serviço contratado com a Wine
						and Olive marketplace Portugal com o fim de lhe poder oferecer serviços adicionais ao
						contratado. No momento da recolha dos dados pessoais, salvo nos campos em que for indicado o
						contrário, o utilizador poderá, voluntariamente, disponibilizar os dados pessoais, sem que a
						falta de resposta implique um decréscimo na qualidade ou quantidade dos serviços correspondentes
						(a menos que esteja indicada outra coisa). Não obstante, a falta de resposta aos dados,
						considerados obrigatórios, implicará a impossibilidade de aceder ao serviço para o qual os dados
						foram solicitados. Caso não concorde com as condições acima referidas, a Wine and Olive
						marketplace não poderá contratar com o utilizador através da sua página Web.
					</p>
					<h6>3. CESSÃO DE DADOS PESSOAIS</h6>
					<p style={{ textAlign: 'justify' }}>
						Por forma a poder cumprir com o objeto do presente website, a Website da Wine and Olive
						marketplace Portugal irá ceder os seus dados pessoais a outras entidades, que os irão tratar,
						para as seguintes finalidades:
						<br />
						- Atividades de gestão e processamento de pagamentos;
						<br />
						- Prestação dos serviços contratados.
						<br />
						- Gestão e participação em eventos, passatempos e campanhas.
						<br />
						As entidades a quem a Website da Wine and Olive marketplace irá ceder os seus dados pessoais
						para os tratarem nos termos acima referidos terão a seguinte natureza:
						<br />
						- Entidades seguradoras;
						<br />
						- Entidades terceiras relacionadas com a prestação dos serviços contratados;
						<br />- Entidades de gestão e processamento de pagamentos.
					</p>
					<br />
					<h6>4. MEDIDAS DE SEGURANÇA</h6>
					<p style={{ textAlign: 'justify' }}>
						A Wine and Olive marketplace declara que implementou e continuará a implementar as medidas de
						segurança de natureza técnica e organizativa necessárias para garantir a segurança dos dados de
						carácter pessoal que lhe sejam fornecidos visando evitar a sua alteração, perda, tratamento e/ou
						acesso não autorizado, tendo em conta o estado atual da tecnologia, a natureza dos dados
						armazenados e os riscos a que estão expostos. A Wine and Olive marketplace garante a
						confidencialidade de todos os dados fornecidos pelos seus clientes quer no registo, quer no
						processo de compra/encomenda de produtos ou serviços. A recolha e tratamento de dados realiza-se
						de forma segura e que impede a sua perda ou manipulação. Todos os dados serão inseridos num
						Servidor Seguro (SSL de 128 bits) que os encripta/codifica (transforma num código). O utilizador
						poderá verificar que o seu browser é seguro se o símbolo do cadeado aparecer ou se o endereço
						começar com https em vez de http. Os dados pessoais são tratados com o nível de proteção
						legalmente exigível para garantir a segurança dos mesmos e evitar a sua alteração, perda,
						tratamento ou acesso não autorizado, tendo em conta o estado da tecnologia, sendo o utilizador
						consciente e aceitando que as medidas de segurança em Internet não são inexpugnáveis. A Wine and
						Olive marketplace, sempre que aceda a qualquer dado pessoal, compromete-se a:
						<br />
						Armazená-los por intermédio de medidas de segurança, legalmente exigíveis, de natureza técnica e
						organizacional, que garantam a sua segurança, evitando assim a alteração, perda, tratamento ou
						acesso não autorizado, em conformidade com o estado da tecnologia em cada momento, a natureza
						dos dados e os possíveis riscos a que estejam expostos;
						<br />
						Utilizar os dados exclusivamente para as finalidades previamente definidas;
						<br />
						Certificar-se de que os dados são tratados unicamente pelos trabalhadores cuja intervenção seja
						necessária para a prestação do serviço estando os mesmos obrigados ao dever de sigilo e
						confidencialidade. Existindo a possibilidade de a informação ser revelada a terceiros, estes
						devem ser obrigados a guardar a devida confidencialidade em conformidade com o previsto neste
						documento.
						<br />
					</p>
					<br />
				</Col>
				<Col sm={1} />
			</Row>
		</Container>
	);
};
