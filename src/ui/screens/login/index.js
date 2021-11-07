import React from "react";
import "./style.css";
import logo from "../../assets/logo.jpg";
import menu from "../../assets/menu.jpg";
import {
  BsFillEyeSlashFill,
  BsFillEyeFill,
  BsEnvelopeOpen,
} from "react-icons/bs";
import {
  InputGroup,
  Image,
  Row,
  Col,
  Button,
  Form,
  Container,
  Navbar,
} from "react-bootstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      input: "",
      isValid: "",
      token: "",
      type: "",
      name: "",
      data: [],
      isPasswordShown: false,
      errors: [],
      showPass: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.login = this.login.bind(this);
  }

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
    const { email, password } = this.state;
    const expression =
      /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)$/;
    var validEmail = expression.test(String(email).toLowerCase());

    if (!validEmail) {
      errors.push("email");
    }

    if (password.length < 8) {
      errors.push("password");
    }

    this.setState({
      errors: errors,
    });

    if (errors.length > 0) {
      return false;
    }
  }

  login = async () => {
    const { email, password } = this.state;
    try {
      let response = await fetch("http://127.0.0.1:5000/auth", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      let json = await response.json();
      const name = json.name;
      const type = json.type;
      const token = json.token;
      const userId = json.id;
      if (type === "client") {
        this.props.history.push("/home", {
          token: token,
          name: name,
          type: type,
        });
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        localStorage.setItem("type", type);
        localStorage.setItem("userId", userId);
      } else {
        if (type === "admin") {
          this.props.history.push("/dashboardadmin", {
            token: token,
            name: name,
            type: type,
          });
          localStorage.setItem("token", token);
          localStorage.setItem("name", name);
          localStorage.setItem("type", type);
          localStorage.setItem("userId", userId);
        } else {
          if (type === "producer") {
            this.props.history.push("/dashboardproducer", {
              token: token,
              name: name,
              type: type,
            });
            localStorage.setItem("token", token);
            localStorage.setItem("name", name);
            localStorage.setItem("type", type);
            localStorage.setItem("userId", userId);
          } else {
            alert("O email e/ou palavra-passe estão incorretos!");
            localStorage.clear();
            return;
          }
        }
      }
    } catch (e) {
      console.log("Error to Authenticate: " + e);
    }
  };

  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  render() {
    const { isPasswordShown } = this.state;
    return (
      <Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row id="row">
          <Col sm={6}>
            <Row id="row">
              <Col sm={3} />
              <Col sm={6}>
                <Image
                  src={logo}
                  width="250"
                  height="200"
                  style={{ marginLeft: -70, marginTop: -40, maxHeight: "100%" }}
                />
              </Col>
              <Col sm={3} />
            </Row>
            <Form inline autoComplete="off">
              <Row id="row" style={{ marginTop: 50 }}>
                <Col sm={1} />
                <Col sm={10} style={{ color: "black", fontFamily: "artifika" }}>
                  <h5> E-mail </h5>
                  <Form.Group
                    controlId="formBasicEmail"
                    style={{ color: "black" }}
                  >
                    <InputGroup className="mb-2">
                      <Form.Control
                        type="email"
                        className={
                          this.hasError("email")
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        placeholder="O seu e-mail"
                        style={{ color: "black", opacity: 1 }}
                      />
                      <InputGroup.Append>
                        <InputGroup.Text id="inputGroupAppend">
                          <BsEnvelopeOpen
                            size="20"
                            style={{ color: "black" }}
                          />
                        </InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </Form.Group>
                  <div
                    className={
                      this.hasError("email") ? "inline-errormsg" : "hidden"
                    }
                  >
                    O seu e-mail não é válido!
                  </div>
                </Col>
                <Col sm={1} />
              </Row>
              <Row id="row" style={{ marginTop: 20 }}>
                <Col sm={1} />
                <Col sm={10} style={{ color: "black", fontFamily: "artifika" }}>
                  <h5> Palavra-passe </h5>
                  <Form.Group
                    controlId="formBasicPassword"
                    style={{ color: "black" }}
                  >
                    <InputGroup className="mb-2">
                      <Form.Control
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        className={
                          this.hasError("password")
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        name="password"
                        type={isPasswordShown ? "text" : "password"}
                        placeholder="Palavra-passe"
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
                  </Form.Group>
                  <div
                    className={
                      this.hasError("password") ? "inline-errormsg" : "hidden"
                    }
                  >
                    A sua palavra-passe está incorreta!
                  </div>
                </Col>
                <Col sm={1} />
              </Row>
              <Row id="row" style={{ marginTop: 10 }}>
                <Col sm={1} />
                <Col sm={10}>
                  <Form.Group
                    controlId="formBasicCheckbox"
                    style={{ color: "black", fontFamily: "artifika" }}
                  >
                    <Form.Check
                      type="checkbox"
                      label="Lembrar-me"
                      style={{ color: "black" }}
                    />
                  </Form.Group>
                </Col>
                <Col sm={1} />
              </Row>
              <Row id="row" style={{ marginTop: 30 }}>
                <Col sm={3} />
                <Col sm={6}>
                  <Button
                    variant="dark"
                    size="md"
                    onClick={this.login}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      color: "black",
                      fontFamily: "artifika",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    {" "}
                    Entrar
                  </Button>
                </Col>
                <Col sm={3} />
              </Row>
              <Row id="row" style={{ marginLeft: 10 }}>
                <Col sm={1} />
                <Col
                  sm={9}
                  style={{ color: "#444903", fontFamily: "artifika" }}
                >
                  <Navbar.Text>
                    <a
                      style={{ color: "#444903", fontFamily: "artifika" }}
                      href="ForgetPassword"
                    >
                      Esqueceu-se da palavra-passe?{" "}
                    </a>
                  </Navbar.Text>
                </Col>
                <Col sm={2} />
              </Row>
              <Row id="row" style={{ marginTop: -15, marginLeft: 18 }}>
                <Col sm={1} />
                <Col
                  sm={9}
                  style={{ color: "#444903", fontFamily: "artifika" }}
                >
                  <h7> Não tem conta? </h7>
                  <Navbar.Text>
                    <a
                      style={{ color: "#444903", fontFamily: "artifika" }}
                      href="Register"
                    >
                      Registe-se!
                    </a>
                  </Navbar.Text>
                </Col>
                <Col sm={2} />
              </Row>
            </Form>
          </Col>
          <Col sm={6}>
            <Image src={menu} width="768" height="721" />
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Login;
