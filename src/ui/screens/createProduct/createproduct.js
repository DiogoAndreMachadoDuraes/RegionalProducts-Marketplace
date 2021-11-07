import React from "react";
import axios from "axios";
import {
  Card,
  Accordion,
  Row,
  Col,
  Button,
  Container,
  Spinner,
  Form,
  Image,
  Modal,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";

class CreateProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      name: "",
      type: "",
      quantity: "",
      validity: "",
      harvest: "",
      category: "",
      acidity: "",
      alcohol_content: "",
      price: "",
      photo: null,
      stock: "",
      id_producer: "",
      logo_producer: "",
      name_producer: "",
      showModalOptions: false,
      photoURL: "",
      isLoading: false,
    };
  }

  async componentDidMount() {
    let token = await localStorage.getItem("token");
    let type_client = await localStorage.getItem("type");
    let userId = await localStorage.getItem("userId");
    let name_producer = await localStorage.getItem("name");

    if (token !== null) {
      this.setState({
        isLogged: true,
        token,
        type_client,
        userId,
        name_producer,
        isLoading: true,
      });
    }
  }

  handleName = (e) => {
    this.setState({ name: e.target.value });
  };

  handleType = (e) => {
    this.setState({ type: e.target.value });
  };

  handleQuantity = (e) => {
    this.setState({ quantity: e.target.value });
  };

  handleValidity = (e) => {
    this.setState({ validity: e.target.value });
  };

  handleHarvest = (e) => {
    this.setState({ harvest: e.target.value });
  };

  handleCategory = (e) => {
    this.setState({ category: e.target.value });
  };

  handleAcidity = (e) => {
    this.setState({ acidity: e.target.value });
  };

  handleAlcoholContent = (e) => {
    this.setState({ alcohol_content: e.target.value });
  };

  handlePrice = (e) => {
    this.setState({ price: e.target.value });
  };

  handlePhotoBrandy = (e) => {
    const data = new FormData();
    data.append("file", this.uploadInput0.files[0]);
    data.append("filename", "");

    fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: data,
    }).then((response) => {
      response.json().then((fileurl) => {
        this.setState({ photoURL: `http://127.0.0.1:5000/${fileurl}` });
      });
    });
  };

  handlePhotoWine = (e) => {
    const data = new FormData();
    data.append("file", this.uploadInput1.files[0]);
    data.append("filename", "");

    fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: data,
    }).then((response) => {
      response.json().then((fileurl) => {
        this.setState({ photoURL: `http://127.0.0.1:5000/${fileurl}` });
      });
    });
  };
  handlePhotoOlive = (e) => {
    const data = new FormData();
    data.append("file", this.uploadInput2.files[0]);
    data.append("filename", "");

    fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: data,
    }).then((response) => {
      response.json().then((fileurl) => {
        this.setState({ photoURL: `http://127.0.0.1:5000/${fileurl}` });
      });
    });
  };
  handlePhotoLicor = (e) => {
    const data = new FormData();
    data.append("file", this.uploadInput3.files[0]);
    data.append("filename", "");

    fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: data,
    }).then((response) => {
      response.json().then((fileurl) => {
        this.setState({ photoURL: `http://127.0.0.1:5000/${fileurl}` });
      });
    });
  };

  handleStock = (e) => {
    this.setState({ stock: e.target.value });
  };

  handleCategoryWine = (e) => {
    this.setState({ category: "Vinho" });
  };

  handleCategoryOlive = (e) => {
    this.setState({ category: "Azeite" });
  };

  handleCategoryBrandy = (e) => {
    this.setState({ category: "Aguardente" });
  };

  handleCategoryLicor = (e) => {
    this.setState({ category: "Licor" });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ showModalOptions: true });

    const { token, userId, name_producer } = this.state;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(
        `http://127.0.0.1:5000/products`,
        {
          name: this.state.name,
          type: this.state.type,
          quantity: this.state.quantity,
          validity: this.state.validity,
          harvest: this.state.harvest,
          category: this.state.category,
          acidity: this.state.acidity,
          alcohol_content: this.state.alcohol_content,
          price: this.state.price,
          photo: this.state.photoURL,
          stock: this.state.stock,
          id_producer: userId,
          logo_producer: this.state.logo_producer,
          name_producer: name_producer,
        },
        config
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  handleModalOptions = () => {
    this.setState({ showModalOptions: true });
  };

  handleCloseEdit = () => {
    this.setState({ showModalOptions: false });
  };

  checkPermissions = () => {
    const { isLogged, isLoading, type } = this.state;
    if ((isLogged === false || type !== "client") && isLoading === false) {
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

  modalOptions() {
    const { showModalOptions, name } = this.state;
    return (
      <Modal size="md" show={showModalOptions} animation={true}>
        <Modal.Header>
          <Modal.Title>
            O produto {name} foi adicionado com Sucesso!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Button href="/productlistproducer" variant="secondary">
                Voltar à lista de Produtos
              </Button>
            </Col>

            <Col md={6}>
              <Button href="/createproduct" variant="primary">
                Adicionar outro Produto
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }

  render() {
    const { showModalOptions, photoURL } = this.state;
    this.load();
    this.checkPermissions();

    return (
      <div>
        <Container
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/2954929/pexels-photo-2954929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
          }}
          fluid
        >
          <Accordion>
            <Row>
              <Col sm={2} />
              <Col style={{ marginTop: 30, fontFamily: "artifika" }}>
                <Card>
                  <Card.Header style={{ backgroundColor: "#AAAA74" }}>
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey="0"
                      style={{ color: "black" }}
                    >
                      <h2>Adicionar Vinho</h2>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0" style={{ color: "black" }}>
                    <Card.Body>
                      {" "}
                      <Container>
                        <Row>
                          <Col>
                            <h4>
                              Preencha os seguintes campos para adicionar um
                              novo vinho :
                            </h4>
                          </Col>
                        </Row>
                        <br />

                        <Row>
                          <Col md={4}></Col>
                        </Row>
                        <form onSubmit={this.handleSubmit}>
                          <Row>
                            <Col>
                              <Form.Label>Nome </Form.Label>
                              <Form.Control
                                id="nome"
                                required
                                onChange={this.handleName}
                                type="text"
                                placeholder="Nome"
                              />
                            </Col>

                            <Col>
                              <Form.Label>
                                Quantidade por garrafa (em ML )
                              </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleQuantity}
                                id="quantidade"
                                type="number"
                                min="1"
                                placeholder="Quantidade por garrafa"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <Form.Label> Validade </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleValidity}
                                id="validade"
                                min="2021"
                                type="number"
                                placeholder=" Validade"
                              />
                            </Col>
                            <Col>
                              <Form.Label>Data de Colheita </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleHarvest}
                                id="data_colheita"
                                max="2021-05-03"
                                type="date"
                                placeholder="Data de Colheita"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <Form.Label>Teor Alcóol </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleAlcoholContent}
                                id="teor"
                                min="0"
                                type="number"
                                placeholder="Teor de Alcóol"
                              />
                            </Col>
                            <Col md={6}>
                              <Form.Label>Preço </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handlePrice}
                                id="preco"
                                min="0.01"
                                type="number"
                                placeholder="Preço"
                                step=".01"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <Form.Label>Tipo de Vinho </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleType}
                                as="select"
                              >
                                <option>Tinto</option>
                                <option>Branco</option>
                                <option>Rose</option>
                                <option>Espumante</option>
                              </Form.Control>
                            </Col>
                            <Col>
                              <Form.Label>Quantidade de Stock </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleStock}
                                id="stock"
                                min="1"
                                type="number"
                                placeholder="Stock"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <Form>
                                <form onChange={this.handlePhotoWine}>
                                  <div>
                                    <input
                                      ref={(ref) => {
                                        this.uploadInput1 = ref;
                                      }}
                                      type="file"
                                    />
                                  </div>

                                  <br />
                                </form>
                              </Form>
                            </Col>
                            <Col>
                              <Image
                                height="120"
                                width="80"
                                className="padding_image"
                                src={photoURL}
                              ></Image>
                            </Col>
                          </Row>
                          <Row style={{ marginTop: 20 }}>
                            {" "}
                            <Button
                              type="submit"
                              onClick={() =>
                                this.handleCategoryWine() &&
                                this.handleModalOptions
                              }
                              variant="primary"
                              size="lg"
                              block
                            >
                              Adicionar
                              {showModalOptions ? this.modalOptions() : false}
                            </Button>
                          </Row>
                        </form>
                      </Container>{" "}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header style={{ backgroundColor: "#AAAA74" }}>
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey="1"
                      style={{ color: "black" }}
                    >
                      <h2>Adicionar Azeite</h2>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1" style={{ color: "black" }}>
                    <Card.Body>
                      <Container>
                        <Row>
                          <Col>
                            <h4>
                              Preencha os seguintes campos para adicionar um
                              novo azeite :
                            </h4>
                          </Col>
                        </Row>
                        <br />

                        <Row>
                          <Col md={4}></Col>
                        </Row>

                        <Form onSubmit={this.handleSubmit}>
                          <Row>
                            <Col>
                              <Form.Label>Nome </Form.Label>
                              <Form.Control
                                id="nome"
                                required
                                onChange={this.handleName}
                                type="text"
                                placeholder="Nome"
                              />
                            </Col>

                            <Col>
                              <Form.Label>
                                Quantidade por garrafa em (ml)
                              </Form.Label>
                              <Form.Control
                                onChange={this.handleQuantity}
                                id="quantidade"
                                type="number"
                                min="1"
                                placeholder="Quantidade"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <Form.Label>Validade </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleValidity}
                                id="validade"
                                min="2021"
                                type="number"
                                placeholder=" Validade"
                              />
                            </Col>
                            <Col>
                              <Form.Label>Data de Colheita </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleHarvest}
                                id="data_colheita"
                                max="2021-05-03"
                                type="date"
                                placeholder="Data de Colheita"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <Form.Label>Acidez </Form.Label>
                              <Form.Control
                                onChange={this.handleAcidity}
                                required
                                min="0"
                                id="acidez"
                                type="number"
                                placeholder="Acidez"
                              />
                            </Col>
                            <Col md={6}>
                              <Form.Label>Preço </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handlePrice}
                                id="preco"
                                min="0.01"
                                type="number"
                                placeholder="Preço"
                                step=".01"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <Form.Label>Tipo de Azeite </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleType}
                                as="select"
                              >
                                <option>Virgem</option>
                                <option>Extra-Virgem</option>
                                <option>Aromatizado</option>
                              </Form.Control>
                            </Col>
                            <Col>
                              <Form.Label>Quantidade de Stock </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleStock}
                                id="stock"
                                min="1"
                                type="number"
                                placeholder="Stock"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <Form>
                                <form onChange={this.handlePhotoOlive}>
                                  <div>
                                    <input
                                      ref={(ref) => {
                                        this.uploadInput2 = ref;
                                      }}
                                      type="file"
                                    />
                                  </div>

                                  <br />
                                </form>
                              </Form>
                            </Col>
                            <Col>
                              <Image
                                height="120"
                                width="80"
                                className="padding_image"
                                src={photoURL}
                              ></Image>
                            </Col>
                          </Row>
                          <Row style={{ marginTop: 20 }}>
                            {" "}
                            <Button
                              type="submit"
                              onClick={this.handleCategoryOlive}
                              variant="primary"
                              size="lg"
                              block
                            >
                              Adicionar
                            </Button>
                          </Row>
                        </Form>
                      </Container>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header style={{ backgroundColor: "#AAAA74" }}>
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey="2"
                      style={{ color: "black" }}
                    >
                      <h2>Adicionar Aguardente</h2>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="2" style={{ color: "black" }}>
                    <Card.Body>
                      <Container>
                        <Row>
                          <Col>
                            <h4>
                              Preencha os seguintes campos para adicionar uma
                              nova Aguardente :
                            </h4>
                          </Col>
                        </Row>
                        <br />

                        <Row>
                          <Col md={4}></Col>
                        </Row>

                        <Form onSubmit={this.handleSubmit}>
                          <Row>
                            <Col>
                              <Form.Label>Nome </Form.Label>
                              <Form.Control
                                id="nome"
                                required
                                onChange={this.handleName}
                                type="text"
                                placeholder="Nome"
                              />
                            </Col>

                            <Col>
                              <Form.Label>
                                Quantidade por garrafa (em ML){" "}
                              </Form.Label>
                              <Form.Control
                                onChange={this.handleQuantity}
                                id="quantidade"
                                type="number"
                                min="1"
                                placeholder="Quantidade"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <Form.Label>Validade </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleValidity}
                                id="validade"
                                min="2021"
                                type="number"
                                placeholder=" Validade"
                              />
                            </Col>
                            <Col>
                              <Form.Label>Data de Colheita </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleHarvest}
                                id="data_colheita"
                                max="2021-05-03"
                                type="date"
                                placeholder="Data de Colheita"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <Form.Label>Teor Alcóol </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleAlcoholContent}
                                id="teor"
                                min="0"
                                type="number"
                                placeholder="Teor de Alcóol"
                              />
                            </Col>
                            <Col md={6}>
                              <Form.Label>Preço </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handlePrice}
                                id="preco"
                                min="0.01"
                                type="number"
                                placeholder="Preço"
                                step=".01"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <Form.Label>Tipo de Aguardente </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleType}
                                as="select"
                              >
                                <option>Medronho</option>
                                <option>Ceriais</option>
                                <option>Cana de Madeira</option>
                                <option>Pera</option>
                              </Form.Control>
                            </Col>
                            <Col>
                              <Form.Label>Quantidade de Stock </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleStock}
                                id="stock"
                                min="1"
                                type="number"
                                placeholder="Stock"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <Form>
                                <form onChange={this.handlePhotoBrandy}>
                                  <div>
                                    <input
                                      ref={(ref) => {
                                        this.uploadInput0 = ref;
                                      }}
                                      type="file"
                                    />
                                  </div>

                                  <br />
                                </form>
                              </Form>
                            </Col>
                            <Col>
                              <Image
                                height="120"
                                width="80"
                                className="padding_image"
                                src={photoURL}
                              ></Image>
                            </Col>
                          </Row>
                          <Row style={{ marginTop: 20 }}>
                            {" "}
                            <Button
                              type="submit"
                              onClick={this.handleCategoryBrandy}
                              variant="primary"
                              size="lg"
                              block
                            >
                              Adicionar
                            </Button>
                          </Row>
                        </Form>
                      </Container>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header style={{ backgroundColor: "#AAAA74" }}>
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey="3"
                      style={{ color: "black" }}
                    >
                      <h2>Adicionar Licor</h2>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="3" style={{ color: "black" }}>
                    <Card.Body>
                      <Container>
                        <Row>
                          <Col>
                            <h4>
                              Preencha os seguintes campos para adicionar um
                              novo licor :
                            </h4>
                          </Col>
                        </Row>
                        <br />

                        <Row>
                          <Col md={4}></Col>
                        </Row>

                        <Form onSubmit={this.handleSubmit}>
                          <Row>
                            <Col>
                              <Form.Label>Nome </Form.Label>
                              <Form.Control
                                id="nome"
                                required
                                onChange={this.handleName}
                                type="text"
                                placeholder="Nome"
                              />
                            </Col>

                            <Col>
                              <Form.Label>
                                Quantidade por garrafa (em ML){" "}
                              </Form.Label>
                              <Form.Control
                                onChange={this.handleQuantity}
                                id="quantidade"
                                type="number"
                                min="1"
                                placeholder="Quantidade"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <Form.Label>Validade </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleValidity}
                                id="validade"
                                min="2021"
                                type="number"
                                placeholder=" Validade"
                              />
                            </Col>
                            <Col>
                              <Form.Label>Data de Colheita </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleHarvest}
                                id="data_colheita"
                                max="2021-05-03"
                                type="date"
                                placeholder="Data de Colheita"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <Form.Label>Teor Alcóol </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleAlcoholContent}
                                id="teor"
                                min="0"
                                type="number"
                                placeholder="Teor de Alcóol"
                              />
                            </Col>
                            <Col md={6}>
                              <Form.Label>Preço </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handlePrice}
                                id="preco"
                                min="0.01"
                                type="number"
                                placeholder="Preço"
                                step=".01"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <Form.Label>Tipo de Licor </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleType}
                                as="select"
                              >
                                <option>Limoncello</option>
                                <option>Cafe</option>
                                <option>Amendoa</option>
                                <option>Chocolate</option>
                              </Form.Control>
                            </Col>
                            <Col>
                              <Form.Label>Quantidade de Stock </Form.Label>
                              <Form.Control
                                required
                                onChange={this.handleStock}
                                id="stock"
                                min="1"
                                type="number"
                                placeholder="Stock"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <form onChange={this.handlePhotoLicor}>
                                <div>
                                  <input
                                    ref={(ref) => {
                                      this.uploadInput3 = ref;
                                    }}
                                    type="file"
                                  />
                                </div>

                                <br />
                              </form>
                            </Col>
                            <Col>
                              <Image
                                height="120"
                                width="80"
                                className="padding_image"
                                src={photoURL}
                              ></Image>
                            </Col>
                          </Row>
                          <Row style={{ marginTop: 20 }}>
                            {" "}
                            <Button
                              type="submit"
                              onClick={this.handleCategoryLicor}
                              variant="primary"
                              size="lg"
                              block
                            >
                              Adicionar
                            </Button>
                          </Row>
                        </Form>
                      </Container>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Col>
              <Col sm={2} />
            </Row>
          </Accordion>
          <br></br>
        </Container>
      </div>
    );
  }
}
export default CreateProduct;
