import React, { useState } from 'react';
import './style.css';
import { Breadcrumb, Image, Container, Row, Col, Button } from 'react-bootstrap';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { ImLocation } from 'react-icons/im';
import { RiBookmark3Line } from 'react-icons/ri';
import { GiWineBottle, GiPriceTag } from 'react-icons/gi';
import { GrValidate, GrShare } from 'react-icons/gr';
import { MdLocalShipping } from 'react-icons/md';
import { FacebookShareButton } from 'react-share';
import { useHistory } from 'react-router';
import { Loader } from 'ui';
import { images } from 'assets';
import moment from 'moment';

export const ProductDetail: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isLogged, setIsLogged] = useState(false);
	const [quantityProduct, setQuantityProduct] = useState(1);
	const [price, setPrice] = useState(1.29);
	const [priceTotal, setPriceTotal] = useState(price);
	const [name, setName] = useState('Alheira de Mirandela');
	const [category, setCategory] = useState('Enchidos');
	const [harvest, setHarvest] = useState('Mirandela');
	const [validity, setValidity] = useState('10-10-2024');
	const [producerName, setProducerName] = useState('Continente');
	const [quantity, setQuantity] = useState('200g');
	const [id, setId] = useState(1);
	const [photo, setPhoto] = useState(images.alheira);
	const [clientEmail, setClientEmail] = useState('');
	const [clientId, setClientId] = useState('');
	const [photoProducer, setPhotoProducer] = useState('https://www.tlantic.com/storage/uploads/60fed22a22397.png');
	const [token, setToken] = useState('');
	const [type, setType] = useState('Client');
	const [userId, setUserId] = useState('1');
	const [description, setDescription] = useState(
		'Os nossos enchidos primam pela aliança da qualidade e de personalidade ímpar com o sabor de tradição.'
	);
	const history = useHistory();

	/* useEffect(() => {
		try {
			let token = await localStorage.getItem("token");
			let type = await localStorage.getItem("type");
			let userId = await localStorage.getItem("userId");
			if (token !== null) {
				setIsLoading(true);
				setIsLogged(true);
				setToken(token);
				setType(type),
				setUserId(userId);
			} else {
				setIsLogged(false);
			}
		} catch (e) {
			console.log("Error rending data: " + e);
			setIsLoading(true);
			setIsLogged(false);
		}
	  }
	}, [token, type, userId]); */

	const onPlus = () => {
		setQuantityProduct(quantityProduct + 1);
		const priceTotal = price * (quantityProduct + 1);
		setPriceTotal(parseFloat(priceTotal.toFixed(2)));
	};

	const onMinus = () => {
		if (quantityProduct > 1) {
			setQuantityProduct(quantityProduct - 1);
			const priceTotal = price * (quantityProduct - 1);
			setPriceTotal(parseFloat(priceTotal.toFixed(2)));
		}
	};

	const addFavorites = async () => {
		if (isLogged === false) {
			history.push('/login');
		}
		try {
			await fetch('http://127.0.0.1:5000/favorites', {
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id_client: userId,
					date: moment().format('YYYY/MM/DD HH:mm:ss'),
					products: [
						{
							id_product: id,
							name_product: name,
							photo_product: photo,
							price_product: priceTotal,
							quantity_product: quantityProduct,
						},
					],
				}),
			});
		} catch (e) {
			console.log('Error to post product on favorites: ' + e);
		}
	};

	const addCart = async () => {
		if (isLogged === false) {
			history.push('/login');
		} else {
			try {
				await fetch('http://127.0.0.1:5000/carts', {
					method: 'POST',
					headers: {
						Authorization: 'Bearer ' + token,
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						id_client: userId,
						email_client: clientEmail,
						products: [
							{
								id_product: id,
								name_product: name,
								photo_product: photo,
								price_product: priceTotal,
								quantity_product: quantityProduct,
							},
						],
					}),
				});
			} catch (e) {
				console.log('Error to post product on shop: ' + e);
			}
		}
	};

	return !isLoading ? (
		<>
			<div>
				<Breadcrumb style={{ marginTop: 20, marginLeft: 38 }} id="breadcrumb">
					<Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
					<Breadcrumb.Item href="/product">Produtos</Breadcrumb.Item>
					<Breadcrumb.Item href={'/product/' + category.toLowerCase() + ''}>{category}</Breadcrumb.Item>
					<Breadcrumb.Item active style={{ color: '#9B3939' }}>
						{name}
					</Breadcrumb.Item>
				</Breadcrumb>
			</div>
			<Container>
				<Row style={{ marginBottom: 70 }}>
					<Col sm={1} />
					<Col sm={4}>
						<Row style={{ justifyContent: 'center' }}>
							<Image src={photo} width="300" style={{ marginTop: 50 }} />
							<div style={{ marginTop: 100 }}>
								<a href="/producer">
									<h5 style={{ color: 'black', fontWeight: 'bold' }}>Produtor</h5>
								</a>
								<p style={{ color: 'black', fontSize: 14, marginTop: 20 }}>
									Azeite proveniente colhido e tratado por {producerName} LDA, marca esta com cerca de
									50 anos no mercado.
								</p>
							</div>
							<a href="/producer">
								<Image src={photoProducer} width="150" style={{ marginTop: 50 }} />
							</a>
						</Row>
					</Col>
					<Col sm={1} />
					<Col sm={6}>
						<Row
							style={{
								justifyContent: 'center',
								textAlign: 'center',
							}}
						>
							<a href="/favorites">
								<RiBookmark3Line
									onClick={addFavorites}
									size="30"
									style={{ marginTop: 10, marginRight: 20, color: 'black' }}
								/>
							</a>
							<h1 style={{ color: 'black' }}>{name}</h1>
							<FacebookShareButton
								url={
									'https://www.continente.pt/produto/alheira-de-mirandela-continente-selecao-4835882.html'
								}
								quote={
									'Amigos, venham comprar que é de confiança, seguro e a encomenda chega rápido. Façam a vossa encomenda!'
								}
							>
								<GrShare size="18" style={{ marginTop: -20, marginLeft: 20 }} />
							</FacebookShareButton>
						</Row>
						<Row style={{ marginTop: 70 }}>
							<Col sm={1}>
								<ImLocation size="25" />
							</Col>
							<Col sm={5}>
								<h6 style={{ color: 'black', fontSize: 20 }}>Região: {harvest}</h6>
							</Col>
							<Col sm={1}>
								<GiWineBottle size="25" />
							</Col>
							<Col sm={5}>
								<h6 style={{ color: 'black', fontSize: 20 }}>Quantidade: {quantity}</h6>
							</Col>
						</Row>
						<Row style={{ marginTop: 30 }}>
							<Col sm={1}>
								<GrValidate size="25" />
							</Col>
							<Col sm={5}>
								<h5 style={{ color: 'black', fontSize: 20 }}>Validade: {validity}</h5>
							</Col>
							<Col lg={1}>
								<GiPriceTag size="25" />
							</Col>
							<Col lg={5}>
								<h5 style={{ color: 'black', fontSize: 20 }}>Preço: {priceTotal}€</h5>
							</Col>
						</Row>

						<Row style={{ marginTop: 60 }}>
							<h5>Descrição:</h5>
							<p>{description}</p>
						</Row>

						<Row
							style={{
								marginTop: 40,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Col sm={3} />
							<Col sm={1}>
								<AiFillMinusCircle onClick={onMinus} size="35" style={{ color: '#9B3939' }} />
							</Col>
							<Col sm={1}>
								<h4
									style={{
										color: 'black',
										textAlign: 'center',
										marginLeft: 10,
									}}
								>
									{quantityProduct}
								</h4>
							</Col>
							<Col sm={1}>
								<AiFillPlusCircle onClick={onPlus} size="35" style={{ color: '#9B3939' }} />
							</Col>
							<Col sm={2} />
							<Col sm={4}>
								<Button
									variant="dark"
									href="/cart"
									onClick={addCart}
									size="lg"
									style={{ color: 'white', backgroundColor: '#9B3939' }}
								>
									Adicionar
								</Button>
							</Col>
						</Row>
						<Row style={{ marginTop: 70 }}>
							<Col sm={2} />
							<Col sm={2}>
								<MdLocalShipping size="40" style={{ color: 'black', marginTop: 8 }} />
							</Col>
							<Col sm={8}>
								<h6 style={{ color: 'black' }}>Entregas gratuitas a partir de 50€.</h6>
								<h6 style={{ color: 'black' }}>Custos de envio: 4,99€.</h6>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</>
	) : (
		<Loader />
	);
};

/*

import React from "react";
import "./style.css";
import {
  Breadcrumb,
  Image,
  Container,
  Row,
  Col,
  Button,
  Spinner,
} from "react-bootstrap";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { FcCalendar } from "react-icons/fc";
import { RiTestTubeLine, RiBookmark3Line } from "react-icons/ri";
import { GiWineBottle, GiPriceTag } from "react-icons/gi";
import { GrValidate, GrShare } from "react-icons/gr";
import { MdLocalShipping } from "react-icons/md";
import { FacebookShareButton } from "react-share";
import moment from "moment";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      quantityProduct: 1,
      price: 2.89,
      priceTotal: 2.89,
      name: "Trinca Bolotas",
      category: "Vinho",
      acidity: 5,
      harvest: "Pedrogão",
      validity: 2024,
      producerName: "Herdade do Peso",
      quantity: 800,
      year: "2021-03-02",
      id: 1,
      photo: "http://127.0.0.1:5000/Files/trinca_bolotas.jpg",
      clientEmail: "",
      clientId: "",
      photoProducer:
        "https://www.vinhosdoalentejo.pt/media/produtores/produtor-447L.jpg",
    };
  }

  async componentDidMount() {
    console.log("Mounting the screen ProductDetail ...");
    try {
      let token = await localStorage.getItem("token");
      let type = await localStorage.getItem("type");
      let userId = await localStorage.getItem("userId");
      if (token !== null) {
        this.setState({
          isLoading: true,
          isLogged: true,
          token,
          type,
          userId,
        });
      } else {
        this.setState({
          isLogged: false,
        });
      }
    } catch (e) {
      console.log("Error rending data: " + e);
      this.setState({
        isLoading: true,
        isLogged: false,
      });
    }
  }

  onPlus = () => {
    const { quantityProduct, price } = this.state;
    this.setState({
      quantityProduct: quantityProduct + 1,
      priceTotal: price * (quantityProduct + 1),
    });
  };

  onMinus = () => {
    const { quantityProduct, price } = this.state;
    if (quantityProduct > 1) {
      this.setState({
        quantityProduct: quantityProduct - 1,
        priceTotal: price * (quantityProduct - 1),
      });
    }
  };

  addFavorites = async () => {
    const {
      priceTotal,
      name,
      quantityProduct,
      id,
      photo,
      userId,
      token,
      isLogged,
    } = this.state;
    if (isLogged === false) {
      this.props.history.push("/login");
    }
    try {
      await fetch("http://127.0.0.1:5000/favorites", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_client: userId,
          date: moment().format("YYYY/MM/DD HH:mm:ss"),
          products: [
            {
              id_product: id,
              name_product: name,
              photo_product: photo,
              price_product: priceTotal,
              quantity_product: quantityProduct,
            },
          ],
        }),
      });
    } catch (e) {
      console.log("Error to post product on favorites: " + e);
    }
  };

  addCart = async () => {
    const {
      priceTotal,
      name,
      quantityProduct,
      id,
      photo,
      userId,
      clientEmail,
      token,
      isLogged,
    } = this.state;
    if (isLogged === false) {
      this.props.history.push("/login");
    } else {
      try {
        await fetch("http://127.0.0.1:5000/carts", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_client: userId,
            email_client: clientEmail,
            products: [
              {
                id_product: id,
                name_product: name,
                photo_product: photo,
                price_product: priceTotal,
                quantity_product: quantityProduct,
              },
            ],
          }),
        });
      } catch (e) {
        console.log("Error to post product on shop: " + e);
      }
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
    const {
      quantity,
      priceTotal,
      name,
      category,
      acidity,
      harvest,
      validity,
      year,
      producerName,
      quantityProduct,
      photo,
      photoProducer,
    } = this.state;
    this.load();
    return (
      <div>
        <div>
          <Breadcrumb style={{ marginTop: 20, marginLeft: 38 }} id="breadcrumb">
            <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/product">Produtos</Breadcrumb.Item>
            <Breadcrumb.Item href="/product/wine">{category}</Breadcrumb.Item>
            <Breadcrumb.Item active style={{ color: "#AAAA74" }}>
              {name}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Container>
          <Row style={{ marginBottom: 100 }}>
            <Col sm={1} />
            <Col sm={4}>
              <Row style={{ justifyContent: "center" }}>
                <Image src={photo} width="150" style={{ marginTop: 50 }} />
                <div style={{ marginTop: 80 }}>
                  <a href="/producer">
                    <h5 style={{ color: "black", fontWeight: "bold" }}>
                      Produtor
                    </h5>
                  </a>
                  <p style={{ color: "black", fontSize: 14, marginTop: 20 }}>
                    Azeite proveniente colhido e tratado por {producerName} LDA,
                    marca esta com cerca de 50 anos no mercado.
                  </p>
                </div>
                <a href="/producer">
                  <Image
                    src={photoProducer}
                    width="150"
                    style={{ marginTop: 50 }}
                  />
                </a>
              </Row>
            </Col>
            <Col sm={1} />
            <Col sm={6}>
              <Row
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                  marginTop: 25,
                }}
              >
                <a href="/favorites">
                  <RiBookmark3Line
                    onClick={this.addFavorites}
                    size="30"
                    style={{ marginTop: 10, marginRight: 20, color: "black" }}
                  />
                </a>
                <h1 style={{ color: "black" }}>{name}</h1>
                <FacebookShareButton
                  url={
                    "https://adegga.com/product/casa-ferreirinha-papa-figos-tinto/"
                  }
                  quote={
                    "Amigos, venham comprar que é de confiança, seguro e a encomenda chega rápido. Façam a vossa encomenda!"
                  }
                >
                  <GrShare
                    size="18"
                    style={{ marginTop: -20, marginLeft: 20 }}
                  />
                </FacebookShareButton>
              </Row>
              <Row style={{ marginTop: 70 }}>
                <Col sm={1}>
                  <RiTestTubeLine size="30" />
                </Col>
                <Col sm={5}>
                  <h5 style={{ color: "black" }}>Teor de alcool: {acidity}%</h5>
                </Col>
                <Col sm={1}>
                  <GiWineBottle size="30" />
                </Col>
                <Col sm={5}>
                  <h5 style={{ color: "black" }}>Quantidade: {quantity}ml</h5>
                </Col>
              </Row>
              <Row style={{ marginTop: 40 }}>
                <Col sm={1}>
                  <ImLocation size="30" />
                </Col>
                <Col sm={5}>
                  <h5 style={{ color: "black" }}>Colhido: {harvest}</h5>
                </Col>
                <Col sm={1}>
                  <GrValidate size="30" />
                </Col>
                <Col sm={5}>
                  <h5 style={{ color: "black" }}>Validade: {validity}</h5>
                </Col>
              </Row>
              <Row style={{ marginTop: 40 }}>
                <Col lg={1}>
                  <FcCalendar size="30" />
                </Col>
                <Col lg={5}>
                  <h5 style={{ color: "black" }}>Colheita: {year}</h5>
                </Col>
                <Col lg={1}>
                  <GiPriceTag size="30" />
                </Col>
                <Col lg={5}>
                  <h5 style={{ color: "black" }}>Preço: {priceTotal}€</h5>
                </Col>
              </Row>
              <Row
                style={{
                  marginTop: 80,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Col sm={3} />
                <Col sm={1}>
                  <AiFillMinusCircle
                    onClick={this.onMinus}
                    size="35"
                    style={{ color: "#AAAA74" }}
                  />
                </Col>
                <Col sm={1}>
                  <h4
                    style={{
                      color: "black",
                      textAlign: "center",
                      marginLeft: 10,
                    }}
                  >
                    {quantityProduct}
                  </h4>
                </Col>
                <Col sm={1}>
                  <AiFillPlusCircle
                    onClick={this.onPlus}
                    size="35"
                    style={{ color: "#AAAA74" }}
                  />
                </Col>
                <Col sm={2} />
                <Col sm={4}>
                  <Button
                    variant="dark"
                    href="/cart"
                    onClick={this.addCart}
                    size="lg"
                    style={{ color: "white", backgroundColor: "#AAAA74" }}
                  >
                    Adicionar
                  </Button>
                </Col>
              </Row>
              <Row style={{ marginTop: 80 }}>
                <Col sm={2} />
                <Col sm={2}>
                  <MdLocalShipping
                    size="40"
                    style={{ color: "black", marginTop: 8 }}
                  />
                </Col>
                <Col sm={8}>
                  <h6 style={{ color: "black" }}>
                    Entregas gratuitas a partir de 50€.
                  </h6>
                  <h6 style={{ color: "black" }}>Custos de envio: 4,99€.</h6>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ProductDetail;
*/
