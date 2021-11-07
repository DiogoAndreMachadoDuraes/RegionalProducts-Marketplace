import React from "react";
import "./style.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { AiOutlineUser, AiTwotoneLock } from "react-icons/ai";
import axios from "axios";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import InputGroup from "react-bootstrap/InputGroup";

class Editproducer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      producer: [],
      name: "",
      tin: "",
      logo: "",
      telephone: "",
      street: "",
      locality: "",
      country: "",
      postal_code: "",
      email: "",
      password: "",
      social: "",
      state: "Ativo",
      showModal: false,
      isPasswordShown: false,
      showPass: false,
    };
  }

  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  async componentDidMount() {
    try {
      let token = await localStorage.getItem("token");
      let type = await localStorage.getItem("type");
      let userId = await localStorage.getItem("userId");
      let name_producer = await localStorage.getItem("name");
      if (token !== null) {
        this.setState({
          isLogged: true,
          token,
          type,
          userId,
          name_producer,
        });
        console.log(userId);
      } else {
        this.setState({
          isLogged: false,
        });
      }
    } catch (e) {
      console.log("Error rending data: " + e);
    }
    const { token, userId } = this.state;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(`http://127.0.0.1:5000/producer/${userId}`, config)
      .then((res) => {
        const producer = res.data;
        this.setState({ producer });
        this.setState({
          name: producer.name,
          tin: producer.tin,
          logo: producer.logo,
          telephone: producer.telephone,
          street: producer.street,
          locality: producer.locality,
          country: producer.country,
          postal_code: producer.postal_code,
          email: producer.email,
          password: producer.password,
          social: producer.social,
          state: producer.state,
        });
      });
  }

  handleName = (e) => {
    this.setState({ name: e.target.value });
  };

  handleTin = (e) => {
    this.setState({ tin: e.target.value });
  };

  handleLogo = (e) => {
    this.setState({ logo: e.target.value });
  };

  handleTelephone = (e) => {
    this.setState({ telephone: e.target.value });
  };

  handleStreet = (e) => {
    this.setState({ street: e.target.value });
  };

  handleLocality = (e) => {
    this.setState({ locality: e.target.value });
  };

  handleCountry = (e) => {
    this.setState({ country: e.target.value });
  };

  handlePostal_code = (e) => {
    this.setState({ postal_code: e.target.value });
  };

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSocial = (e) => {
    this.setState({ social: e.target.value });
  };

  handleState = (e) => {
    this.setState({ state: e.target.value });
  };

  handleSubmit = async () => {
    const {
      name,
      tin,
      logo,
      telephone,
      street,
      locality,
      postal_code,
      country,
      email,
      password,
      social,
      state,
      userId,
      token,
    } = this.state;
    try {
      await fetch("http://127.0.0.1:5000/producer", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: userId,
          name: name,
          tin: tin,
          logo: logo,
          telephone: telephone,
          street: street,
          locality: locality,
          postal_code: postal_code,
          country: country,
          email: email,
          password: password,
          social: social,
          state: state,
        }),
      });

      alert("Produtor editado com sucesso!");
      window.location.reload();
    } catch (e) {
      console.log("Error to edit producer status: ");
    }
  };

  render() {
    const { producer, name_producer, isPasswordShown } = this.state;
    return (
      <Container>
        <br />
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <h3 style={{ fontWeight: "bold" }}>
              Editar Conta de {name_producer}{" "}
            </h3>
          </Col>
        </Row>

        <br />
        <br />

        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={30}>
              <h5 style={{ marginTop: 25 }}>
                <AiOutlineUser size="20" color="#000000" />
                Informação Pessoal
              </h5>
            </Col>
          </Row>

          <br />
          <Row>
            <Col>
              <Form.Label>Nome Completo </Form.Label>
              <Form.Control
                onChange={this.handleName}
                defaultValue={producer.name}
              />
            </Col>

            <Col>
              <Form.Label>País </Form.Label>
              <Form.Control
                required
                onChange={this.handleCountry}
                as="select"
                defaultValue={producer.country}
              >
                <option>País</option>
                <option>Portugal</option>
                <option>Espanha</option>
              </Form.Control>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>Morada </Form.Label>
              <Form.Control
                onChange={this.handleStreet}
                defaultValue={producer.street}
              />
            </Col>
            <Col>
              <Form.Label>Código Postal </Form.Label>
              <Form.Control
                onChange={this.handlePostal_code}
                defaultValue={producer.postal_code}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>Contacto </Form.Label>
              <Form.Control
                onChange={this.handleTelephone}
                defaultValue={producer.telephone}
              />
            </Col>
            <Col>
              <Form.Label>Localidade </Form.Label>
              <Form.Control
                onChange={this.handleLocality}
                defaultValue={producer.locality}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}>
              <Form.Label>Número de Contribuinte </Form.Label>
              <Form.Control
                onChange={this.handleTin}
                defaultValue={producer.tin}
              />
            </Col>
            <Col>
              <Form.Label>Rede Social </Form.Label>
              <Form.Control
                onChange={this.handleSocial}
                defaultValue={producer.social}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}></Col>
          </Row>
          <br />
          <Row>
            <Col md={3}>
              <h5 style={{ marginTop: 30 }}>
                <AiTwotoneLock size="20" color="#000000" />
                Informação de Login
              </h5>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}>
              <Form.Label>Email </Form.Label>
              <Form.Control
                onChange={this.handleEmail}
                defaultValue={producer.email}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>Palavra-Passe </Form.Label>
              <Form.Control
                onChange={this.handlePassword}
                defaultValue={producer.password}
                name="password"
                type={isPasswordShown ? "text" : "password"}
                style={{ color: "black", opacity: 1 }}
              />
              <InputGroup.Append>
                <InputGroup.Text id="inputGroupAppend">
                  {isPasswordShown ? (
                    <BsFillEyeFill
                      onClick={this.togglePasswordVisiblity}
                      size="20"
                      style={{ color: "black" }}
                    />
                  ) : (
                    <BsFillEyeSlashFill
                      onClick={this.togglePasswordVisiblity}
                      size="20"
                      style={{ color: "black" }}
                    />
                  )}
                </InputGroup.Text>
              </InputGroup.Append>
            </Col>
            <Col>
              <Form.Label>Confirmar Palavra-Passe</Form.Label>
              <Form.Control
                onChange={this.handlePassword}
                defaultValue={producer.password}
                name="password"
                type={isPasswordShown ? "text" : "password"}
                style={{ color: "black", opacity: 1 }}
              />
              <InputGroup.Append>
                <InputGroup.Text id="inputGroupAppend">
                  {isPasswordShown ? (
                    <BsFillEyeFill
                      onClick={this.togglePasswordVisiblity}
                      size="20"
                      style={{ color: "black" }}
                    />
                  ) : (
                    <BsFillEyeSlashFill
                      onClick={this.togglePasswordVisiblity}
                      size="20"
                      style={{ color: "black" }}
                    />
                  )}
                </InputGroup.Text>
              </InputGroup.Append>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}></Col>
          </Row>
          <Row>
            <Col md={50}>
              <Button
                type="submit"
                variant="dark"
                style={{ color: "white", backgroundColor: "#444903" }}
              >
                Submeter alterações
              </Button>
            </Col>

            <Col md={4}>
              <Button
                href="/producerprofile"
                variant="dark"
                style={{ color: "white", backgroundColor: "#AAAA74" }}
              >
                Voltar
              </Button>
            </Col>
          </Row>
        </Form>
        <br />
      </Container>
    );
  }
}
export default Editproducer;
