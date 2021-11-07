import React from "react";
import "./style.css";
import {
  Image,
  Tab,
  Row,
  Col,
  Button,
  Table,
  Modal,
  Spinner,
} from "react-bootstrap";
import {
  AiOutlineShoppingCart,
  AiFillDelete,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { Redirect } from "react-router-dom";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      products: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    console.log("Mounting the screen Cart...");
    try {
      let token = await localStorage.getItem("token");
      let type = await localStorage.getItem("type");
      let userId = await localStorage.getItem("userId");
      if (token !== null) {
        this.setState({
          isLogged: true,
          isLoading: false,
          token,
          type,
          userId,
        });
        console.log(userId);
      }
    } catch (e) {
      console.log("Error rending data: " + e);
      this.setState({
        isLogged: false,
      });
    }
    const { token, userId } = this.state;
    try {
      let response = await fetch(
        "http://127.0.0.1:5000/cart/client/" + userId,
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      let json = await response.json();
      const products = json.products;
      console.log(products[0].quantity_product);
      this.setState({
        data: json,
        isLoading: true,
        products,
      });
    } catch (e) {
      console.log("Error to get cart: " + e);
      this.setState({
        empty: true,
        isLoading: true,
      });
    }
  }

  onAdd = (index) => {
    const { products } = this.state;
    products[index].quantity_product =
      parseInt(products[index].quantity_product) + 1;
    this.setState({ products });
    this.edit();
  };

  onSub = (index) => {
    const { products } = this.state;
    if (products[index].quantity_product > 1) {
      products[index].quantity_product -= 1;
    }
    if (products[index].quantity_product === 0) {
      this.setState({ empty: true });
    }
    this.setState({ products });
    this.edit();
  };

  handleCloseDelete = () => {
    this.setState({ showModalDelete: false });
  };

  handleShowDelete = () => {
    this.setState({ showModalDelete: true });
  };

  modalDelete() {
    const { showModalDelete } = this.state;
    return (
      <Modal
        show={showModalDelete}
        onHide={this.handleCloseDelete}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Esvaziar Carrinho</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem a certeza que pretende esvaziar o carrinho?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCloseDelete}>
            Fechar
          </Button>
          <Button
            variant="primary"
            onClick={() => this.delete() && this.handleCloseDelete}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  edit = async () => {
    const { userId, products } = this.state;
    try {
      await fetch("http://127.0.0.1:5000/cart/client/" + userId, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_client: userId,
          email_client: "email",
          products: products,
        }),
      });
    } catch (e) {
      console.log("Error to edit cart: " + e);
    }
  };

  delete = async () => {
    const { userId } = this.state;
    try {
      await fetch("http://127.0.0.1:5000/cart/client/" + userId, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      window.location.reload();
    } catch (e) {
      console.log("Error to delete cart: " + e);
    }
  };

  checkPermissions = () => {
    const { isLogged, isLoading, type } = this.state;
    if ((isLogged === false || type !== "client") && isLoading === true) {
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
    const { products, showModalDelete, empty } = this.state;
    /* let totalQuantity = 0; */
    let totalPrice = 0;
    products.forEach((item, index) => {
      /* totalQuantity += item.quantity_product; */
      totalPrice +=
        products[index].quantity_product * products[index].price_product;
    });
    this.load();
    this.checkPermissions();
    return (
      <div>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row id="row">
            <Col sm={1} />
            <Col sm={5} style={{ marginTop: 35 }}>
              <Row id="row">
                <Col sm={2}>
                  <AiOutlineShoppingCart size="40" color="#444903" />
                </Col>
                <Col sm={8}>
                  <h4 style={{ color: "#AAAA74" }}>Carrinho de compras</h4>
                </Col>
                <Col sm={2} />
              </Row>
            </Col>
            <Col sm={3} />
            <Col sm={3} style={{ marginTop: 35 }}>
              <Row id="row">
                <Col sm={2}>
                  <AiFillDelete size="30" color="#444903" />
                </Col>
                <Col sm={10}>
                  <Button
                    variant="outline-light"
                    disabled={empty}
                    onClick={this.handleShowDelete}
                    style={{
                      backgroundColor: "white",
                      color: "#AAAA74",
                      fontSize: 17,
                    }}
                  >
                    Esvaziar carrinho
                  </Button>
                  {showModalDelete ? this.modalDelete() : false}
                </Col>
              </Row>
            </Col>
          </Row>
        </Tab.Container>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row id="row">
            <Col sm={1} />
            <Col sm={10}>
              <Table
                size="20"
                style={{
                  marginTop: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <thead style={{ width: 10 }}>
                  <tr>
                    <th>Produtos</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                  </tr>
                </thead>
                <tbody>
                  {empty ? (
                    <tr>
                      <td colspan="4">
                        <h4
                          style={{
                            marginTop: 25,
                            marginBottom: 25,
                            fontWeight: "normal",
                          }}
                        >
                          O seu carrinho de compras encontra-se vazio, adicione
                          produtos ao carrinho...
                        </h4>
                      </td>
                    </tr>
                  ) : (
                    products.map((item, index) => {
                      return (
                        <tr>
                          <td>
                            <Image
                              src={item.photo_product}
                              width="80"
                              height="150"
                            />
                          </td>
                          <td style={{ fontSize: 22, textAlign: "center" }}>
                            <AiFillMinusCircle
                              size="28"
                              onClick={() => this.onSub(index)}
                              style={{ marginRight: 10, color: "#444903" }}
                            />
                            {products[index].quantity_product}
                            <AiFillPlusCircle
                              size="28"
                              onClick={() => this.onAdd(index)}
                              style={{ marginLeft: 10, color: "#444903" }}
                            />
                          </td>
                          <td style={{ fontSize: 18, textAlign: "center" }}>
                            {item.price_product}€
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    <td
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Total:{" "}
                    </td>
                    <td style={{ fontSize: 20, textAlign: "center" }}>
                      {totalPrice}€
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </Col>
            <Col sm={1} />
          </Row>
        </Tab.Container>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row id="row" style={{ marginBottom: 80 }}>
            <Col sm={1} />
            <Col sm={1}>
              <Button
                href="/home"
                variant="dark"
                size="lg"
                style={{ backgroundColor: "white", color: "black" }}
              >
                Voltar
              </Button>
            </Col>
            <Col sm={8} style={{ marginTop: 80 }} />
            <Col sm={1}>
              <Button
                href="/ship"
                disabled={empty}
                variant="dark"
                size="lg"
                onClick={this.goTo}
                style={{ color: "white", backgroundColor: "#AAAA74" }}
              >
                Comprar
              </Button>
            </Col>
            <Col sm={1} />
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

export default Cart;
