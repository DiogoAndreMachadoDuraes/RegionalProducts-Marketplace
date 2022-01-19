import React, { useEffect, useState } from 'react';
import { Row, Card, Container, Button, Breadcrumb, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState, Product } from 'store';

interface ParamType {
	category: string;
}

export const ProductPage: React.FC = () => {
	const { category } = useParams<ParamType>();
	const history = useHistory();

	const userId = useSelector((state: StoreState) => state.common.user.id);
	const email = useSelector((state: StoreState) => state.common.user.email);
	const token = useSelector((state: StoreState) => state.common.user.token);
	const isLogged = useSelector((state: StoreState) => state.common.user.isLogged);
	const productsList: Product[] = useSelector((state: StoreState) => state.products.products);

	const [products, setProducts] = useState<Product[]>();
	const [showAddCart, setShowAddCart] = useState(false);

	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	useEffect(() => {
		const finalList: Product[] = productsList.filter((x) => x.category === category);
		setProducts(finalList);
	}, [category, productsList]);

	const showAlertAddCart = () => {
		window.setTimeout(() => {
			setShowAddCart(false);
		}, 5000);
	};

	const handleAddCart = (product: Product) => {
		axios.post(
			`http://127.0.0.1:5000/carts`,
			{
				email_client: email,
				id_client: userId,
				id_product: product._id.$oid,
				name_product: product.name,
				photo_product: product.photo,
				price_product: product.price,
				quantity: 1,
			},
			config
		);
		setShowAddCart(true);
		showAlertAddCart();
	};

	return (
		<div>
			<Alert key={'success'} variant={'success'} show={showAddCart} style={{ textAlign: 'center' }}>
				O produto foi adicionado ao carrinho
			</Alert>
			<div>
				<Breadcrumb style={{ marginTop: 20, marginLeft: 38 }} id="breadcrumb">
					<Breadcrumb.Item onClick={() => history.push('/')}>
						<span style={{ fontFamily: 'artifika', color: '#9B3939' }}>Home</span>
					</Breadcrumb.Item>
					<Breadcrumb.Item active>
						<span style={{ fontFamily: 'artifika', color: 'black' }}>{category}</span>
					</Breadcrumb.Item>
				</Breadcrumb>
			</div>
			<br />
			<Container>
				<h1 style={{ fontFamily: 'artifika', color: '#9B3939' }}>{category}</h1>
				<br />
				<Row>
					{products?.map((x: Product, index: number) => {
						return (
							<Card key={index} style={{ width: '16rem', marginRight: 20, marginBottom: 50 }}>
								<Card.Img
									variant="top"
									src={x.photo}
									width={200}
									height={200}
									onClick={() => history.push('/productDetail/' + x._id.$oid)}
								/>
								<Card.Body
									style={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										fontFamily: 'artifika',
									}}
								>
									<Card.Title>
										<Link
											to={'/productDetail/' + x._id.$oid}
											style={{
												fontWeight: 600,
												color: 'black',
												fontFamily: 'artifika',
											}}
										>
											<i>{x.name}</i>
										</Link>
									</Card.Title>
									<Card.Text style={{ fontSize: 14 }}>
										<span style={{ fontWeight: 600, fontFamily: 'artifika' }}>Preço: </span>
										{x.price} €
									</Card.Text>
									<Button
										variant="primary"
										style={{ backgroundColor: '#9B3939', fontFamily: 'artifika' }}
										disabled={!isLogged}
										onClick={() => handleAddCart(x)}
									>
										Adicionar ao Carrinho
									</Button>
								</Card.Body>
							</Card>
						);
					})}
				</Row>
				<br />
			</Container>
		</div>
	);
};

