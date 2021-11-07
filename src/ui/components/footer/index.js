import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaPhoneAlt } from "react-icons/fa";
import { TiInfoLargeOutline } from "react-icons/ti";
import { SiInstagram } from "react-icons/si";
import logo from "../../assets/logoExpand.jpg";
import mb from "../../assets/mb.png";
import paypal from "../../assets/paypal.png";
import mbway from "../../assets/mbway.png";
import { IoIosMail } from "react-icons/io";

export const Footer = () => {
  return (
    <div style={{ backgroundColor: "#9B3939" }}>
      <Container fluid style={{ marginLeft: -10 }}>
        <Row>
          <Col
            lg="3"
            style={{
              top: 70,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Row className="justify-content-md-center">
              <Image src={logo} />
            </Row>
          </Col>
          <Col lg="2">
            <h5 style={{ color: "white" }}>Quem Somos</h5>
            <Row style={{ marginTop: 20, marginLeft: 4 }}>
              <TiInfoLargeOutline size="25" color="white" />
              <a href="/about" style={{ color: "white" }}>
                Sobre nós
              </a>
            </Row>
            <h5 style={{ color: "white", marginTop: 40 }}>Contactos</h5>
            <Row style={{ marginTop: 20, marginLeft: 4 }}>
              <IoIosMail size="25" color="white" />
              <a
                href="mailto:perguntas@produtosregionais.pt"
                style={{
                  color: "white",
                  marginLeft: 9,
                  marginTop: 3,
                  fontSize: 12,
                }}
              >
                perguntas@produtosregionais.pt
              </a>
            </Row>
            <Row style={{ marginTop: 5, marginLeft: 4 }}>
              <FaPhoneAlt size="21" color="white" style={{ marginLeft: 3 }} />
              <a
                href="tel:+351913157290"
                style={{
                  color: "white",
                  marginLeft: 8,
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                +351913157290
              </a>
            </Row>
          </Col>
          <Col lg="3">
            <Row className="justify-content-md-center">
              <h5 style={{ color: "white" }}>Métodos de Pagamento</h5>
              <Row
                style={{
                  marginTop: 20,
                  marginLeft: 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Col lg={3}>
                  <Image
                    src={mb}
                    width="40"
                    height="40"
                    style={{ borderRadius: 6 }}
                  />
                </Col>
                <Col lg={3}>
                  <Image src={mbway} width="40" height="40" />
                </Col>
                <Col lg={6}>
                  <Image
                    src={paypal}
                    width="60"
                    height="40"
                    style={{ borderRadius: 6 }}
                  />
                </Col>
              </Row>
            </Row>
          </Col>
          <Col lg="2">
            <h5 style={{ color: "white", marginLeft: 0 }}>Suporte</h5>
            <Row style={{ marginTop: 20, marginLeft: 4 }}>
              <a href="/cookies" style={{ color: "white" }}>
                Cookies
              </a>
            </Row>
            <Row style={{ marginTop: 7, marginLeft: 4 }}>
              <a href="/tasks" style={{ color: "white" }}>
                Perguntas Frequentes
              </a>
            </Row>
            <Row style={{ marginTop: 7, marginLeft: 4 }}>
              <a href="/terms" style={{ color: "white" }}>
                Termos e Condições
              </a>
            </Row>
            <Row style={{ marginTop: 7, marginLeft: 4 }}>
              <a href="/politics" style={{ color: "white" }}>
                Políticas de Privacidade
              </a>
            </Row>
          </Col>
          <Col lg="2" style={{ top: 79 }}>
            <Row>
              <Col sm={4}>
                <a href="https://www.facebook.com/">
                  <FaFacebook
                    color="blue"
                    size="30"
                    style={{ backgroundColor: "white", borderRadius: 15 }}
                  />
                </a>
              </Col>
              <Col sm={4}>
                <a href="https://www.twitter.com/">
                  <FaTwitter color="#4267B2" size="30" />
                </a>
              </Col>
              <Col sm={4}>
                <a href="https://www.instagram.com/">
                  <SiInstagram color="#eb5757" size="30" />
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ justifyContent: "center", marginTop: 52 }}>
          <h6 style={{ color: "white", marginBottom: -14 }}>
            &copy; Copyright {new Date().getFullYear()} - ProdutosRegionais,
            S.A. All rights reserved.
          </h6>
        </Row>
      </Container>
    </div>
  );
};
