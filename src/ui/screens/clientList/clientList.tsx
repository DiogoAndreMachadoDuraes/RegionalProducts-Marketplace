import React, { useState } from "react";
import "./style.css";
import {Tab, Row, Col, Table, Modal, Button, Form, FormControl, InputGroup, Toast, Spinner, Card} from "react-bootstrap";
import { AiOutlineSearch, AiFillEdit, AiFillDelete, AiOutlineUnorderedList} from "react-icons/ai";
import { Redirect } from "react-router-dom";

interface ClientList {
  _id: {$oid: string},
  name: string,
  state: string,
  tin: string,
  birthday: string,
  telephone: string,
  street:string,
  postal_code:string,
  locality:string,
  country: string,
  email: string,
  password: string,
}

export const ClientList: React.FC = () => {
  const [client, setClient] = useState<ClientList[]>();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [state, setState] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientId, setClientId] = useState('');
  const [clientState, setClientState] = useState('');
  const [showToastEdit, setShowToastEdit] = useState(false);
  const [showToastDelete, setShowToastDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //add other states for clientList
  const [clientTin, setClientTin] = useState('9');
  const [clientBirthday, setClientBirthday ] = useState('12/09/1995');
  const [clientTelephone, setClientTelephone ] = useState('+351999999999');
  const [clientStreet, setClientStreet ] = useState('Rua Doutor Francisco Cunha, nº40, 1ºEsquerdo');
  const [clientPostalCode, setClientPostalCode] = useState('');
  const [clientLocality, setClientLocality ] = useState('');
  const [clientCountry, setClientCountry ] = useState('');
  const [clientEmail, setClientEmail ] = useState('');
  const [clientPassword, setClientPassword ] = useState('');

  const handleCloseEdit = () => {
    setShowModalEdit (false)
  };

  const handleShowEdit = (item: ClientList) => {
    setClientId (item._id.$oid)
    setClientName (item.name)
    setClientState (item.state)
    setClientTin (item.tin)
    setClientBirthday (item.birthday)
    setClientTelephone ( item.telephone)
    setClientStreet (item.street)
    setClientPostalCode ( item.postal_code)
    setClientLocality ( item.locality)
    setClientCountry ( item.country)
    setClientEmail ( item.email)
    setClientPassword ( item.password)
    setShowModalEdit ( true) 
  };

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientState( e.target.value );
  };

  const handleCloseDelete = () => {
    setShowModalDelete (false)
  };

  const handleShowDelete = (item: ClientList) => {
    setClientId ( item._id.$oid)
    setClientName (item.name)
    setShowModalDelete (true)
  };

  const modalEdit = () => {
    return (
      <Modal
        show={showModalEdit}
        onHide={handleCloseEdit}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar estado do cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>Nome do Utilizador: {clientName}</Modal.Body>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicRange">
              <Form.Label>Estado da conta</Form.Label>
              <Form.Control
                required
                onChange={handleType}
                as="select"
                defaultValue={clientState}
              >
                <option>Ativa</option>
                <option>Desativa</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Fechar
          </Button>
          <Button
            variant="primary"
           /*  onClick={ () => edit() && handleCloseEdit} */
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const modalDelete = () => {
    return (
      <Modal
        show={showModalDelete}
        onHide={handleCloseDelete}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminar cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>Pretende eliminar o/a cliente {clientName}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Fechar
          </Button>
          <Button
            variant="primary"
           /*  onClick={() => delete() && handleCloseDelete} */
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const handleEdit = async () => {
    try {
      await fetch("http://127.0.0.1:5000/client", {
        method: "PUT",
        headers: {
/*           Authorization: "Bearer " + token,
 */          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: clientId,
          tin: clientTin,
          name: clientName,
          birthday: clientBirthday,
          telephone: clientTelephone,
          street: clientStreet,
          postal_code: clientPostalCode,
          locality: clientLocality,
          country: clientCountry,
          email: clientEmail,
          password: clientPassword,
          state: clientState,
        }),
      });
      setShowToastEdit(true );
      setShowModalEdit(false);
      setTimeout(function () {
        window.location.reload();
      }, 3000);
    } catch (e) {
      console.log("Error to Edit Client Status: " + e);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch("http://127.0.0.1:5000/client", {
        method: "DELETE",
        headers: {
/*           Authorization: "Bearer " + token,
 */          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: clientId,
        }),
      });
      setShowToastDelete (true)
      setShowModalDelete (false)
      setTimeout(function () {
        window.location.reload();
      }, 3000);
    } catch (e) {
      console.log("Error to Delete Client: " + e);
    }
  };

  const editSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearched(true)
    setSearchTerm (e.target.value)
  };

  const search = () => {

    if(client !== undefined){const name = Object.values(client).filter((a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const tin = Object.values(client)
      /* .filter((a) => a.tin === parseInt(searchTerm)) */
      .map((a) => a);

    if (name.length === 0 && tin.length === 0) {
      return (
        <tr style={{ marginTop: 20 }}>
          <td colSpan={9}> Não existem dados para mostrar</td>
        </tr>
      );
    }
    if (name.length !== 0) {
      return name.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.tin}</td>
            <td>{item.name}</td>
            <td>{item.telephone}</td>
            <td>{item.street}</td>
            <td>
              {item.postal_code} {item.locality}, {item.country}
            </td>
            <td>{item.email}</td>
            <td>{item.state}</td>
            <td>
              <AiFillEdit
                size="25"
                onClick={() => handleShowEdit(item)}
                color="#AAAA74"
              />
              {showModalEdit ? modalEdit() : false}
            </td>
            <td>
              <AiFillDelete
                size="25"
                onClick={() => handleShowDelete(item)}
                color="#444903"
              />
              {showModalDelete ? modalDelete() : false}
            </td>
          </tr>
        );
      });
    }
    if (tin.length !== 0) {
      return tin.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.tin}</td>
            <td>{item.name}</td>
            <td>{item.telephone}</td>
            <td>{item.street}</td>
            <td>
              {item.postal_code} {item.locality}, {item.country}
            </td>
            <td>{item.email}</td>
            <td>{item.state}</td>
            <td>
              <AiFillEdit
                size="25"
                onClick={() => handleShowEdit(item)}
                color="#AAAA74"
              />
              {showModalEdit ? modalEdit() : false}
            </td>
            <td>
              <AiFillDelete
                size="25"
                onClick={() => handleShowDelete(item)}
                color="#444903"
              />
              {showModalDelete ? modalDelete() : false}
            </td>
          </tr>
        );
      });
    }} 
  };

 /*  const checkPermissions = () => {
    if ((isLogged === false || type !== "admin") && isLoading === true) {
      return <Redirect to="/nopermissions" />;
    }
  } */

  const load = () => {
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

  return ( <>
  <div>
  {showToastEdit && (
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
      <Row id="row">
        <Col sm={4} />
        <Col sm={4}>
          <Toast
            onClose={() => setShowToastEdit(false)}
            show={showToastEdit}
            delay={3000}
            autohide
            style={{ marginTop: 20 }}
          >
            <Toast.Header style={{ backgroundColor: "#AAAA74" }}>
              <strong className="me-auto" style={{ color: "#444903" }}>
                Alerta, Cliente Editado!
              </strong>
            </Toast.Header>
            <Toast.Body>Cliente editado com sucesso!</Toast.Body>
          </Toast>
        </Col>
        <Col sm={4} />
      </Row>
    </Tab.Container>
  )}
  {showToastDelete && (
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
      <Row id="row">
        <Col sm={4} />
        <Col sm={4}>
          <Toast
            onClose={() => setShowToastDelete(false)}
            show={showToastDelete}
            delay={3000}
            autohide
          >
            <Toast.Header style={{ backgroundColor: "#AAAA74" }}>
              <strong className="me-auto" style={{ color: "#444903" }}>
                Alerta, Cliente Eliminado!
              </strong>
            </Toast.Header>
            <Toast.Body>Cliente eliminado com sucesso!</Toast.Body>
          </Toast>
        </Col>
        <Col sm={4} />
      </Row>
    </Tab.Container>
  )}
  <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
  <Row id="row"> 
  <Col sm={1} />
            <Col sm={5} style={{ marginTop: 35 }}>
              <h1 style={{ color:'#8A3535', fontFamily:'Artifika' }}>Clientes</h1>
            </Col>
            <Col sm={2} />
            <Col sm={3} style={{ marginTop: 35 }}>
            <Form className="mr-auto">
                <InputGroup className="mb-2">
                    <FormControl type="text" placeholder="Pesquisar" />
                    <InputGroup.Append>
                        <InputGroup.Text style={{ backgroundColor: '#9b3939', color: 'white' }}>
                            <AiOutlineSearch />
                        </InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
      </Col>
      <Col sm={1} />
    </Row>
  </Tab.Container>
  <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
    <Row id="row" style={{ marginBottom: 80 }}>
      <Col sm={1} />
      <Col sm={10}>
      <Card
                style={{
                  color: "#9B3939",
                  fontFamily: "artifika",
                  marginTop: 40,
                }}
              >
        <Table
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
              <th>Nif</th>
              <th>Data de Nascimento</th>
              <th>Morada</th>
              <th>Código-Postal</th>
              <th>Localidade</th>
              <th>Telemóvel</th>
              <th>Email</th>
              <th>Estado</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(client === undefined || client === null) && (
              <tr>
                <td colSpan={9}>Não existem clientes para mostrar</td>
              </tr>
            )}
            {(searchTerm === "" &&  (client !== undefined || client !== null))
              ? client?.map((item: ClientList) => {
                  return (
                    <tr>
                      <td>{item.tin}</td>
                      <td>{item.name}</td>
                      <td>{item.telephone}</td>
                      <td>{item.street}</td>
                      <td>
                        {item.postal_code} {item.locality}, {item.country}
                      </td>
                      <td>{item.email}</td>
                      <td>{item.state}</td>
                      <td>
                        <AiFillEdit
                          size="25"
                          onClick={() => handleShowEdit(item)}
                          color="#9B3939"
                        />
                        {showModalEdit ? modalEdit() : false}
                      </td>
                      <td>
                        <AiFillDelete
                          size="25"
                          onClick={() => handleShowDelete(item)}
                          color="#9B3939"
                        />
                        {showModalDelete ? modalDelete() : false}
                      </td>
                    </tr>
                  );
                })
              : search()}
          </tbody>
        </Table>
        </Card>
      </Col>
      <Col sm={1} />
    </Row>
  </Tab.Container>
  </div> 
  </>
  )
};



