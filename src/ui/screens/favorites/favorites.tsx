import React, {useState} from "react";
import axios from "axios";
import {Breadcrumb, Row, Col, NavDropdown, CardImg, Card, Button, Modal} from "react-bootstrap";
import { useHistory } from 'react-router';
import { BsFillHeartFill } from "react-icons/bs";
/*import { Redirect } from "react-router-dom";*/

interface FavoritesList {}

interface ProductsList {
  id_product:  {$oid: string},
  name_product: string;
  photo_product: string;
  price_product: string;
  quantity_product: string;
}

interface Products2List {}

interface Products3List {}

export const Favorites: React.FC = () => {
	const Spacer = require('react-spacer')

  const history = useHistory();

  const [favorites, setFavorites] = useState<FavoritesList[]>();
  const [products, setProducts] = useState<ProductsList[]>();
  const [products2, setProducts2] = useState<Products2List[]>();
  const [products3, setProducts3] = useState<Products3List[]>();
  const [isLogged, setIsLogged] = useState(false);
  const [hasfavorites, setHasfavorites] = useState(false);
  const [carts, setCarts] = useState('');
  const [showModalOptions, setShowModalOptions] = useState(false);


const modalOptions = () => {
    return (
      <Modal /* size="md" */ show={showModalOptions} animation={true}>
        <Modal.Header>
          <Modal.Title>O produto foi adicionado ao Carrinho!</Modal.Title>
        </Modal.Header>
      </Modal>
    );
  }

const handleDeleteFavorites = () => {
    const config = {
      /* headers: { Authorization: `Bearer ${token}` }, */
    };
    axios.delete(''/* `http://127.0.0.1:5000/favorites/${userId}` */, config);
    window.location.reload();
  }

const handleModalOptions = () => {
    setShowModalOptions(true);
  };

const  handleaddToCart = (product : ProductsList) => {
    if (isLogged === false) {
      history.push('/login');
    } else {
      const config = {
        /* headers: { Authorization: `Bearer ${token}` }, */
      };

      axios.get(''/* `http://127.0.0.1:5000/cart/client/${userId}` */, config).then(
        (response) => {
          const carts = response.data;
          setCarts(carts);
          const products2 = carts.products;
          setProducts2(products2);

          var teste = {
            id_product: product.id_product,
            name_product: product.name_product,
            photo_product: product.photo_product,
            price_product: product.price_product,
            quantity_product: product.quantity_product,
          };
          products2.push(teste);

          axios.put( ''
            /* `http://127.0.0.1:5000/cart/client/${userId}` */,
            {
              /* id_client: userId, */
              email_client: "email",
              products: products2,
            },
            config
          );
          setShowModalOptions(true);
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        },
        (error) => {
          axios.post(
            "http://127.0.0.1:5000/carts",
            {
              /* id_client: userId, */
              email_client: "email",
              products: [
                {
                  id_product: product.id_product,
                  name_product: product.name_product,
                  photo_product: product.photo_product,
                  price_product: product.price_product,
                  quantity_product: product.quantity_product,
                },
              ],
            },
            config
          );
          setShowModalOptions(true);
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        }
      );
    }
  }

 const handleRemoveFavorite = (product: { id: any; name: any; photo: any; price: any; quantity: any; }) => {
    const config = {
/*       headers: { Authorization: `Bearer ${token}` },
 */    };

    axios
      .get(''/* `http://127.0.0.1:5000/favorites/${userId}` */, config)
      .then((response) => {
        const favorites = response.data;
        setFavorites( favorites );
        const products3 = favorites.products;
        setProducts3(products3);
        var teste = {
          id_product: product.id,
          name_product: product.name,
          photo_product: product.photo,
          price_product: product.price,
          quantity_product: product.quantity,
        };
        products3.pop(teste);

        if (!products3.length) {
          axios.delete(''/* `http://127.0.0.1:5000/favorites/${userId}` */, config);
          window.location.reload();
        } else {
          axios.put(''
           /*  `http://127.0.0.1:5000/favorites/${userId}` */,
            {
              /* id_client: userId, */
              date: "email",
              products: products3,
            },
            config
          );
          window.location.reload();
        }
      });
  }
  const handlegotodetail = (product: { id: any; acidity: any; quantity: any; name: any; harvest: any; validity: any; category: any; type: any; price: any; photo: any; alcohol_content: any; id_producer: any; name_producer: any; photo_producer: any; }) => {
    history.push("/productdetail", {
      id_product: product.id,
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

const renderFavorite = (product: ProductsList, index: React.Key | null | undefined) => {
    return (
      <Card style={{ width: 900 }} key={index}>
        <Row>
          <Col
            lg="4"
            className="text-center"
            style={{ marginTop: 25, marginLeft: 20 }}
          >
            {" "}
            <CardImg
              /* onClick={() => handlegotodetail(product)} */
              src={product.photo_product}
            />
          </Col>

          <Col /*  margin={{ marginLeft: 20 }} */>
            <Row md={12}>
              <h3
               /*  onClick={() => handlegotodetail(product)} */
                style={{ marginLeft: 20, marginTop: 25 }}
              >
                {product.name_product}
              </h3>

              <BsFillHeartFill
                style={{ marginLeft: 200, marginTop: 25 }}
                color="red"
                size="2em"
                /* onClick={() => handleRemoveFavorite(product)} */
              ></BsFillHeartFill>
            </Row>

            <Row style={{ marginLeft: 3, marginTop: 25 }}>
              <h6 style={{ marginLeft: 3, marginTop: -1 }}>
                Quantidade : {product.quantity_product} ml
              </h6>
            </Row>

            <Row style={{ marginTop: 20 }}>
              <h6 style={{ marginLeft: 20 }}>
                {" "}
                Preço : {product.price_product} €{" "}
              </h6>
            </Row>

            <Row style={{ marginTop: 70, marginLeft: 80 }}>
              <Col>
                <Button
                  size="lg"
                  variant="primary"
                  /* onClick={() =>
                    handleaddToCart(product) && handleModalOptions
                  } */
                >
                  Adicionar ao Carrinho
                  {showModalOptions ? modalOptions() : false}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  };

  return (
  <>
    <div>
      <div>
            <Breadcrumb
              style={{ marginTop: 20, marginLeft: 28 }}
              id="breadcrumb"
            >
              <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
              <Breadcrumb.Item active style={{ color: "#AAAA74" }}>
                {" "}
                Favoritos{" "}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <Row>
            <Breadcrumb
              style={{ marginTop: 20, marginLeft: 28 }}
              id="breadcrumb"
            ></Breadcrumb>

            <Col md={2} style={{ marginTop: 80 }}>
              <NavDropdown.Item
                href="/client"
                class="menulateral"
                eventKey="4.1"
              >
                A minha Conta{" "}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/order" eventKey="4.3">
                As Minhas Encomendas
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/favorites" eventKey="4.4">
                Os meus Favoritos
              </NavDropdown.Item>
            </Col>

            <Col>
              <h1 style={{ color: "#AAAA74" }}>
                Favoritos
              </h1>
              <br></br>
              {products?.map(renderFavorite)}
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col></Col>
            <Col>
              <Row  style={{ marginLeft: 120 }}>
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => handleDeleteFavorites()}
                >
                  Limpar Favoritos
                </Button>{" "}
              </Row>
            </Col>
          </Row>
          <br />
        </div>
      );
    {"}"}  else 
      return (
        <div>
          <div>
            <Breadcrumb
              style={{ marginTop: 20, marginLeft: 28 }}
              id="breadcrumb"
            >
              <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
              <Breadcrumb.Item active style={{ color: "#AAAA74" }}>
                {" "}
                Favoritos{" "}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Row>
            <Breadcrumb
              style={{ marginTop: 20, marginLeft: 28 }}
              id="breadcrumb"
            ></Breadcrumb>
            <Col md={2} style={{ marginTop: 80 }}>
              <NavDropdown.Item
                href="/client"
                class="menulateral"
                eventKey="4.1"
              >
                A minha Conta{" "}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/order" eventKey="4.3">
                As Minhas Encomendas
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/favorites" eventKey="4.4">
                Os meus Favoritos
              </NavDropdown.Item>
            </Col>
            <Col>
              <h1 style={{ color: "#AAAA74" }}>
                {" "}
                Favoritos{" "}
              </h1>
              <br></br>
              <h3>
                Não possui nenhum produto favorito, visite a nossa página de
                produtos
              </h3>
            </Col>
          </Row>
          <br></br>

          <br />
        </div>
  </>
  )
};


/*  class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: {},
      products: [],
      products2: {},
      products3: [],
      isLogged: false,
      hasfavorites: false,
      showModalOptions: false,
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
    } catch (e) {
      console.log("Error rending data: " + e);
    }
    const { token, userId } = this.state;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(`http://127.0.0.1:5000/favorites/${userId}`, config)
      .then((res) => {
        console.log(res.data);
        const favorites = res.data;
        this.setState({ favorites });
        const products = favorites.products;
        this.setState({ products });
        if (products.lenght === 0) {
          this.setState({ hasfavorites: false });
        } else {
          this.setState({ hasfavorites: true });
        }
        console.log(products);
      });
  }

  modalOptions() {
    const { showModalOptions } = this.state;
    return (
      <Modal size="md" show={showModalOptions} animation={true}>
        <Modal.Header>
          <Modal.Title>O produto foi adicionado ao Carrinho!</Modal.Title>
        </Modal.Header>
      </Modal>
    );
  }

  handleDeleteFavorites() {
    const { userId, token } = this.state;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.delete(`http://127.0.0.1:5000/favorites/${userId}`, config);
    window.location.reload();
  }

  handleModalOptions = () => {
    this.setState({ showModalOptions: true });
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
            id_product: product.id_product,
            name_product: product.name_product,
            photo_product: product.photo_product,
            price_product: product.price_product,
            quantity_product: product.quantity_product,
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
          this.setState({ showModalOptions: true });
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
                  id_product: product.id_product,
                  name_product: product.name_product,
                  photo_product: product.photo_product,
                  price_product: product.price_product,
                  quantity_product: product.quantity_product,
                },
              ],
            },
            config
          );
          this.setState({ showModalOptions: true });
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        }
      );
    }
  }

  handleRemoveFavorite(product) {
    const { userId, token } = this.state;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(`http://127.0.0.1:5000/favorites/${userId}`, config)
      .then((response) => {
        const favorites = response.data;
        this.setState({ favorites });
        const products3 = favorites.products;
        this.setState(products3);
        var teste = {
          id_product: product.id,
          name_product: product.name,
          photo_product: product.photo,
          price_product: product.price,
          quantity_product: product.quantity,
        };
        products3.pop(teste);

        if (!products3.length) {
          axios.delete(`http://127.0.0.1:5000/favorites/${userId}`, config);
          window.location.reload();
        } else {
          axios.put(
            `http://127.0.0.1:5000/favorites/${userId}`,
            {
              id_client: userId,
              date: "email",
              products: products3,
            },
            config
          );
          window.location.reload();
        }
      });
  }
  handlegotodetail(product) {
    this.props.history.push("/productdetail", {
      id_product: product.id,
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
  renderFavorite = (product, index) => {
    const { showModalOptions } = this.state;
    return (
      <Card style={{ width: 900 }} key={index}>
        <Row>
          <Col
            lg="4"
            class="text-center"
            style={{ marginTop: 25, marginLeft: 20 }}
          >
            {" "}
            <CardImg
              onClick={() => this.handlegotodetail(product)}
              src={product.photo_product}
            />
          </Col>

          <Col lg={{ marginLeft: 20 }}>
            <Row md={12}>
              <h3
                onClick={() => this.handlegotodetail(product)}
                style={{ marginLeft: 20, marginTop: 25 }}
              >
                {product.name_product}
              </h3>

              <BsFillHeartFill
                style={{ marginLeft: 200, marginTop: 25 }}
                color="red"
                size="2em"
                onClick={() => this.handleRemoveFavorite(product)}
              ></BsFillHeartFill>
            </Row>

            <Row style={{ marginLeft: 3, marginTop: 25 }}>
              <h6 style={{ marginLeft: 3, marginTop: -1 }}>
                Quantidade : {product.quantity_product} ml
              </h6>
            </Row>

            <Row style={{ marginTop: 20 }}>
              <h6 style={{ marginLeft: 20 }}>
                {" "}
                Preço : {product.price_product} €{" "}
              </h6>
            </Row>

            <Row style={{ marginTop: 70, marginLeft: 80 }}>
              <Col>
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() =>
                    this.handleaddToCart(product) && this.handleModalOptions
                  }
                >
                  Adicionar ao Carrinho
                  {showModalOptions ? this.modalOptions() : false}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  };

  render() {
    const { hasfavorites, products } = this.state;
    if( type != "client" ){
        return (
            <Redirect to="/nopermissions" />
        );
    } 
   if (hasfavorites === true) {
      return (
        <div>
          <div>
            <Breadcrumb
              style={{ marginTop: 20, marginLeft: 28 }}
              id="breadcrumb"
            >
              <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
              <Breadcrumb.Item active style={{ color: "#AAAA74" }}>
                {" "}
                Favoritos{" "}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <Row>
            <Breadcrumb
              style={{ marginTop: 20, marginLeft: 28 }}
              id="breadcrumb"
            ></Breadcrumb>

            <Col md={2} active style={{ marginTop: 80 }}>
              <NavDropdown.Item
                href="/client"
                class="menulateral"
                eventKey="4.1"
              >
                A minha Conta{" "}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/order" eventKey="4.3">
                As Minhas Encomendas
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/favorites" eventKey="4.4">
                Os meus Favoritos
              </NavDropdown.Item>
            </Col>

            <Col>
              <h1 active style={{ color: "#AAAA74" }}>
                {" "}
                Favoritos{" "}
              </h1>
              <br></br>
              {products.map(this.renderFavorite)}
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col></Col>
            <Col>
              {" "}
              <Row active style={{ marginLeft: 120 }}>
                {" "}
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => this.handleDeleteFavorites()}
                >
                  Limpar Favoritos
                </Button>{" "}
              </Row>
            </Col>
          </Row>
          <br />
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <Breadcrumb
              style={{ marginTop: 20, marginLeft: 28 }}
              id="breadcrumb"
            >
              <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
              <Breadcrumb.Item active style={{ color: "#AAAA74" }}>
                {" "}
                Favoritos{" "}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <Row>
            <Breadcrumb
              style={{ marginTop: 20, marginLeft: 28 }}
              id="breadcrumb"
            ></Breadcrumb>

            <Col md={2} active style={{ marginTop: 80 }}>
              <NavDropdown.Item
                href="/client"
                class="menulateral"
                eventKey="4.1"
              >
                A minha Conta{" "}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/order" eventKey="4.3">
                As Minhas Encomendas
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/favorites" eventKey="4.4">
                Os meus Favoritos
              </NavDropdown.Item>
            </Col>

            <Col>
              <h1 active style={{ color: "#AAAA74" }}>
                {" "}
                Favoritos{" "}
              </h1>
              <br></br>
              <h3>
                Não possui nenhum produto favorito, visite a nossa página de
                produtos
              </h3>
            </Col>
          </Row>
          <br></br>

          <br />
        </div>
      );
    }
  }
}export default Favorites; */
