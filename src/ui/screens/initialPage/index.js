import React from "react";
import "./style.css";
import { Image, Container, Row, Button, Card, Col } from "react-bootstrap";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { Footer } from "../../components";
import morango from "../../../assets/morango.jpeg";

class InitialPage extends React.Component {
  render() {
    return (
      <div className="App">
        <Card className="bg-dark text-white">
          <Card.Img
            src="https://www.simplyflow.pt/wp-content/uploads/2017/01/simply-flow-andre-pinguel-vinhos-biologicos.jpg"
            alt="Card image"
          />
          <Card.ImgOverlay>
            <Container>
              <Row style={{ marginTop: 50 }}>
                <Col xs={12} md={8}>
                  <Image
                    src="https://files.fm/thumb_show.php?i=xg77mbznq"
                    alt="Paris"
                    width="200"
                    fluid
                  />
                </Col>
                <Col style={{ marginTop: 10 }}>
                  <a
                    href="/product"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    Produtos
                  </a>
                </Col>
                <Col style={{ marginTop: 10 }}>
                  <a
                    href="/login"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    Login
                  </a>
                </Col>
                <Col style={{ marginTop: 10 }}>
                  <a
                    href="/register"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    Registar
                  </a>
                </Col>
              </Row>
              <Row style={{ marginTop: 50, marginBottom: 250 }}>
                <div className="container" style={{ textAlign: "center" }}>
                  <div
                    style={{
                      opacity: 0.9,
                      backgroundColor: "#AAAA74",
                      borderRadius: 50,
                      marginLeft: 80,
                      marginTop: 200,
                      marginBottom: 120,
                    }}
                  >
                    <h1
                      style={{
                        fontSize: 60,
                        textAlign: "center",
                        color: "#2f3300",
                        fontWeight: "bold",
                      }}
                    >
                      Welcome to the best Maketplace!
                    </h1>
                    <h3
                      style={{
                        fontSize: 30,
                        textAlign: "center",
                        color: "#444903",
                        fontWeight: "bold",
                      }}
                    >
                      Best Wine and Olive
                    </h3>
                  </div>
                  <Button
                    href="/home"
                    variant="dark"
                    size="lg"
                    style={{ backgroundColor: "#444903" }}
                  >
                    Entrar no Site
                  </Button>
                </div>
              </Row>
            </Container>
          </Card.ImgOverlay>
        </Card>
        <div id="portfolio" className={"container-fluid text-center"}>
          <h2 style={{ color: "#444903", marginBottom: 100 }}>Produtos</h2>
          <Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row id="row">
              <Col sm={6}>
                <Row>
                  <Col sm={6} lg={12}>
                    <Image
                      src="http://vozdocampo.pt/wp-content/uploads/2020/07/azeite-1.jpg"
                      alt="Paris"
                      width="400"
                      height="300"
                    />
                  </Col>
                  <Col sm={6} lg={12} style={{ marginTop: 20 }}>
                    <a
                      href="/product/azeite"
                      style={{
                        fontWeight: "bold",
                        fontSize: 30,
                        color: "#AAAA74",
                      }}
                    >
                      Azeite
                    </a>
                  </Col>
                </Row>
              </Col>
              <Col sm={6}>
                <Row>
                  <Col sm={6} lg={12}>
                    <Image
                      src="https://content.paodeacucar.com/wp-content/uploads/2019/06/o-que-%C3%A9-vinho-de-mesa4.jpg"
                      alt="New York"
                      width="400"
                      height="300"
                    />
                  </Col>
                  <Col sm={6} lg={12} style={{ marginTop: 20 }}>
                    <a
                      href="/product/vinho"
                      style={{
                        fontWeight: "bold",
                        fontSize: 30,
                        color: "#AAAA74",
                      }}
                    >
                      Vinho
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <div id="about" className={"container-fluid bg-grey"}>
          <div className={"text-center"}>
            <h2 style={{ color: "#444903", marginTop: 20 }}>Quem somos</h2>
          </div>
          <Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row id="row" style={{ marginTop: 50 }}>
              <Col sm={2} />
              <Col sm={5}>
                <Image src={morango} id="img-rounded" fluid />
              </Col>
              <Col sm={4}>
                <h5 style={{ color: "#AAAA74" }}>
                  O marketplace Wine and Olive Marketplace surgiu com o intuito
                  de ajudar a vasta comunidade produtora local de azeites e
                  vinhos transmontana , fornecendo-lhes uma forma de venderem os
                  seus produtos de forma acessível e prática.{" "}
                </h5>
              </Col>
              <Col sm={1} />
            </Row>
          </Container>
        </div>
        <div id="contact" className={"container-fluid text-center"}>
          <h2 style={{ color: "#444903", marginBottom: 25, marginTop: 20 }}>
            Contactos
          </h2>
          <h5 style={{ color: "#AAAA74" }}>
            Se tiver alguma questão entre em contacto.
          </h5>
          <Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row id="row" style={{ marginTop: 80 }}>
              <Col sm={6}>
                <Row>
                  <Col sm={6} lg={12}>
                    <FaPhoneAlt size="100" color="#AAAA74" />
                  </Col>
                  <Col sm={6} lg={12} style={{ marginTop: 20 }}>
                    <a
                      href="tel:+351913157290"
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "#444903",
                      }}
                    >
                      +351913157290
                    </a>
                  </Col>
                </Row>
              </Col>
              <Col sm={6}>
                <Row>
                  <Col sm={6} lg={12}>
                    <IoIosMail size="100" color="#AAAA74" />
                  </Col>
                  <Col sm={6} lg={12} style={{ marginTop: 10 }}>
                    <a
                      href="mailto:duvidas@womarket.com"
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "#444903",
                      }}
                    >
                      duvidas@womarket.com
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}

export default InitialPage;
