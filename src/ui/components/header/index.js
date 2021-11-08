import React, { Component } from "react";
import "./style.css";
import {
  Navbar,
  Form,
  Nav,
  FormControl,
  Button,
  NavDropdown,
  Image,
  Container,
  Row,
  Col,
  Dropdown,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { TiShoppingCart } from "react-icons/ti";
import { GiExitDoor } from "react-icons/gi";
import { MdLanguage } from "react-icons/md";
import logo from "../../../assets/logo.jpg";
import { AiOutlineSearch } from "react-icons/ai";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      language: "PT",
      name: "",
      type: "",
    };
  }

  async componentDidMount() {
    try {
      let name = await localStorage.getItem("name");
      let type = await localStorage.getItem("type");
      if (name !== null) {
        this.setState({
          isLogged: true,
          isLoading: true,
          name,
          type,
        });
      }
    } catch (e) {
      console.log("Error rending data: " + e);
      this.setState({
        isLoading: true,
      });
    }
    /* 
            GET DAS CATEGORIAS E DOS TIPOS
            
        try {
            let response = await fetch('http://127.0.0.1:5000/product/category', { 
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let json = await response.json();
            this.setState({ 
                category: json
            });
            console.log(json);
        } catch(e){
            console.log("Error to get data: " + e);
        }
        try {
            let response = await fetch('http://127.0.0.1:5000/product/type', { 
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let json = await response.json();
            this.setState({ 
                type: json
            });
            console.log(json);
        } catch(e){
            console.log("Error to get data: " + e);
        }
        */
  }

  onChangeLanguage(e) {
    this.setState({ language: e.target.value });
  }

  logout() {
    localStorage.removeItem("name");
    localStorage.removeItem("type");
    localStorage.removeItem("token");
  }

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
    const { isLogged, language, name, type } = this.state;
    const url = "/" + type + "";
    this.load();
    return (
      <div className="header">
        <Navbar collapseOnSelect expand="lg" className={"nav-up"}>
          <Container fluid>
            <Row id="row">
              <Col sm={3}>
                <Navbar.Brand>
                  <Image src={logo} />
                </Navbar.Brand>
              </Col>
              <Col sm={2}>
                <Nav className="mr-auto">
                  <Nav.Link>
                    <h3 style={{ fontSize: 16, color: "black" }}>Idioma:</h3>
                    <Row style={{ marginLeft: 5 }}>
                      <MdLanguage size="20" style={{ color: "#444903" }} />
                      <NavDropdown
                        title={language}
                        id="language-dropdown"
                        style={{ fontSize: 14, marginLeft: 5, marginTop: -10 }}
                      >
                        <Dropdown.Header>Linguagem:</Dropdown.Header>
                        <Form.Group>
                          <Form.Control
                            as="select"
                            value={language}
                            onChange={this.onChangeLanguage.bind(this)}
                          >
                            <option value="PT">PT</option>
                            <option value="EN">EN</option>
                          </Form.Control>
                        </Form.Group>
                        <Dropdown.Divider />
                        <Dropdown.Header>Moeda: Euro(€)</Dropdown.Header>
                      </NavDropdown>
                    </Row>
                  </Nav.Link>
                </Nav>
              </Col>
              <Col sm={2}>
                <Form outline className="mr-auto">
                  <InputGroup className="mb-2">
                    <FormControl type="text" placeholder="O que procura?" />
                    <InputGroup.Append>
                      <InputGroup.Text id="search">
                        <AiOutlineSearch />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form>
              </Col>
              <Col sm={1} />
              <Col sm={4}>
                {isLogged ? (
                  <Row>
                    <Col sm={6}>
                      <Nav className="mr-auto">
                        <Nav.Link href={url}>
                          <h3 style={{ fontSize: 14, color: "black" }}>
                            Bem vindo,
                            <h3
                              style={{
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "black",
                                textDecoration: "underline",
                              }}
                            >
                              {name}
                            </h3>
                          </h3>
                        </Nav.Link>
                      </Nav>
                    </Col>
                    <Col sm={6}>
                      <Nav className="mr-auto">
                        <Nav.Link
                          href="/home"
                          onClick={this.logout}
                          eventKey={2}
                        >
                          <Row>
                            <Col sm={7}>
                              <h3
                                style={{
                                  fontSize: 14,
                                  color: "black",
                                  textAlign: "center",
                                }}
                              >
                                Sair da conta
                              </h3>
                            </Col>
                            <Col sm={5}>
                              <GiExitDoor size="30" />
                            </Col>
                          </Row>
                        </Nav.Link>
                      </Nav>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col lg={4} sm={2} xs={2} />
                    <Col lg={8} sm={10} xs={10}>
                      <Nav className="mr-auto">
                        <Nav.Link href="/login">
                          <Button
                            variant="outline-dark"
                            style={{
                              color: "black",
                              fontFamily: "bold",
                              borderRadius: 20,
                            }}
                          >
                            Iniciar Sessão
                          </Button>
                        </Nav.Link>
                        <Nav.Link href="/register" eventKey={2}>
                          <Button
                            variant="outline-light"
                            style={{
                              color: "#AAAA74",
                              fontFamily: "bold",
                              backgroundColor: "white",
                              borderRadius: 20,
                            }}
                          >
                            Criar Conta
                          </Button>
                        </Nav.Link>
                      </Nav>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Container>
        </Navbar>
        <Navbar collapseOnSelect expand="lg" className={"nav-down"}>
          {isLogged && type === "client" ? (
            <>
              <Nav.Link href="/home" style={{ color: "white", marginLeft: 20 }}>
                Home
              </Nav.Link>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <NavDropdown
                    title="Produtos"
                    id="collasible-nav-dropdown"
                    noCaret
                  >
                    {/* {
                                            data.map((item, index) => {
                                                return(
                                                        <Dropdown.Header>{item.category}</Dropdown.Header>
                                                        <Dropdown.Item href="/product/:categoryolive/virgin" eventKey="1">{item.type}</Dropdown.Item>
                                                        <Dropdown.Item href="/product/olive/extravirgin" eventKey="2">{item.type}</Dropdown.Item>
                                                        <Dropdown.Item href="/product/olive/flavor" eventKey="3">{item.type}</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                    );
                                                })
                                        } */}

                    <Dropdown.Header>Azeites</Dropdown.Header>
                    <Dropdown.Item
                      href="/product/:categoryolive/virgin"
                      eventKey="1"
                    >
                      Azeite Virgem
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="/product/olive/extravirgin"
                      eventKey="2"
                    >
                      Azeite Extra-Virgem
                    </Dropdown.Item>
                    <Dropdown.Item href="/product/olive/flavor" eventKey="3">
                      Azeite Aromatizado
                    </Dropdown.Item>
                    <Dropdown.Divider />

                    <Dropdown.Header>Vinhos</Dropdown.Header>
                    <Dropdown.Item href="/product/wine/tinto" eventKey="1">
                      Vinho Tinto
                    </Dropdown.Item>
                    <Dropdown.Item href="/product/wine/branco" eventKey="2">
                      Vinho Branco
                    </Dropdown.Item>
                    <Dropdown.Item href="/product/wine/rose" eventKey="3">
                      Vinho Rosé
                    </Dropdown.Item>
                    <Dropdown.Item href="/product/wine/espumante" eventKey="4">
                      Espumante
                    </Dropdown.Item>
                    <Dropdown.Divider />
                  </NavDropdown>
                  <Nav.Link href="/favorites" style={{ color: "white" }}>
                    Favoritos
                  </Nav.Link>
                  <Nav.Link href="/order" style={{ color: "white" }}>
                    Encomendas
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
              <Nav>
                <Nav.Link eventKey={2} href="/cart">
                  <a href="/cart" style={{ color: "white" }}>
                    Carrinho
                  </a>
                  <TiShoppingCart
                    size="25"
                    style={{ color: "white", marginRight: 20 }}
                  />
                </Nav.Link>
              </Nav>
            </>
          ) : (
            false
          )}
          {isLogged && type === "admin" ? (
            <>
              <Nav.Link
                href="/dashboardadmin"
                style={{ color: "white", marginLeft: 20 }}
              >
                Home
              </Nav.Link>
              <Nav.Link href="/producerlist" style={{ color: "white" }}>
                Produtores
              </Nav.Link>
              <Nav.Link href="/productlist" style={{ color: "white" }}>
                Produtos
              </Nav.Link>
              <Nav.Link href="/clientlist" style={{ color: "white" }}>
                Clientes
              </Nav.Link>
            </>
          ) : (
            false
          )}
          {isLogged && type === "producer" ? (
            <>
              <Nav.Link
                href="/dashboardproducer"
                style={{ color: "white", marginLeft: 20 }}
              >
                Home
              </Nav.Link>
              <Nav.Link href="/productlistproducer" style={{ color: "white" }}>
                Produtos
              </Nav.Link>
              <Nav.Link href="/producerorder" style={{ color: "white" }}>
                Vendas
              </Nav.Link>
            </>
          ) : (
            false
          )}
          {isLogged === false && (
            <>
              <Nav.Link href="/home" style={{ color: "white", marginLeft: 20 }}>
                Home
              </Nav.Link>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <NavDropdown
                    title="Produtos"
                    id="collasible-nav-dropdown"
                    noCaret
                  >
                    <Dropdown.Header>Azeites</Dropdown.Header>
                    <Dropdown.Item href="/product/olive/virgin" eventKey="1">
                      Azeite Virgem
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="/product/olive/extravirgin"
                      eventKey="2"
                    >
                      Azeite Extra-Virgem
                    </Dropdown.Item>
                    <Dropdown.Item href="/product/olive/flavor" eventKey="3">
                      Azeite Aromatizado
                    </Dropdown.Item>
                    <Dropdown.Divider />

                    <Dropdown.Header>Vinhos</Dropdown.Header>
                    <Dropdown.Item href="/product/wine/tinto" eventKey="1">
                      Vinho Tinto
                    </Dropdown.Item>
                    <Dropdown.Item href="/product/wine/branco" eventKey="2">
                      Vinho Branco
                    </Dropdown.Item>
                    <Dropdown.Item href="/product/wine/rose" eventKey="3">
                      Vinho Rosé
                    </Dropdown.Item>
                    <Dropdown.Item href="/product/wine/espumante" eventKey="4">
                      Espumante
                    </Dropdown.Item>
                    <Dropdown.Divider />

                    <Dropdown.Header>Aguardentes</Dropdown.Header>
                    <Dropdown.Item href="/product/brandy/arbutus" eventKey="1">
                      Aguardente de Medronho
                    </Dropdown.Item>
                    <Dropdown.Item href="/product/brandy/cereals" eventKey="2">
                      Aguardente de Cereais
                    </Dropdown.Item>
                    <Dropdown.Item href="/product/brandy/woodcane" eventKey="3">
                      Aguardente de Cana de Madeira
                    </Dropdown.Item>
                    <Dropdown.Item href="/product/brandy/pear" eventKey="4">
                      Aguardente de Pêra
                    </Dropdown.Item>
                    <Dropdown.Divider />

                    <Dropdown.Header>Licores</Dropdown.Header>
                    <Dropdown.Item
                      href="/product/liquor/limoncello"
                      eventKey="1"
                    >
                      Licor de Limoncello
                    </Dropdown.Item>
                    <Dropdown.Item href="/product/liquor/coffee" eventKey="2">
                      Licor de Café
                    </Dropdown.Item>
                    <Dropdown.Item href="/product/liquor/almonds" eventKey="3">
                      Licor de Amêndoas
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="/product/liquor/chocolate"
                      eventKey="4"
                    >
                      Licor de Chocolate
                    </Dropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Navbar>
      </div>
    );
  }
}

export default Header;
