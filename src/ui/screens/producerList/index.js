import React from "react";
import "./style.css";
import {
  Tab,
  Row,
  Col,
  Card,
  Form,
  Modal,
  InputGroup,
  FormControl,
  Table,
  Button,
  Spinner,
} from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Redirect } from "react-router-dom";

class ProducerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      producer: [],
      showModalEdit: false,
      showModalDelete: false,
      searched: false,
      searchTerm: "",
    };
  }

  async componentDidMount() {
    console.log("Mounting screen Producer List...");
    try {
      let token = await localStorage.getItem("token");
      let type = await localStorage.getItem("type");
      if (token !== null) {
        this.setState({
          isLogged: true,
          isLoading: false,
          token,
          type,
        });
      }
    } catch (e) {
      console.log("Error rending data: " + e);
      this.setState({
        isLogged: false,
      });
    }
    const { token } = this.state;
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
        isLoading: true,
      });
    } catch (e) {
      console.log("Error to get data: " + e);
    }
  }

  handleCloseEdit = () => {
    this.setState({ showModalEdit: false });
  };

  handleShowEdit = (item) => {
    this.setState({
      producerId: item._id.$oid,
      producerState: item.state,
      producerName: item.name,
      producerEmail: item.email,
      producerPassword: item.password,
      producerCountry: item.country,
      producerLocality: item.locality,
      producerPostalCode: item.postal_code,
      producerSocial: item.social,
      producerLogo: item.logo,
      producerStreet: item.street,
      producerTin: item.tin,
      producerTelephone: item.telephone,
      showModalEdit: true,
    });
  };

  handleCloseDelete = () => {
    this.setState({ showModalDelete: false });
  };

  handleShowDelete = (item) => {
    this.setState({
      producerId: item._id.$oid,
      producerName: item.name,
      showModalDelete: true,
    });
  };

  handleType = (e) => {
    this.setState({ producerState: e.target.value });
  };

  modalEdit() {
    const { showModalEdit, producerName, producerState } = this.state;
    return (
      <Modal
        show={showModalEdit}
        onHide={this.handleCloseEdit}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar estado do produtor</Modal.Title>
        </Modal.Header>
        <Modal.Body>Nome do Produtor: {producerName}</Modal.Body>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicRange">
              <Form.Label>Estado da conta</Form.Label>
              <Form.Control
                required
                onChange={this.handleType}
                as="select"
                defaultValue={producerState}
              >
                <option>Pendente</option>
                <option>Rejeitado</option>
                <option>Aceite</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCloseEdit}>
            Fechar
          </Button>
          <Button
            variant="primary"
            onClick={() => this.edit() && this.handleCloseEdit}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  modalDelete() {
    const { producerName, showModalDelete } = this.state;
    return (
      <Modal
        show={showModalDelete}
        onHide={this.handleCloseDelete}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminar o produtor</Modal.Title>
        </Modal.Header>
        <Modal.Body>Pretende eliminar o produtor {producerName}?</Modal.Body>
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
    const {
      producerName,
      producerLogo,
      producerState,
      producerLocality,
      producerPassword,
      producerPostalCode,
      producerSocial,
      producerStreet,
      producerTelephone,
      producerTin,
      producerCountry,
      producerEmail,
      producerId,
      token,
    } = this.state;
    try {
      await fetch("http://127.0.0.1:5000/producer", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: producerId,
          logo: producerLogo,
          email: producerEmail,
          password: producerPassword,
          country: producerCountry,
          locality: producerLocality,
          name: producerName,
          postal_code: producerPostalCode,
          social: producerSocial,
          state: producerState,
          street: producerStreet,
          telephone: producerTelephone,
          tin: producerTin,
        }),
      });
      alert("Estado editado com sucesso!");
      window.location.reload();
    } catch (e) {
      console.log("Error to Edit Producer: " + e);
    }
  };

  delete = async () => {
    const { producerId, token } = this.state;
    try {
      await fetch("http://127.0.0.1:5000/producer", {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: producerId,
        }),
      });
      alert("Produtor eliminado com sucesso!");
      window.location.reload();
    } catch (e) {
      console.log("Error to Delete Producer: " + e);
    }
  };

  editSearch = (e) => {
    this.setState({
      searched: true,
      searchTerm: e.target.value,
    });
  };

  data = (value) => {
    const { producer, showModalEdit, showModalDelete } = this.state;
    if (
      producer.filter((producer) =>
        producer.name.toLowerCase().includes(value.toLowerCase())
      ) === ""
    ) {
      return (
        <tr>
          <td colSpan="9">Não existem dados para mostrar</td>
        </tr>
      );
    } else {
      return producer
        .filter((producer) =>
          producer.name.toLowerCase().includes(value.toLowerCase())
        )
        .map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.street}</td>
              <td>{item.postal_code}</td>
              <td>{item.country}</td>
              <td>{item.locality}</td>
              <td>{item.telephone}</td>
              <td>{item.social}</td>
              <td>{item.logo}</td>
              <td>{item.email}</td>
              <td>{item.state}</td>
              <td>
                <AiFillEdit
                  size="25"
                  onClick={() => this.handleShowEdit(item)}
                  style={{ color: "444903" }}
                />
                {showModalEdit ? this.modalEdit() : false}
              </td>
              <td>
                <AiFillDelete
                  size="25"
                  onClick={() => this.handleShowDelete(item)}
                  style={{ color: "444903" }}
                />
                {showModalDelete ? this.modalDelete() : false}
              </td>
            </tr>
          );
        });
    }
  };

  checkPermissions() {
    const { isLogged, type, isLoading } = this.state;
    if ((isLogged === false || type !== "admin") && isLoading === true) {
      return <Redirect to="/nopermissions" />;
    }
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
    this.load();
    this.checkPermissions();
    const { producer, searchTerm } = this.state;
    return (
      <div>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row id="row">
            <Col sm={1} />
            <Col sm={5} style={{ marginTop: 35 }}>
              <h4 style={{ color: "#AAAA74", fontFamily: "artifika" }}>
                Produtores
              </h4>
            </Col>
            <Col sm={2} />
            <Col sm={3} style={{ marginTop: 35 }}>
              <Form inline>
                <InputGroup className="mb-3">
                  <FormControl
                    type="text"
                    value={searchTerm}
                    onChange={this.editSearch}
                    placeholder="Pesquisar Produtor"
                  />
                  {/* <Button variant="outline-secondary">Pesquisar</Button> */}
                </InputGroup>
              </Form>
            </Col>
            <Col sm={1} />
          </Row>
        </Tab.Container>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row id="row" style={{ marginBottom: 200 }}>
            <Col sm={1} />
            <Col sm={10}>
              <Card
                style={{
                  color: "black",
                  fontFamily: "artifika",
                  marginTop: 40,
                }}
              >
                <Table
                  size="20"
                  style={{
                    color: "black",
                    fontFamily: "artifika",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <thead style={{ width: 10 }}>
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
                  <tbody>
                    {producer == null ? (
                      <tr>
                        <td colSpan="9">Não existem dados para mostrar</td>
                      </tr>
                    ) : (
                      this.data(searchTerm)
                    )}
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col sm={1} />
          </Row>
        </Tab.Container>
      </div>
    );
  }
}
export default ProducerList;
