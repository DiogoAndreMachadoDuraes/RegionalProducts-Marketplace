import React from "react";
import { Image, Container, Row, Col } from "react-bootstrap";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import wine from "../../assets/wineBackground.jpg";

class AboutUs extends React.Component {
  render() {
    return (
      <div>
        <div id="about" className={"container-fluid"}>
          <div className={"text-center"}>
            <h1 style={{ color: "#444903", marginTop: 8 }}>Quem somos</h1>
          </div>
          <Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row id="row" style={{ marginTop: 69 }}>
              <Col sm={1} />
              <Col sm={4}>
                <Image src={wine} id="img-rounded" fluid />
              </Col>
              <Col sm={2} />
              <Col sm={5}>
                <h5 style={{ color: "#AAAA74" }}>
                  O marketplace Wine and Olive Marketplace surgiu com o intuito
                  de ajudar a vasta comunidade produtora local de azeites e
                  vinhos transmontana , fornecendo-lhes uma forma de venderem os
                  seus produtos de forma acessível e prática.{" "}
                </h5>
              </Col>
            </Row>
          </Container>
        </div>
        <div id="contact" className={"container-fluid text-center"}>
          <h2 style={{ color: "#444903", marginBottom: 25, marginTop: 10 }}>
            Contactos
          </h2>
          <h6 style={{ color: "#AAAA74" }}>
            Se tiver alguma questão entre em contacto.
          </h6>
          <Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row id="row" style={{ marginTop: 80 }}>
              <Col sm={6} lg={6}>
                <FaPhoneAlt size="80" color="#AAAA74" />
              </Col>
              <Col sm={6} lg={6}>
                <IoIosMail size="80" color="#AAAA74" />
              </Col>
            </Row>
            <Row id="row" style={{ marginTop: 12 }}>
              <Col sm={6} lg={6}>
                <a
                  href="tel:+351913157290"
                  style={{ fontWeight: "bold", fontSize: 16, color: "#444903" }}
                >
                  +351913157290
                </a>
              </Col>
              <Col sm={6} lg={6}>
                <a
                  href="mailto:duvidas@womarket.com"
                  style={{ fontWeight: "bold", fontSize: 16, color: "#444903" }}
                >
                  duvidas@womarket.com
                </a>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default AboutUs;
