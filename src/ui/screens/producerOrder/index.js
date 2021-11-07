import React from "react";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import gallo from "../../assets/gallo.jpg";
import mateus from "../../assets/mateus.jpg";
import compota from "../../assets/compota.jpg";
import Navbar from "react-bootstrap/Navbar";
import { AiOutlineDropbox } from "react-icons/ai";
import Card from "react-bootstrap/Card";

class ProducerOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      producer: [],
    };
  }

  async componentDidMount() {
    console.log("Mounting screen Producer Order...");
    let token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyMzY5MDM4MiwianRpIjoiMTdlMDM5NjAtNjNlZS00ODNjLTgyOTEtZjczZTQwN2RlMjhmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjYwYWU4ODkxMzBkZDA4ZTFhMWQyODQ4YSIsIm5iZiI6MTYyMzY5MDM4MiwiZXhwIjoxNjI0MTIyMzgyfQ.d-1g1y8-d8i686vxFIoiNZkC3iuvcvZ-ifuQnW_ASKE";
    /* let token= localStorage.getItem("token"); */
    try {
      let response = await fetch("http://127.0.0.1:5000/producers", {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let json = await response.json();
      this.setState({
        producer: json,
      });
      console.log(json);
    } catch (e) {
      console.log("Error to get data: " + e);
    }
  }

  render() {
    /*   const { order} = this.state; */
    return (
      <div>
        <Row id="row">
          <Col sm={2} />
          <Col sm={7} style={{ color: "444903", fontFamily: "artifika" }}>
            <AiOutlineDropbox
              size="40"
              style={{ color: "black", marginLeft: 20, marginTop: 50 }}
            />
          </Col>
          <Col sm={3} />
        </Row>
        <Row id="row">
          <Col sm={1} />
          <Col
            sm={8}
            style={{
              color: "#AAAA74",
              fontFamily: "artifika",
              marginTop: -35,
              marginLeft: 40,
            }}
          >
            <h3> Histórico de encomendas do produtor </h3>
          </Col>
          <Col sm={3} />
        </Row>
        <Row id="row" style={{ marginTop: 40, marginLeft: 60 }}>
          <Col sm={2} />
          <Col sm={7}>
            <Card border="dark">
              <div className="row gutters">
                <div className="col-md-4">
                  <Col>
                    <Image
                      src={gallo}
                      thumbnail
                      style={{ marginTop: 10, width: 130, height: 120 }}
                    />
                  </Col>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h4
                      className="card-title"
                      style={{
                        color: "black",
                        fontFamily: "artifika",
                        marginLeft: -60,
                        marginTop: 0,
                      }}
                    >
                      Nº 123{" "}
                    </h4>
                    <Row
                      id="row"
                      style={{
                        color: "black",
                        fontFamily: "artifika",
                        marginLeft: 250,
                        marginTop: -50,
                      }}
                    >
                      <Col sm={2} />
                      <Col sm={9}>
                        <Navbar.Text>
                          <a
                            style={{ color: "#444903", fontFamily: "artifika" }}
                            href="/invoice"
                          >
                            Ver informações
                          </a>
                        </Navbar.Text>
                        <h6
                          className="card-text"
                          style={{
                            color: "black",
                            fontFamily: "artifika",
                            marginLeft: 45,
                            marginTop: 0,
                          }}
                        >
                          4 artigos{" "}
                        </h6>
                        <h6
                          className="card-text"
                          style={{
                            color: "black",
                            fontFamily: "artifika",
                            marginLeft: 45,
                            marginTop: 10,
                          }}
                        >
                          € 123.75{" "}
                        </h6>
                      </Col>
                      <Col sm={1} />
                    </Row>
                    <h5
                      className="card-text"
                      style={{
                        color: "black",
                        fontFamily: "artifika",
                        marginLeft: -60,
                        marginTop: -40,
                      }}
                    >
                      {" "}
                      Entregue{" "}
                    </h5>
                    <p
                      className="card-text"
                      style={{
                        color: "black",
                        fontFamily: "artifika",
                        marginLeft: -60,
                        marginTop: 0,
                      }}
                    >
                      {" "}
                      <medium className="text"> 10/03/2021 </medium>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            <div className="mt-5"> </div>
            <Card border="dark">
              <div className="row gutters">
                <div className="col-md-4">
                  <Col>
                    <Image
                      src={compota}
                      thumbnail
                      style={{ marginTop: 10, width: 130, height: 120 }}
                    />
                  </Col>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h4
                      className="card-title"
                      style={{
                        color: "black",
                        fontFamily: "artifika",
                        marginLeft: -60,
                        marginTop: 0,
                      }}
                    >
                      Nº 124{" "}
                    </h4>
                    <Row
                      id="row"
                      style={{
                        color: "black",
                        fontFamily: "artifika",
                        marginLeft: 250,
                        marginTop: -50,
                      }}
                    >
                      <Col sm={2} />
                      <Col sm={9}>
                        <Navbar.Text>
                          <a
                            style={{ color: "#444903", fontFamily: "artifika" }}
                            href="/invoice"
                          >
                            Ver informações
                          </a>
                        </Navbar.Text>
                        <h6
                          className="card-text"
                          style={{
                            color: "black",
                            fontFamily: "artifika",
                            marginLeft: 45,
                            marginTop: 0,
                          }}
                        >
                          6 artigos{" "}
                        </h6>
                        <h6
                          className="card-text"
                          style={{
                            color: "black",
                            fontFamily: "artifika",
                            marginLeft: 45,
                            marginTop: 10,
                          }}
                        >
                          € 43.99{" "}
                        </h6>
                      </Col>
                      <Col sm={1} />
                    </Row>
                    <h5
                      className="card-text"
                      style={{
                        color: "black",
                        fontFamily: "artifika",
                        marginLeft: -60,
                        marginTop: -40,
                      }}
                    >
                      {" "}
                      Entregue
                    </h5>
                    <p
                      className="card-text"
                      style={{
                        color: "black",
                        fontFamily: "artifika",
                        marginLeft: -60,
                        marginTop: 0,
                      }}
                    >
                      {" "}
                      <medium className="text"> 03/03/2021 </medium>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            <div className="mt-5"> </div>
            <Card border="dark">
              <div className="row gutters">
                <div className="col-md-4">
                  <Col>
                    <Image
                      src={mateus}
                      thumbnail
                      style={{ marginTop: 10, width: 130, height: 120 }}
                    />
                  </Col>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h4
                      className="card-title"
                      style={{
                        color: "black",
                        fontFamily: "artifika",
                        marginLeft: -60,
                        marginTop: 0,
                      }}
                    >
                      Nº 125{" "}
                    </h4>
                    <Row
                      id="row"
                      style={{
                        color: "black",
                        fontFamily: "artifika",
                        marginLeft: 250,
                        marginTop: -50,
                      }}
                    >
                      <Col sm={2} />
                      <Col sm={9}>
                        <Navbar.Text>
                          <a
                            style={{ color: "#444903", fontFamily: "artifika" }}
                            href="/invoice"
                          >
                            Ver informações
                          </a>
                        </Navbar.Text>
                        <h6
                          className="card-text"
                          style={{
                            color: "black",
                            fontFamily: "artifika",
                            marginLeft: 45,
                            marginTop: 0,
                          }}
                        >
                          2 artigos{" "}
                        </h6>
                        <h6
                          className="card-text"
                          style={{
                            color: "black",
                            fontFamily: "artifika",
                            marginLeft: 45,
                            marginTop: 10,
                          }}
                        >
                          € 20.80{" "}
                        </h6>
                      </Col>
                      <Col sm={1} />
                    </Row>
                    <h5
                      className="card-text"
                      style={{
                        color: "black",
                        fontFamily: "artifika",
                        marginLeft: -60,
                        marginTop: -40,
                      }}
                    >
                      {" "}
                      Entregue
                    </h5>
                    <p
                      className="card-text"
                      style={{
                        color: "black",
                        fontFamily: "artifika",
                        marginLeft: -60,
                        marginTop: 0,
                      }}
                    >
                      {" "}
                      <medium className="text"> 18/03/2021 </medium>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col sm={3} />
        </Row>
        <div className="mt-5"> </div>
        {/* <Table  size="20" style={{color:"black", fontFamily:'artifika', alignItems:"center", justifyContent:"center", textAlign:"center" }}>
                    <thead style={{ width:10 }}>
                        <tr>
                            <th>Nome</th>
                            <th>Rua</th>
                            <th>Código-postal</th>
                            <th>País</th>
                            <th>Região</th>
                            <th>Telefone</th>
                            <th>Rede social</th>
                            <th>Logótipo</th>
                            <th>E-mail</th>
                            <th>Estado</th>
                            <th></th>    
                        </tr>
                    </thead>
                </Table> */}
      </div>
    );
  }
}
export default ProducerOrder;
