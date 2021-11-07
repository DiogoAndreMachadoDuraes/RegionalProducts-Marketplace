import React from "react";
import "./style.css";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import CardGroup from "react-bootstrap/CardGroup";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { AiOutlineStar } from "react-icons/ai";
import { GrFavorite } from "react-icons/gr";

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
