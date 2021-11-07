import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Spinner,
  Toast,
} from "react-bootstrap";
import { MdRateReview } from "react-icons/md";
import { Redirect } from "react-router-dom";

class Avaliation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: "3",
      avaliation: 1,
    };
  }

  async componentDidMount() {
    console.log("Mounting screen Avaliation...");
    try {
      let name = await localStorage.getItem("name");
      let type = await localStorage.getItem("type");
      let userId = await localStorage.getItem("userId");
      if (name !== null) {
        this.setState({
          isLogged: true,
          name,
          type,
          userId,
        });
      }
    } catch (e) {
      console.log("Error rending data: " + e);
      this.setState({
        isLogged: false,
      });
    }
    const { token } = this.state;
    try {
      let response = await fetch("http://127.0.0.1:5000/avaliation", {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let json = await response.json();
      this.setState({
        orderId: json,
        isLoading: true,
      });
    } catch (e) {
      console.log("Error to get Avaliation: " + e);
      this.setState({
        isLoading: true,
      });
    }
  }

  handleType = (e) => {
    this.setState({ avaliation: e.target.value });
  };

  postAvaliation = async () => {
    const { orderId, avaliation, token } = this.state;
    try {
      await fetch("http://127.0.0.1:5000/avaliation", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: orderId,
          avaliation: avaliation,
        }),
      });
      this.setState({ showSucess: true });
      setTimeout(function () {
        window.location.reload();
      }, 5000);
    } catch (e) {
      console.log("Error to post Avaliation: " + e);
      this.setState({ showFailure: true });
      setTimeout(function () {
        window.location.reload();
      }, 5000);
    }
  };

  checkPermissions = () => {
    const { isLogged, orderId, type } = this.state;
    if (orderId === "" || isLogged === false || type !== "client") {
      return <Redirect to="/nopermissions" />;
    }
  };

  load = () => {
    const { isLoading } = this.state;
    if (isLoading === false) {
      return (
        <Spinner
          animation="border"
          variant="success"
          style={{
            marginTop: 25,
            marginBottom: 108,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        />
      );
    }
  };

  render() {
    const { orderId, showSucess, showFailure } = this.state;
    this.load();
    this.checkPermissions();
    return (
      <Container>
        {showSucess && (
          <Row id="row">
            <Col sm={4} />
            <Col sm={4}>
              <Toast
                onClose={() => this.setState({ showSucess: false })}
                show={showSucess}
                delay={5000}
                autohide
                style={{ marginTop: 20 }}
              >
                <Toast.Header style={{ backgroundColor: "#AAAA74" }}>
                  <strong className="me-auto" style={{ color: "#444903" }}>
                    Avaliação feita com sucesso!
                  </strong>
                </Toast.Header>
                <Toast.Body>
                  A sua avaliação foi feita com sucesso, obrigado!
                </Toast.Body>
              </Toast>
            </Col>
            <Col sm={4} />
          </Row>
        )}
        {showFailure && (
          <Row id="row">
            <Col sm={4} />
            <Col sm={4}>
              <Toast
                onClose={() => this.setState({ showFailure: false })}
                show={showFailure}
                delay={5000}
                autohide
                style={{ marginTop: 20 }}
              >
                <Toast.Header style={{ backgroundColor: "#AAAA74" }}>
                  <strong className="me-auto" style={{ color: "#444903" }}>
                    Ocorreu um erro a tentar fazer a avaliação!
                  </strong>
                </Toast.Header>
                <Toast.Body>
                  Por favor contacte a equipa WineOlive para perceber o
                  sucedido, obrigado!
                </Toast.Body>
              </Toast>
            </Col>
            <Col sm={4} />
          </Row>
        )}
        <Row id="row" style={{ marginTop: 50 }}>
          <Col sm={2} />
          <Col sm={1} style={{ color: "black", fontFamily: "artifika" }}>
            <MdRateReview size="40" style={{ color: "#444903" }} />
          </Col>
          <Col sm={6} style={{ color: "#AAAA74", fontFamily: "artifika" }}>
            <h3>Fazer avaliação da compra #{orderId}</h3>
          </Col>
          <Col sm={3} />
        </Row>
        <Row id="row">
          <Col sm={2} />
          <Col
            sm={8}
            style={{ marginTop: 50, color: "black", fontFamily: "artifika" }}
          >
            <h5>
              Agradecemos a sua compra e gostariamos de receber a sua avaliação.
            </h5>
          </Col>
          <Col sm={2} />
        </Row>
        <Row id="row">
          <Col sm={2} />
          <Col sm={8} style={{ color: "black", fontFamily: "artifika" }}>
            <Row id="row" style={{ marginTop: 50, marginBottom: 100 }}>
              <Col sm={8} style={{ color: "black", fontFamily: "artifika" }}>
                <Form>
                  <Form.Group controlId="formBasicRange">
                    <Form.Label>Avaliação da compra:</Form.Label>
                    <Form.Control
                      required
                      as="select"
                      defaultValue="1"
                      onChange={this.handleType}
                    >
                      <option value="1">1 - Muito Fraco</option>
                      <option value="2">2 - Fraco</option>
                      <option value="3">3 - Normal</option>
                      <option value="4">4 - Bom</option>
                      <option value="5">5 - Excelente</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Col>
              <Col sm={4}>
                <Button
                  type="submit"
                  className="mb-2"
                  onClick={this.postRate}
                  style={{
                    backgroundColor: "#444903",
                    color: "white",
                    marginTop: 20,
                  }}
                >
                  Submeter
                </Button>
              </Col>
            </Row>
          </Col>
          <Col sm={2} />
        </Row>
      </Container>
    );
  }
}

export default Avaliation;
