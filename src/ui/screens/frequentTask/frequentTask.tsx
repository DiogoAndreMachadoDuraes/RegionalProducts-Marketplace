import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { SupportPanel } from 'ui';

export const FrequentTask: React.FC = () => {
	return (
		<Container fluid>
			<Row style={{ marginLeft: 20 }}>
				<Col sm={2}>
					<SupportPanel onFrequentTask />
				</Col>
				<Col sm={1} />
				<Col sm={8}>
					<h3 style={{ marginTop: 20 }}>
						<br />
						Perguntas Frequentes
					</h3>
					<br />
					<h6 style={{ marginTop: 12, textAlign: 'justify' }}>Como o mel deve ser conservado em casa?</h6>
					<p style={{ textAlign: 'justify' }}>
						Podemos de qualquer forma obter o teu desejo desde que tenhamos tempo para o fazer. Mesmo que
						não o vejas no nosso website podes entrar em contacto connosco para podermos procurar por ti e
						oferecer-te o melhor preço possível..
					</p>
					<br />

					<h6>Quero um enchido ou queijo diferente será podem arranjar?</h6>
					<p style={{ textAlign: 'justify' }}>
						Podemos de qualquer forma obter o teu desejo desde que tenhamos tempo para o fazer. Mesmo que
						não o vejas no nosso website podes entrar em contacto connosco para podermos procurar por ti e
						oferecer-te o melhor preço possível..
					</p>
					<br />

					<h6>Devo levar em conta a data de validade da tampa mesmo após a abertura do produto?</h6>
					<p style={{ textAlign: 'justify' }}>
						Podemos de qualquer forma obter o teu desejo desde que tenhamos tempo para o fazer. Mesmo que
						não o vejas no nosso website podes entrar em contacto connosco para podermos procurar por ti e
						oferecer-te o melhor preço possível..
					</p>
					<br />

					<h6>Como posso receber a minha encomenda?</h6>
					<p style={{ textAlign: 'justify' }}>
						Podemos de qualquer forma obter o teu desejo desde que tenhamos tempo para o fazer. Mesmo que
						não o vejas no nosso website podes entrar em contacto connosco para podermos procurar por ti e
						oferecer-te o melhor preço possível..
					</p>
					<br />
					<br />
				</Col>
				<Col sm={1} />
			</Row>
		</Container>
	);
};

/*
import React from "react";
import { Row, Col, Button, Accordion, Card, Breadcrumb } from "react-bootstrap";
import { GiThink } from "react-icons/gi";

class FrequentTask extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Breadcrumb style={{ marginTop: 20, marginLeft: 28 }} id="breadcrumb">
            <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
            <Breadcrumb.Item active style={{ color: "#AAAA74" }}>
              {" "}
              Perguntas Frequentes{" "}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Row id="row">
          <Col sm={2} />
          <Col sm={7} style={{ color: "black", fontFamily: "artifika" }}>
            <GiThink
              size="40"
              style={{ color: "444903", marginLeft: 20, marginTop: 50 }}
            />
          </Col>
          <Col sm={3} />
        </Row>
        <Row id="row">
          <Col sm={1} />
          <Col
            sm={8}
            style={{
              color: "#AAAA74",
              fontFamily: "artifika",
              marginLeft: 40,
              marginTop: -30,
            }}
          >
            <h3> Perguntas Frequentes </h3>
          </Col>
          <Col sm={3} />
        </Row>
        <Accordion>
          <Row id="row">
            <Col sm={2} />
            <Col sm={8} style={{ marginTop: 50, fontFamily: "artifika" }}>
              <Card>
                <Card.Header style={{ backgroundColor: "#FFFFFF" }}>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="0"
                    style={{ color: "black" }}
                  >
                    Como saber se o Azeite estragou?
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0" style={{ color: "black" }}>
                  <Card.Body>
                    O azeite de oliva fresco possui uma qualidade singular e uma
                    variedade incrível, de sabor delicado a intenso – frutado,
                    gramíneo, floral, amanteigado e assim por diante. Qualquer
                    alteração nesses fatores pode indicar que a qualidade do seu
                    azeite está sendo afetada.{" "}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header style={{ backgroundColor: "#FFFFFF" }}>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="1"
                    style={{ color: "black" }}
                  >
                    Porque se cheira o Vinho?
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1" style={{ color: "black" }}>
                  <Card.Body>
                    A graça de cheirar o vinho é justamente ficar tentando
                    adivinhar quais aromas pode-se identificar.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header style={{ backgroundColor: "#FFFFFF" }}>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="2"
                    style={{ color: "black" }}
                  >
                    O Azeite pode ser reciclado?
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2" style={{ color: "black" }}>
                  <Card.Body>
                    Sim, pode ser reciclado mas normalmente não se gasta em
                    tanta quantidade de cada vez como acontece com o óleo
                    normal, sendo por isso menos frequente juntar uma quantidade
                    suficiente para reaproveitar.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header style={{ backgroundColor: "#FFFFFF" }}>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="3"
                    style={{ color: "black" }}
                  >
                    Como posso receber a minha encomenda?
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="3" style={{ color: "black" }}>
                  <Card.Body>
                    É bem simples! Basta registar-se na nossa plataforma e após
                    a sua compra selecionar como pretende receber a sua
                    encomenda.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Col>
            <Col sm={2} />
          </Row>
        </Accordion>
        <div className="mt-5"> </div>
      </div>
    );
  }
}
export default FrequentTask;

*/
