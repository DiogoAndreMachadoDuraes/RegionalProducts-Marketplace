import React from "react";
import "./style.css";
import {
  Card,
  Container,
  Button,
  CardGroup,
  Breadcrumb,
  Modal,
} from "react-bootstrap";
import { BsFillHeartFill } from "react-icons/bs";
import axios from "axios";
import moment from "moment";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wines: [],
      oliveoil: [],
      products: [],
      hasCart: false,
      products2: {},
      products3: [],
      showModalOptionsCart: false,
      showModalOptionsFavorites: false,
    };
  }

  async componentDidMount() {
    try {
      let token = await localStorage.getItem("token");
      let type = await localStorage.getItem("type");
      let userId = await localStorage.getItem("userId");
      let name = await localStorage.getItem("name");
      if (token !== null) {
        this.setState({
          isLogged: true,
          token,
          type,
          userId,
          name,
        });
        console.log(userId);
      } else {
        this.setState({
          isLogged: false,
        });
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios
        .get(`http://127.0.0.1:5000/products/category/Vinho`, config)
        .then((res) => {
          let products = res.data;
          this.setState(products);
        });
      /*    await axios.get(`http://127.0.0.1:5000/products/category/Azeite`, config) 
            .then(res => {
              const productsazeite = res.data;
              this.setState(productsazeite);
           
            }) Está a criar problemas o duplo get*/
    } catch (e) {
      console.log("Error rending data: " + e);
    }
  }

  handlegotodetail(product) {
    this.props.history.push("/productdetail", {
      id_product: product._id.$oid,
      acidity: product.acidity,
      quantity: product.quantity,
      name: product.name,
      harvest: product.harvest,
      validity: product.validity,
      category: product.category,
      type: product.type,
      price: product.price,
      photo: product.photo,
      alcohol_content: product.alcohol_content,
      id_producer: product.id_producer,
      name_producer: product.name_producer,
      photo_producer: product.photo_producer,
    });
  }

  modalOptionsCart() {
    const { showModalOptionsCart } = this.state;
    return (
      <Modal size="md" show={showModalOptionsCart} animation={true}>
        <Modal.Header>
          <Modal.Title>O produto foi adicionado ao Carrinho!</Modal.Title>
        </Modal.Header>
      </Modal>
    );
  }

  modalOptionsFavorites() {
    const { showModalOptionsFavorites } = this.state;
    return (
      <Modal size="md" show={showModalOptionsFavorites} animation={true}>
        <Modal.Header>
          <Modal.Title>O produto foi adicionado aos Favoritos!</Modal.Title>
        </Modal.Header>
      </Modal>
    );
  }

  handleModalOptionsCart = () => {
    this.setState({ showModalOptionsCart: true });
  };

  handleModalOptionsFavorites = () => {
    this.setState({ showModalOptionsFavorites: true });
  };

  handleaddToCart(product) {
    const { userId, token, isLogged } = this.state;

    if (isLogged === false) {
      this.props.history.push("/login");
    } else {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios.get(`http://127.0.0.1:5000/cart/client/${userId}`, config).then(
        (response) => {
          const carts = response.data;
          this.setState({ carts });
          const products2 = carts.products;
          this.setState(products2);

          var teste = {
            id_product: product._id.$oid,
            name_product: product.name,
            photo_product: product.photo,
            price_product: product.price,
            quantity_product: "1",
          };
          products2.push(teste);

          axios.put(
            `http://127.0.0.1:5000/cart/client/${userId}`,
            {
              id_client: userId,
              email_client: "email",
              products: products2,
            },
            config
          );
          this.setState({ showModalOptionsCart: true });
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        },
        (error) => {
          axios.post(
            "http://127.0.0.1:5000/carts",
            {
              id_client: userId,
              email_client: "email",
              products: [
                {
                  id_product: product._id.$oid,
                  name_product: product.name,
                  photo_product: product.photo,
                  price_product: product.price,
                  quantity_product: "1",
                },
              ],
            },
            config
          );
          this.setState({ showModalOptionsCart: true });
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        }
      );
    }
  }

  handleaddToFavorite(product) {
    const { userId, token, isLogged } = this.state;

    if (isLogged === false) {
      this.props.history.push("/login");
    } else {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios.get(`http://127.0.0.1:5000/favorites/${userId}`, config).then(
        (response) => {
          const favorites = response.data;
          this.setState({ favorites });
          const products3 = favorites.products;
          this.setState(products3);
          var teste = {
            id_product: product._id.$oid,
            name_product: product.name,
            photo_product: product.photo,
            price_product: product.price,
            quantity_product: product.quantity,
          };
          products3.push(teste);

          axios.put(
            `http://127.0.0.1:5000/favorites/${userId}`,
            {
              id_client: userId,
              date: moment().format("YYYY/MM/DD HH:mm:ss"),
              products: products3,
            },
            config
          );
          this.setState({ showModalOptionsFavorites: true });
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        },
        (error) => {
          axios.post(
            "http://127.0.0.1:5000/favorites",
            {
              id_client: userId,
              date: moment().format("YYYY/MM/DD HH:mm:ss"),
              products: [
                {
                  id_product: product._id.$oid,
                  name_product: product.name,
                  photo_product: product.photo,
                  price_product: product.price,
                  quantity_product: product.quantity,
                },
              ],
            },
            config
          );
          this.setState({ showModalOptionsFavorites: true });
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        }
      );
    }
  }

  renderProduct = (product, index) => {
    const { showModalOptionsCart, showModalOptionsFavorites } = this.state;
    return (
      <Card key={index}>
        <Card.Title className="text-right" style={{ marginRight: 10 }}>
          {" "}
          <BsFillHeartFill
            color="#C8C8C8"
            onClick={() =>
              this.handleaddToFavorite(product) &&
              this.handleModalOptionsFavorites
            }
          >
            {showModalOptionsFavorites ? this.modalOptionsFavorites() : false}
          </BsFillHeartFill>{" "}
        </Card.Title>
        <Card.Img
          variant="top"
          src={product.photo}
          onClick={() => this.handlegotodetail(product)}
        ></Card.Img>
        <Card.Body>
          <Card.Title onClick={() => this.handlegotodetail(product)}>
            {" "}
            {product.name}{" "}
          </Card.Title>
          <Card.Text>{product.price} €</Card.Text>

          <Button
            variant="primary"
            onClick={() =>
              this.handleaddToCart(product) && this.handleModalOptionsCart
            }
          >
            Adicionar ao Carrinho
            {showModalOptionsCart ? this.modalOptionsCart() : false}
          </Button>
        </Card.Body>
      </Card>
    );
  };

  render() {
    const { /*wines, oliveoil*/ products } = this.state;
    return (
      <div>
        <div>
          <Breadcrumb style={{ marginTop: 20, marginLeft: 28 }} id="breadcrumb">
            <Breadcrumb.Item active style={{ color: "#AAAA74" }} href="#">
              Home
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <br></br>
        <Container>
          <h1 active style={{ color: "#AAAA74" }}>
            {" "}
            Vinhos mais vendidos{" "}
          </h1>
          <br></br>
          <CardGroup>{products.map(this.renderProduct)}</CardGroup>
        </Container>
        <br></br>
        <Container>
          <h1 active style={{ color: "#AAAA74" }}>
            {" "}
            Azeites mais vendidos{" "}
          </h1>
          <br></br>
          <CardGroup>{products.map(this.renderProduct)}</CardGroup>
        </Container>
      </div>
    );
  }
}

export default Home;