/* class ClientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: "",
      showModalEdit: false,
      showModalDelete: false,
      searched: false,
      searchTerm: "",
      state: "",
      clientName: "",
      clientId: "",
      clientState: "",
      showToastEdit: false,
      showToastDelete: false,
      isLoading: false,
    };
  } */

 /*  async componentDidMount() {
    console.log("Mounting the screen Table Client...");
    try {
      let token = await localStorage.getItem("token");
      let type = await localStorage.getItem("type");
      if (token !== null) {
        this.setState({
          isLogged: true,
          token,
          type,
        });
      } else {
        this.setState({
          isLogged: false,
        });
      }
      console.log(token, type, this.state.isLogged);
    } catch (e) {
      console.log("Error rending data: " + e);
      alert("Existiu um erro, por favor faça login novamente");
    }
    const { token } = this.state;
    try {
      let response = await fetch("http://127.0.0.1:5000/clients", {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let json = await response.json();
      this.setState({
        client: json,
        isLoading: true,
      });
      console.log(json);
    } catch (e) {
      console.log("Error to get data: " + e);
    }
  } */

  /* handleCloseEdit = () => {
    this.setState({ showModalEdit: false });
  };

  handleShowEdit = (item) => {
    this.setState({
      clientId: item._id.$oid,
      clientName: item.name,
      clientState: item.state,
      clientTin: item.tin,
      clientBirthday: item.birthday,
      clientTelephone: item.telephone,
      clientStreet: item.street,
      clientPostalCode: item.postal_code,
      clientLocality: item.locality,
      clientCountry: item.country,
      clientEmail: item.email,
      clientPassword: item.password,
      showModalEdit: true,
    });
  };

  handleType = (e) => {
    this.setState({ clientState: e.target.value });
  };

  handleCloseDelete = () => {
    this.setState({ showModalDelete: false });
  };

  handleShowDelete = (item) => {
    this.setState({
      clientId: item._id.$oid,
      clientName: item.name,
      showModalDelete: true,
    });
  };

  modalEdit() {
    const { showModalEdit, clientName, clientState } = this.state;
    return (
      <Modal
        show={showModalEdit}
        onHide={this.handleCloseEdit}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar estado do cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>Nome do Utilizador: {clientName}</Modal.Body>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicRange">
              <Form.Label>Estado da conta</Form.Label>
              <Form.Control
                required
                onChange={this.handleType}
                as="select"
                defaultValue={clientState}
              >
                <option>Ativa</option>
                <option>Desativa</option>
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
    const { showModalDelete, clientName } = this.state;
    return (
      <Modal
        show={showModalDelete}
        onHide={this.handleCloseDelete}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminar cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>Pretende eliminar o/a cliente {clientName}?</Modal.Body>
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
      clientId,
      clientName,
      clientTin,
      clientBirthday,
      clientTelephone,
      clientStreet,
      clientPostalCode,
      clientLocality,
      clientCountry,
      clientEmail,
      clientPassword,
      clientState,
      token,
    } = this.state;
    try {
      await fetch("http://127.0.0.1:5000/client", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: clientId,
          tin: clientTin,
          name: clientName,
          birthday: clientBirthday,
          telephone: clientTelephone,
          street: clientStreet,
          postal_code: clientPostalCode,
          locality: clientLocality,
          country: clientCountry,
          email: clientEmail,
          password: clientPassword,
          state: clientState,
        }),
      });
      this.setState({ showToastEdit: true, showModalEdit: false });
      setTimeout(function () {
        window.location.reload();
      }, 3000);
    } catch (e) {
      console.log("Error to Edit Client Status: " + e);
    }
  };

  delete = async () => {
    const { clientId, token } = this.state;
    try {
      await fetch("http://127.0.0.1:5000/client", {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: clientId,
        }),
      });
      this.setState({ showToastDelete: true, showModalDelete: false });
      setTimeout(function () {
        window.location.reload();
      }, 3000);
    } catch (e) {
      console.log("Error to Delete Client: " + e);
    }
  };

  editSearch = (e) => {
    this.setState({
      searched: true,
      searchTerm: e.target.value,
    });
  };

  search = () => {
    const { client, showModalEdit, showModalDelete, searchTerm } = this.state;

    const name = Object.values(client).filter((a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const tin = Object.values(client)
      .filter((a) => a.tin === parseInt(searchTerm))
      .map((a) => a);

    if (name.length === 0 && tin.length === 0) {
      return (
        <tr style={{ marginTop: 20 }}>
          <td colSpan="9">Não existem dados para mostrar</td>
        </tr>
      );
    }
    if (name.length !== 0) {
      return name.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.tin}</td>
            <td>{item.name}</td>
            <td>{item.telephone}</td>
            <td>{item.street}</td>
            <td>
              {item.postal_code} {item.locality}, {item.country}
            </td>
            <td>{item.email}</td>
            <td>{item.state}</td>
            <td>
              <AiFillEdit
                size="25"
                onClick={() => this.handleShowEdit(item)}
                color="#AAAA74"
              />
              {showModalEdit ? this.modalEdit() : false}
            </td>
            <td>
              <AiFillDelete
                size="25"
                onClick={() => this.handleShowDelete(item)}
                color="#444903"
              />
              {showModalDelete ? this.modalDelete() : false}
            </td>
          </tr>
        );
      });
    }
    if (tin.length !== 0) {
      return tin.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.tin}</td>
            <td>{item.name}</td>
            <td>{item.telephone}</td>
            <td>{item.street}</td>
            <td>
              {item.postal_code} {item.locality}, {item.country}
            </td>
            <td>{item.email}</td>
            <td>{item.state}</td>
            <td>
              <AiFillEdit
                size="25"
                onClick={() => this.handleShowEdit(item)}
                color="#AAAA74"
              />
              {showModalEdit ? this.modalEdit() : false}
            </td>
            <td>
              <AiFillDelete
                size="25"
                onClick={() => this.handleShowDelete(item)}
                color="#444903"
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
  }; */

  /* render() {
    const {
      client,
      searchTerm,
      showToastEdit,
      showToastDelete,
      showModalDelete,
      showModalEdit,
    } = this.state;
    this.load();
    this.checkPermissions();
    return (
      <div>
        {showToastEdit && (
          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row id="row">
              <Col sm={4} />
              <Col sm={4}>
                <Toast
                  onClose={() => this.setState({ showToastEdit: false })}
                  show={showToastEdit}
                  delay={3000}
                  autohide
                  style={{ marginTop: 20 }}
                >
                  <Toast.Header style={{ backgroundColor: "#AAAA74" }}>
                    <strong className="me-auto" style={{ color: "#444903" }}>
                      Alerta, Cliente Editado!
                    </strong>
                  </Toast.Header>
                  <Toast.Body>Cliente editado com sucesso!</Toast.Body>
                </Toast>
              </Col>
              <Col sm={4} />
            </Row>
          </Tab.Container>
        )}
        {showToastDelete && (
          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row id="row">
              <Col sm={4} />
              <Col sm={4}>
                <Toast
                  onClose={() => this.setState({ showToastDelete: false })}
                  show={showToastDelete}
                  delay={3000}
                  autohide
                >
                  <Toast.Header style={{ backgroundColor: "#AAAA74" }}>
                    <strong className="me-auto" style={{ color: "#444903" }}>
                      Alerta, Cliente Eliminado!
                    </strong>
                  </Toast.Header>
                  <Toast.Body>Cliente eliminado com sucesso!</Toast.Body>
                </Toast>
              </Col>
              <Col sm={4} />
            </Row>
          </Tab.Container>
        )}
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row id="row" style={{ marginTop: 50, marginBottom: 15 }}>
            <Col sm={1} />
            <Col sm={5}>
              <Row>
                <Col sm={1}>
                  <AiOutlineUnorderedList
                    size="30"
                    style={{ color: "#444903" }}
                  />
                </Col>
                <Col sm={11}>
                  <h4 style={{ color: "#AAAA74" }}>Lista de Clientes</h4>
                </Col>
              </Row>
            </Col>
            <Col sm={2} />
            <Col sm={3}>
              <Form inline>
                <InputGroup className="mb-3">
                  <FormControl
                    type="text"
                    value={searchTerm}
                    onChange={this.editSearch}
                    placeholder="Procurar Cliente"
                  />
                  <InputGroup.Append>
                    <InputGroup.Text id="search">
                      <AiOutlineSearch />
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
            </Col>
            <Col sm={1} />
          </Row>
        </Tab.Container>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row id="row" style={{ marginBottom: 80 }}>
            <Col sm={1} />
            <Col sm={10}>
              <Table
                size="20"
                style={{
                  marginTop: 26,
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <thead style={{ width: 10 }}>
                  <tr>
                    <th>Nif</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Morada</th>
                    <th>Código Postal</th>
                    <th>Email</th>
                    <th>Estado</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {client === "" && (
                    <tr>
                      <td colSpan="9">Não existem dados para mostrar</td>
                    </tr>
                  )}
                  {searchTerm === "" && client !== ""
                    ? client.map((item) => {
                        return (
                          <tr>
                            <td>{item.tin}</td>
                            <td>{item.name}</td>
                            <td>{item.telephone}</td>
                            <td>{item.street}</td>
                            <td>
                              {item.postal_code} {item.locality}, {item.country}
                            </td>
                            <td>{item.email}</td>
                            <td>{item.state}</td>
                            <td>
                              <AiFillEdit
                                size="25"
                                onClick={() => this.handleShowEdit(item)}
                                color="#AAAA74"
                              />
                              {showModalEdit ? this.modalEdit() : false}
                            </td>
                            <td>
                              <AiFillDelete
                                size="25"
                                onClick={() => this.handleShowDelete(item)}
                                color="#444903"
                              />
                              {showModalDelete ? this.modalDelete() : false}
                            </td>
                          </tr>
                        );
                      })
                    : this.search()}
                </tbody>
              </Table>
            </Col>
            <Col sm={1} />
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

export default ClientList; */