/* 

<CardGroup>
    <Card>
        <Card.Title
            className="text-right"
            style={{ marginRight: 10 }}
        >
            <GrFavorite />
        </Card.Title>
        <Card.Img
            variant="top"
            src="https://t2.uc.ltmcdn.com/pt/images/9/2/2/img_como_fazer_compota_de_amoras_21229_600.jpg"
        />

        <Card.Body
            style={{
                color: '#9B3939',
                flexDirection: 'column',
                fontFamily: 'artifika',
                alignItems: 'center',
                justifyItems: 'center',
                display: 'flex',
            }}
        >
            <Card.Title style={{ cursor: 'pointer' }}>Compota de Amora</Card.Title>
            <Card.Text>10.99 €</Card.Text>
            <Card.Text>
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
            </Card.Text>
            <Button href="/cart" class="fixed" variant="secondary">
                Adicionar ao Carrinho
            </Button>
        </Card.Body>
    </Card>
    <Card>
        <Card.Title className="text-right" style={{ marginRight: 10 }}>
            <GrFavorite />
        </Card.Title>
        <Card.Img
            variant="top"
            src="data:image/jpeg;base64,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"
        />
        <Card.Body
            style={{
                color: '#9B3939',
                fontFamily: 'artifika',
                flexDirection: 'column',
                alignItems: 'center',
                justifyItems: 'center',
                display: 'flex',
            }}
        >
            <Card.Title>Compota de Kiwi</Card.Title>
            <Card.Text>10.99 €</Card.Text>
            <Card.Text>
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
            </Card.Text>
            <Button variant="secondary" href="/cart">
                Adicionar ao Carrinho
            </Button>
        </Card.Body>
    </Card>
    <Card>
        <Card.Title className="text-right" style={{ marginRight: 10 }}>
            <GrFavorite />
        </Card.Title>
        <Card.Img src="data:image/jpeg;base64,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" />
        <Card.Body
            style={{
                color: '#9B3939',
                flexDirection: 'column',
                fontFamily: 'artifika',
                alignItems: 'center',
                justifyItems: 'center',
                display: 'flex',
            }}
        >
            <Card.Title>Compota de Figo </Card.Title>
            <Card.Text>10.99 €</Card.Text>
            <Card.Text>
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
            </Card.Text>
            <Button href="/cart" variant="secondary">
                Adicionar ao Carrinho
            </Button>
        </Card.Body>
    </Card>
    <Card>
        <Card.Title className="text-right" style={{ marginRight: 10 }}>
            <GrFavorite />
        </Card.Title>
        <Card.Img
            variant="top"
            src="https://www.extramax.com.br/content/produto/020101/020050/T_25112020_211757_272.jpg"
        />
        <Card.Body
            style={{
                color: '#9B3939',
                flexDirection: 'column',
                fontFamily: 'artifika',
                alignItems: 'center',
                justifyItems: 'center',
                display: 'flex',
            }}
        >
            <Card.Title>Compota de Goiaba</Card.Title>
            <Card.Text>10.99 €</Card.Text>
            <Card.Text>
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
            </Card.Text>
            <Button href="/cart" variant="secondary">
                Adicionar ao Carrinho
            </Button>
        </Card.Body>
    </Card>
    <Card>
        <Card.Title className="text-right" style={{ marginRight: 10 }}>
            <GrFavorite />
        </Card.Title>
        <Card.Img
            variant="top"
            src="https://cdn.vidaativa.pt/uploads/2019/11/765_360_apricots-jam-on-a-wooden-table_1514560268.jpg"
        />
        <Card.Body
            style={{
                color: '#9B3939',
                flexDirection: 'column',
                fontFamily: 'artifika',
                alignItems: 'center',
                justifyItems: 'center',
                display: 'flex',
            }}
        >
            <Card.Title>Compota de Pêssego</Card.Title>
            <Card.Text>10.99 €</Card.Text>
            <Card.Text>
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
            </Card.Text>
            <Button href="/cart" variant="secondary">
                Adicionar ao Carrinho
            </Button>
        </Card.Body>
    </Card>
</CardGroup>



class Product extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Breadcrumb
            width="300"
            height="300"
            style={{ marginTop: 20, marginLeft: 28 }}
            id="breadcrumb"
          >
            <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
            <Breadcrumb.Item active style={{ color: "#AAAA74" }}>
              {" "}
              Vinho{" "}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <br />
        <Container>
          <h1 class="text-left"> Vinho Tinto </h1>
          <br />

          <Row>
            <CardGroup>
              <Card>
                <Card.Title
                  href="/cart"
                  className="text-right"
                  style={{ marginRight: 10 }}
                >
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="https://static.fnac-static.com/multimedia/Images/PT/MC/e6/0c/2c/19664102/1540-1.jpg#f26ff49d-1f05-4de4-9522-d0fabf98c4d1"
                />

                <Card.Body>
                  <Card.Title style={{ cursor: "pointer" }}>
                    Reboredo{" "}
                  </Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" class="fixed" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  href="http://localhost:3000/productdetail"
                  src="https://cdnx.jumpseller.com/tinto-pt/image/8329827/resize/480/480?1618567199"
                />
                <Card.Body>
                  <Card.Title>Trinca Bolotas</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button variant="primary" href="/cart">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img src="https://cdnx.jumpseller.com/tinto-pt/image/11383149/resize/255/255?1618990930" />
                <Card.Body>
                  <Card.Title>Convento da Tony</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart">Adicionar ao Carrinho</Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="https://cdnx.jumpseller.com/tinto-pt/image/15826916/resize/255/255?1617865849"
                />
                <Card.Body>
                  <Card.Title>Medusa Rose</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="https://cdnx.jumpseller.com/tinto-pt/image/15488611/resize/255/255?1616217283"
                />
                <Card.Body>
                  <Card.Title>Marques de Riscal</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
            </CardGroup>
          </Row>
          <br></br>
          <h1 class="text-left"> Vinho Branco </h1>
          <br />
          <Row>
            <CardGroup>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img src="https://a-static.mlcdn.com.br/618x463/tallarico-vinho-branco-suave/m-storebebidas/2816139265/f30a95e90ba44eb9136b9218d6276097.jpg" />
                <Card.Body>
                  <Card.Title>Herdade do Esporao</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" class="fixed" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img src="https://www.garcias.pt/ficheiros/dinamicos/multimedia/imagem/produtos/vinhos/vinho_branco/__fmhidden__14ec6416c188d3b1b04f05b4f9e39ba9/d5e4b962057c84b2cb13c157560ad524.jpg" />
                <Card.Body>
                  <Card.Title>Luisa Pato</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTXrGpyLOS1gV2omyCVU1qpavmDgBYkGCJcw&usqp=CAU"
                />
                <Card.Body>
                  <Card.Title>
                    Vinho Branco Seco Santa Helena Reservado
                  </Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button variant="primary">Adicionar ao Carrinho</Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKPhiflxGEKAzhmXH-uERJ-Fo-_Qbw-sGZmQ&usqp=CAU"
                />
                <Card.Body>
                  <Card.Title>Vinho Branco Buçaco Reservado 2017</Card.Title>
                  <Card.Text>54.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="https://media.jumbo.pt/Media/Images/854/001062854_558_440.jpg"
                />
                <Card.Body>
                  <Card.Title>Cortes de Cima</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
            </CardGroup>
          </Row>
          <br />
          <br></br>
          <h1 class="text-left"> Vinho Espumante </h1>
          <br />
          <Row>
            <CardGroup>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="data:image/jpeg;base64,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"
                />
                <Card.Body>
                  <Card.Title>Herdade do Esporao</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="data:image/jpeg;base64,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"
                />
                <Card.Body>
                  <Card.Title>Luisa Pato</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="data:image/jpeg;base64,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"
                />
                <Card.Body>
                  <Card.Title>Adega Maior</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button variant="primary">Adicionar ao Carrinho</Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="data:image/jpeg;base64,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"
                />
                <Card.Body>
                  <Card.Title>Espumante Aplauso</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRng1Nsi25Mw2ikVcQ2MiknVEUYZctjDYfTLQ&usqp=CAU"
                />
                <Card.Body>
                  <Card.Title>Espumante Bruto</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
            </CardGroup>
          </Row>
          <br />
          <br></br>
          <h1 class="text-left"> Vinho Branco Doce </h1>
          <br />
          <Row>
            <CardGroup>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="http://www.concursonacionaldeazeite.pt/uploads/2/2/2/7/22276554/editor/espor-o.jpg?1545836703"
                />
                <Card.Body>
                  <Card.Title>Herdade do Esporao</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="https://imagens.reformaagraria.pt/loja-agricola/produtos/grandes/1090-1980-1586803388.jpg"
                />
                <Card.Body>
                  <Card.Title>Luisa Pato</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="https://media.jumbo.pt/Media/Images/479/002969479_558_440.jpg"
                />
                <Card.Body>
                  <Card.Title>Adega Maior</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="https://media.jumbo.pt/Media/Images/860/000005860_558_440.jpg"
                />
                <Card.Body>
                  <Card.Title>Oliveira da Serra</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="https://media.jumbo.pt/Media/Images/854/001062854_558_440.jpg"
                />
                <Card.Body>
                  <Card.Title>Cortes de Cima</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
            </CardGroup>
          </Row>
          <br />
          <br></br>
          <h1 class="text-left"> Champagne </h1>
          <br />
          <Row>
            <CardGroup>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="http://www.concursonacionaldeazeite.pt/uploads/2/2/2/7/22276554/editor/espor-o.jpg?1545836703"
                />
                <Card.Body>
                  <Card.Title>Herdade do Esporao</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="https://imagens.reformaagraria.pt/loja-agricola/produtos/grandes/1090-1980-1586803388.jpg"
                />
                <Card.Body>
                  <Card.Title>Luisa Pato</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="https://media.jumbo.pt/Media/Images/479/002969479_558_440.jpg"
                />
                <Card.Body>
                  <Card.Title>Adega Maior</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="https://media.jumbo.pt/Media/Images/860/000005860_558_440.jpg"
                />
                <Card.Body>
                  <Card.Title>Oliveira da Serra</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="https://media.jumbo.pt/Media/Images/854/001062854_558_440.jpg"
                />
                <Card.Body>
                  <Card.Title>Cortes de Cima</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
            </CardGroup>
          </Row>
          <br />
          <br></br>
          <h1 class="text-left"> Vinho Rosé </h1>
          <br />
          <Row>
            <CardGroup>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="http://www.concursonacionaldeazeite.pt/uploads/2/2/2/7/22276554/editor/espor-o.jpg?1545836703"
                />
                <Card.Body>
                  <Card.Title>Herdade do Esporao</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="https://imagens.reformaagraria.pt/loja-agricola/produtos/grandes/1090-1980-1586803388.jpg"
                />
                <Card.Body>
                  <Card.Title>Luisa Pato</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="https://media.jumbo.pt/Media/Images/479/002969479_558_440.jpg"
                />
                <Card.Body>
                  <Card.Title>Adega Maior</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="https://media.jumbo.pt/Media/Images/860/000005860_558_440.jpg"
                />
                <Card.Body>
                  <Card.Title>Oliveira da Serra</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Title className="text-right" style={{ marginRight: 10 }}>
                  <GrFavorite />
                </Card.Title>
                <Card.Img
                  variant="top"
                  src="https://media.jumbo.pt/Media/Images/854/001062854_558_440.jpg"
                />
                <Card.Body>
                  <Card.Title>Cortes de Cima</Card.Title>
                  <Card.Text>10.99 $</Card.Text>
                  <Card.Text>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </Card.Text>
                  <Button href="/cart" variant="primary">
                    Adicionar ao Carrinho
                  </Button>{" "}
                </Card.Body>
              </Card>
            </CardGroup>
          </Row>
          <br />
        </Container>
      </div>
    );
  }
}
export default Product;
 */
