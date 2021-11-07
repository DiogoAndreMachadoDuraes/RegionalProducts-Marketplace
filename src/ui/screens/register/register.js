import React from "react";
import "./style.css";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineUser, AiTwotoneLock } from "react-icons/ai";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      birthday: "",
      country: "",
      locality: "",
      name: "",
      postal_code: "",
      state: "Ativa",
      street: "",
      telephone: "",
      tin: "",
      showModal: false,
      isPasswordShown: false,
      showPass: false,
      errors: [],
      isvalid: "",
    };
  }
  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };
  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }
  handleInputChange(event) {
    var key = event.target.name;
    var value = event.target.value;
    var obj = {};
    obj[key] = value;
    this.setState(obj);
    event.preventDefault();

    //VALIDATE
    var errors = [];

    //email
    const expression =
      /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)$/;
    var validEmail = expression.test(String(this.state.email).toLowerCase());

    if (!validEmail) {
      errors.push("email");
    }

    if (this.state.password.length < 8) {
      errors.push("password");
    }

    this.setState({
      errors: errors,
    });

    if (errors.length > 0) {
      return false;
    }
  }

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  handleBirthday = (e) => {
    this.setState({ birthday: e.target.value });
  };

  handleCountry = (e) => {
    this.setState({ country: e.target.value });
  };

  handleLocality = (e) => {
    this.setState({ locality: e.target.value });
  };

  handleName = (e) => {
    this.setState({ name: e.target.value });
  };

  handlePostal_code = (e) => {
    this.setState({ postal_code: e.target.value });
  };

  handleState = (e) => {
    this.setState({ state: e.target.value });
  };

  handleStreet = (e) => {
    this.setState({ street: e.target.value });
  };

  handleTelephone = (e) => {
    this.setState({ telephone: e.target.value });
  };
  handleModal = () => {
    this.setState({ showModal: false });
  };

  handleTin = (e) => {
    this.setState({ tin: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:5000/register", {
        email: this.state.email,
        password: this.state.password,
        birthday: this.state.birthday,
        country: this.state.country,
        locality: this.state.locality,
        name: this.state.name,
        postal_code: this.state.postal_code,
        state: this.state.state,
        street: this.state.street,
        telephone: this.state.telephone,
        tin: this.state.tin,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });

    alert("Cliente criado com sucesso!");
    window.location.reload();
    this.props.history.push("/login");
  };

  modal() {
    const { showModal } = this.state;
    return (
      <Modal show={showModal} size="md" animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Registo Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>Cliente registado com sucesso!!!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            href="/home"
            style={{ color: "white", backgroundColor: "#AAAA74" }}
          >
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    const { showModal, isPasswordShown } = this.state;
    return (
      <Container>
        <br />
        <br />
        <br />
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <h3>Criar Nova Conta Cliente</h3>
          </Col>
        </Row>
        <br />

        <Row>
          <Col md={4}>
            <h5>
              <AiOutlineUser size="20" color="#000000" />
              Informação Pessoal
            </h5>
          </Col>

          <Col md={{ span: 11, offset: 11 }}>
            <a
              href="/producerregister"
              style={{ color: "#444903", fontWeight: "bold" }}
            >
              É Produtor?
            </a>
          </Col>
        </Row>
        <form onSubmit={this.handleSubmit}>
          <Row>
            <Col>
              <Form.Label>Nome Completo </Form.Label>
              <Form.Control
                id="name"
                type="text"
                required
                onChange={this.handleName}
                placeholder="Nome Completo"
              />
            </Col>

            <Col>
              <Form.Label>Data de Nascimento </Form.Label>
              <Form.Control
                id="birthday"
                max="2021-05-19"
                type="date"
                placeholder="Data de Nascimento"
                required
                onChange={this.handleBirthday}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>Morada </Form.Label>
              <Form.Control
                id="street"
                type="text"
                placeholder="Morada"
                required
                onChange={this.handleStreet}
              />
            </Col>
            <Col>
              <Form.Label>Código Postal </Form.Label>
              <Form.Control
                id="postal_code"
                type="text"
                placeholder="Código Postal"
                required
                onChange={this.handlePostal_code}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>Contacto </Form.Label>
              <Form.Control
                id="telephone"
                type="number"
                placeholder="Contacto"
                required
                onChange={this.handleTelephone}
              />
            </Col>
            <Col>
              <Form.Label>Localidade </Form.Label>
              <Form.Control
                id="locality"
                type="text"
                placeholder="Localidade"
                required
                onChange={this.handleLocality}
              />
            </Col>
          </Row>

          <br />
          <Row>
            <Col md={6}>
              <Form.Label>Número de Contribuinte </Form.Label>
              <Form.Control
                id="tin"
                type="number"
                placeholder="Número de Contribuinte"
                required
                onChange={this.handleTin}
              />
            </Col>
            <Col>
              <Form.Label>País </Form.Label>
              <Form.Control as="select" required onChange={this.handleCountry}>
                <option>País</option>
                <option>Afeganistão</option>
                <option>África do Sul</option>
                <option>Akrotiri</option>
                <option>Albânia</option>
                <option>Alemanha</option>
                <option>Andorra</option>
                <option>Angola</option>
                <option>Anguila</option>
                <option>Antárctida</option>
                <option>Antígua e Barbuda</option>
                <option>Arábia Saudita</option>
                <option>Arctic Ocean</option>
                <option>Argélia</option>
                <option>Argentina</option>
                <option>Arménia</option>
                <option>Aruba</option>
                <option>Ashmore and Cartier Islands</option>
                <option>Atlantic Ocean</option>
                <option>Austrália</option>
                <option>Áustria</option>
                <option>Azerbaijão</option>
                <option>Baamas</option>
                <option>Bangladeche</option>
                <option>Barbados</option>
                <option>Barém</option>
                <option>Bélgica</option>
                <option>Belize</option>
                <option>Benim</option>
                <option>Bermudas</option>
                <option>Bielorrússia</option>
                <option>Birmânia</option>
                <option>Bolívia</option>
                <option>Bósnia e Herzegovina</option>
                <option>Botsuana</option>
                <option>Brasil</option>
                <option>Brunei</option>
                <option>Bulgária</option>
                <option>Burquina Faso</option>
                <option>Burúndi</option>
                <option>Butão</option>
                <option>Cabo Verde</option>
                <option>Camarões</option>
                <option>Camboja</option>
                <option>Canadá</option>
                <option>Catar</option>
                <option>Cazaquistão</option>
                <option>Chade</option>
                <option>Chile</option>
                <option>China</option>
                <option>Chipre</option>
                <option>Clipperton Island</option>
                <option>Colômbia</option>
                <option>Comores</option>
                <option>Congo-Brazzaville</option>
                <option>Congo-Kinshasa</option>
                <option>Coral Sea Islands</option>
                <option>Coreia do Norte</option>
                <option>Coreia do Sul</option>
                <option>Costa do Marfim</option>
                <option>Costa Rica</option>
                <option>Croácia</option>
                <option>Cuba</option>
                <option>Curacao</option>
                <option>Dhekelia</option>
                <option>Dinamarca</option>
                <option>Domínica</option>
                <option>Egipto</option>
                <option>Emiratos Árabes Unidos</option>
                <option>Equador</option>
                <option>Eritreia</option>
                <option>Eslováquia</option>
                <option>Eslovénia</option>
                <option>Espanha</option>
                <option>Estados Unidos</option>
                <option>Estónia</option>
                <option>Etiópia</option>
                <option>Faroé</option>
                <option>Fiji</option>
                <option>Filipinas</option>
                <option>Finlândia</option>
                <option>França</option>
                <option>Gabão</option>
                <option>Gâmbia</option>
                <option>Gana</option>
                <option>Gaza Strip</option>
                <option>Geórgia</option>
                <option>Geórgia do Sul e Sandwich do Sul</option>
                <option>Gibraltar</option>
                <option>Granada</option>
                <option>Grécia</option>
                <option>Gronelândia</option>
                <option>Guame</option>
                <option>Guatemala</option>
                <option>Guernsey</option>
                <option>Guiana</option>
                <option>Guiné</option>
                <option>Guiné Equatorial</option>
                <option>Guiné-Bissau</option>
                <option>Haiti</option>
                <option>Honduras</option>
                <option>Hong Kong</option>
                <option>Hungria</option>
                <option>Iémen</option>
                <option>Ilha Bouvet</option>
                <option>Ilha do Natal</option>
                <option>Ilha Norfolk</option>
                <option>Ilhas Caimão</option>
                <option>Ilhas Cook</option>
                <option>Ilhas dos Cocos</option>
                <option>Ilhas Falkland</option>
                <option>Ilhas Heard e McDonald</option>
                <option>Ilhas Marshall</option>
                <option>Ilhas Salomão</option>
                <option>Ilhas Turcas e Caicos</option>
                <option>Ilhas Virgens Americanas</option>
                <option>Ilhas Virgens Britânicas</option>
                <option>Índia</option>
                <option>Indian Ocean</option>
                <option>Indonésia</option>
                <option>Irão</option>
                <option>Iraque</option>
                <option>Irlanda</option>
                <option>Islândia</option>
                <option>Israel</option>
                <option>Itália</option>
                <option>Jamaica</option>
                <option>Jan Mayen</option>
                <option>Japão</option>
                <option>Jersey</option>
                <option>Jibuti</option>
                <option>Jordânia</option>
                <option>Kosovo</option>
                <option>Kuwait</option>
                <option>Laos</option>
                <option>Lesoto</option>
                <option>Letónia</option>
                <option>Líbano</option>
                <option>Libéria</option>
                <option>Líbia</option>
                <option>Listenstaine</option>
                <option>Lituânia</option>
                <option>Luxemburgo</option>
                <option>Macau</option>
                <option>Macedónia</option>
                <option>Madagáscar</option>
                <option>Malásia</option>
                <option>Malávi</option>
                <option>Maldivas</option>
                <option>Mali</option>
                <option>Malta</option>
                <option>Man, Isle of</option>
                <option>Marianas do Norte</option>
                <option>Marrocos</option>
                <option>Maurícia</option>
                <option>Mauritânia</option>
                <option>México</option>
                <option>Micronésia</option>
                <option>Moçambique</option>
                <option>Moldávia</option>
                <option>Mónaco</option>
                <option>Mongólia</option>
                <option>Monserrate</option>
                <option>Montenegro</option>
                <option>Namíbia</option>
                <option>Nauru</option>
                <option>Navassa Island</option>
                <option>Nepal</option>
                <option>Nicarágua</option>
                <option>Níger</option>
                <option>Nigéria</option>
                <option>Niue</option>
                <option>Noruega</option>
                <option>Nova Caledónia</option>
                <option>Nova Zelândia</option>
                <option>Omã</option>
                <option>Pacific Ocean</option>
                <option>Países Baixos</option>
                <option>Palau</option>
                <option>Panamá</option>
                <option>Papua-Nova Guiné</option>
                <option>Paquistão</option>
                <option>Paracel Islands</option>
                <option>Paraguai</option>
                <option>Peru</option>
                <option>Pitcairn</option>
                <option>Polinésia Francesa</option>
                <option>Polónia</option>
                <option>Porto Rico</option>
                <option>Portugal</option>
                <option>Quénia</option>
                <option>Quirguizistão</option>
                <option>Quiribáti</option>
                <option>Reino Unido</option>
                <option>República Centro-Africana</option>
                <option>República Dominicana</option>
                <option>Roménia</option>
                <option>Ruanda</option>
                <option>Rússia</option>
                <option>Salvador</option>
                <option>São Tomé e Príncipe</option>
                <option>São Vicente e Granadinas</option>
                <option>Sara Ocidental</option>
                <option>Seicheles</option>
                <option>Senegal</option>
                <option>Serra Leoa</option>
                <option>Sérvia</option>
                <option>Singapura</option>
                <option>Sint Maarten</option>
                <option>Síria</option>
                <option>Somália</option>
                <option>Southern Ocean</option>
                <option>Spratly Islands</option>
                <option>Sri Lanca</option>
                <option>Suazilândia</option>
                <option>Sudão</option>
                <option>Sudão do Sul</option>
                <option>Suécia</option>
                <option>Suíça</option>
                <option>Suriname</option>
                <option>Svalbard e Jan Mayen</option>
                <option>Tailândia</option>
                <option>Taiwan</option>
                <option>Tajiquistão</option>
                <option>Tanzânia</option>
                <option>Território Britânico do Oceano Índico</option>
                <option>Territórios Austrais Franceses</option>
                <option>Timor Leste</option>
                <option>Togo</option>
                <option>Tokelau</option>
                <option>Tonga</option>
                <option>Trindade e Tobago</option>
                <option>Tunísia</option>
                <option>Turquemenistão</option>
                <option>Turquia</option>
                <option>Tuvalu</option>
                <option>Ucrânia</option>
                <option>Uruguai</option>
                <option>Usbequistão</option>
                <option>Vaticano</option>
                <option>Venezuela</option>
                <option>Vietname</option>
              </Form.Control>
            </Col>
          </Row>

          <br />

          <Row>
            <Col md={4}>
              <h5>
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
                id="email"
                type="text"
                placeholder="Email"
                required
                onChange={this.handleEmail}
                className={
                  this.hasError("email")
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="email"
                value={this.state.email}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>Palavra-Passe </Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  placeholder="Password"
                  required
                  onChange={this.handlePassword}
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
              </InputGroup>
            </Col>
            <Col>
              <Form.Label>Confirme a Password </Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  placeholder="Password"
                  required
                  onChange={this.handlePassword}
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
              </InputGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  required
                  label="Aceito os Termos e Condições/Politica de Privacidade"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <Button
                type="submit"
                variant="dark"
                style={{ color: "white", backgroundColor: "#AAAA74" }}
                onClick={this.handleModal}
              >
                Criar Conta
              </Button>
              {showModal ? this.modal() : false}
            </Col>

            <Col md={2}>
              <Button
                href="/"
                variant="dark"
                style={{ color: "white", backgroundColor: "#8E8E8E" }}
              >
                Voltar
              </Button>
            </Col>
          </Row>
        </form>
        <br />
      </Container>
    );
  }
}

export default Register;
