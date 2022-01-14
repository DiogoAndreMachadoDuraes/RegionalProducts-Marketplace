import React, { useEffect, useState } from 'react';
import { images } from 'assets';
import axios from 'axios';
import { Image, Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { AiOutlineUser, AiFillPhone, AiFillCreditCard, AiOutlineMail } from 'react-icons/ai';
import { BsFillPinMapFill } from 'react-icons/bs';
import { MdDateRange } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';
import { FaMapSigns } from 'react-icons/fa';
import { StoreState } from 'store';
import { useSelector } from 'react-redux';

interface Client {
	name: string;
	tin: number;
	street: string;
	locality: string;
	country: string;
	birthday: string;
	postal_code: string;
	telephone: string;
	email: string;
}

export const ClientProfile: React.FC = () => {
	const [client, setClient] = useState<Client>({
		name: 'Diogo Durães',
		tin: 242245435,
		street: 'Rua da Cerca Nova, porta 532',
		locality: 'Arco de Baúlhe',
		country: 'Braga',
		birthday: '03/08/1998',
		postal_code: '4850-058',
		telephone: '+351955844022',
		email: 'diogo.machado.duraes@gmail.com',
	});
	const [showModalDelete, setShowModalDelete] = useState(false);

	const handleCloseDelete = () => {
		setShowModalDelete(false);
	};

	const handleShowDelete = () => {
		setShowModalDelete(true);
	};

	const handleCallDelete = () => {
		handleDelete();
		handleCloseDelete();
	};

	const token = useSelector((state: StoreState) => state.common.user.isLogged);
	const userId = useSelector((state: StoreState) => state.common.user.name);

	useEffect(() => {
		async function fetchClient() {
			try {
				const config = {
					headers: { Authorization: `Bearer ${token}` },
				};

				await axios.get(`http://127.0.0.1:5000/client/${userId}`, config).then((res) => {
					const client = res.data;
					setClient({
						name: client.name,
						tin: client.tin,
						street: client.street,
						locality: client.locality,
						country: client.country,
						birthday: client.birthday,
						postal_code: client.postal_code,
						telephone: client.telephone,
						email: client.email,
					});
				});
			} catch (e) {
				console.log('Error to get Client: ' + e);
			}
		}

		fetchClient();
	}, [client, token, userId]);

	const modalDelete = () => {
		return (
			<Modal show={showModalDelete} onHide={handleCloseDelete} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Eliminar cliente</Modal.Title>
				</Modal.Header>
				<Modal.Body>Pretende eliminar a sua conta cliente de {client.name}?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseDelete}>
						Fechar
					</Button>
					<Button variant="primary" onClick={handleCallDelete}>
						Eliminar
					</Button>
				</Modal.Footer>
			</Modal>
		);
	};

	const handleDelete = async () => {
		try {
			await fetch('http://127.0.0.1:5000/client', {
				method: 'DELETE',
				headers: {
					/* Authorization: "Bearer " + token, */
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					/* _id: userId, */
				}),
			});
			alert('Cliente eliminado com sucesso!');
			window.location.reload();
		} catch (e) {
			console.log('Error to Delete Client: ' + e);
		}
		/* this.props.history.push("/home"); */
	};

	return (
		<Container
			style={{
				marginTop: 60,
				marginBottom: 62,
			}}
		>
			<Row>
				<Col sm={1} />
				<Col sm={10}>
					<h3 style={{ color: '#8A3535' }}>Informações da Conta</h3>
				</Col>
				<Col sm={1} />
			</Row>
			<Row>
				<Col sm={4} />
				<Col sm={4}>
					<Image src={images.producer} width={250} height={250} />
				</Col>
				<Col sm={4} />
			</Row>
			<Row style={{ marginTop: 20 }}>
				<Col sm={1} />
				<Col sm={5}>
					<Row>
						<AiOutlineUser size="22" color="#8A3535" />
						<h6 style={{ marginLeft: 5, fontSize: 16 }}>
							<span style={{ fontWeight: 'bold' }}>Nome:</span> {client.name}
						</h6>
					</Row>
				</Col>
				<Col sm={1} />
				<Col sm={5}>
					<Row>
						<MdDateRange size="22" color="#8A3535" />
						<h5 style={{ marginLeft: 7, fontSize: 16 }}>
							<span style={{ fontWeight: 'bold' }}>Data de nascimento:</span> {client.birthday}
						</h5>
					</Row>
				</Col>
			</Row>
			<Row style={{ marginTop: 25 }}>
				<Col sm={1} />
				<Col sm={5}>
					<Row>
						<AiFillCreditCard size="22" color="#8A3535" />
						<h5 style={{ marginLeft: 8, fontSize: 16 }}>
							<span style={{ fontWeight: 'bold' }}>Número de contribuinte:</span> {client.tin}
						</h5>
					</Row>
				</Col>
				<Col sm={1} />
				<Col sm={5}>
					<Row>
						<AiFillPhone size="22" color="#8A3535" />
						<h5 style={{ marginLeft: 5, fontSize: 16 }}>
							<span style={{ fontWeight: 'bold' }}>Contacto:</span> {client.telephone}
						</h5>
					</Row>
				</Col>
			</Row>
			<Row style={{ marginTop: 25 }}>
				<Col sm={1} />
				<Col sm={5}>
					<Row>
						<FaMapSigns size="22" color="#8A3535" />
						<h5 style={{ marginLeft: 8, fontSize: 16 }}>
							<span style={{ fontWeight: 'bold' }}>Morada:</span> {client.street}
						</h5>
					</Row>
				</Col>
				<Col sm={1} />
				<Col sm={5}>
					<Row>
						<IoLocationOutline size="22" color="#8A3535" />
						<h5 style={{ marginLeft: 5, fontSize: 16 }}>
							<span style={{ fontWeight: 'bold' }}>Código Postal:</span> {client.postal_code}
						</h5>
					</Row>
				</Col>
			</Row>
			<Row style={{ marginTop: 25 }}>
				<Col sm={1} />
				<Col sm={5}>
					<Row>
						<BsFillPinMapFill size="22" color="#8A3535" style={{ color: '#8A3535' }} />
						<h5 style={{ marginLeft: 8, fontSize: 16 }}>
							<span style={{ fontWeight: 'bold' }}>Localidade:</span> {client.locality}, {client.country}
						</h5>
					</Row>
				</Col>
				<Col sm={1} />
				<Col sm={5}>
					<Row>
						<AiOutlineMail size="22" color="#8A3535" />
						<h5 style={{ marginLeft: 7, fontSize: 16 }}>
							<span style={{ fontWeight: 'bold' }}>Email:</span> {client.email}
						</h5>
					</Row>
				</Col>
			</Row>
			<Row style={{ marginTop: 50 }}>
				<Col sm={3} />
				<Col sm={3}>
					<Button
						variant="dark"
						href="/editclient"
						style={{
							color: '#9B3939',
							backgroundColor: 'white',
							fontWeight: 'bold',
						}}
					>
						Editar dados
					</Button>
				</Col>
				<Col sm={3}>
					<Button
						variant="light"
						onClick={handleShowDelete}
						style={{
							color: 'white',
							backgroundColor: '#8A3535',
						}}
					>
						Eliminar conta
					</Button>
					{showModalDelete && modalDelete()}
				</Col>
				<Col sm={3} />
			</Row>
		</Container>
	);
};

/* 
import React from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import {
  AiOutlineUser,
  AiFillPhone,
  AiFillCreditCard,
  AiOutlineMail,
} from "react-icons/ai";
import { GrMapLocation } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import NavDropdown from "react-bootstrap/NavDropdown";
import Breadcrumb from "react-bootstrap/Breadcrumb";

class Profileclient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: [],
      showModalDelete: false,
    };
  }
  async componentDidMount() {
    try {
      let token = await localStorage.getItem("token");
      let type = await localStorage.getItem("type");
      let userId = await localStorage.getItem("userId");
      let name_client = await localStorage.getItem("name");
      if (token !== null) {
        this.setState({
          isLogged: true,
          token,
          type,
          userId,
          name_client,
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

    axios.get(`http://127.0.0.1:5000/client/${userId}`, config).then((res) => {
      const client = res.data;
      this.setState({ client });
      this.setState({
        name: client.name,
        tin: client.tin,
        birthday: client.birthday,
        telephone: client.telephone,
        street: client.street,
        locality: client.locality,
        country: client.country,
        postal_code: client.postal_code,
        email: client.email,
        password: client.password,
        state: client.state,
      });
    });
  }

  
   try{
    let response = await fetch('http://127.0.0.1:5000/client/505c7afc35b538450ba947b8' , {
            method: 'GET',
            headers: {
               
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
   
       
        let json = await response.json();
        this.setState({ 
            client: json
        });
        console.log(json);
    } catch(e){
        console.log("Error to Get Client: " + e);
    }

  handleCloseDelete = () => {
    this.setState({ showModalDelete: false });
  };
  handleShowDelete = () => {
    this.setState({
      showModalDelete: true,
    });
  };
  modalDelete() {
    const { showModalDelete, client } = this.state;
    return (
      <Modal
        show={showModalDelete}
        onHide={this.handleCloseDelete}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminar cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Pretende eliminar a sua conta cliente de {client.name}?
        </Modal.Body>
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
  delete = async () => {
    const { userId, token } = this.state;

    try {
      await fetch("http://127.0.0.1:5000/client", {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: userId,
        }),
      });
      alert("Cliente eliminado com sucesso!");
      window.location.reload();
    } catch (e) {
      console.log("Error to Delete Client: " + e);
    }
    this.props.history.push("/home");
  };

  render() {
    const { client, showModalDelete } = this.state;

    return (
      <div>
        <div>
          <div>
            <Breadcrumb
              style={{ marginTop: 20, marginLeft: 28 }}
              id="breadcrumb"
            >
              <Col md={2}>
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

              <Col md={1}></Col>

              <br />
              <Row>
                <Col md={12}>
                  <h3 style={{ color: "#AAAA74" }}>
                    {" "}
                    Informações da Conta <br />
                  </h3>
                  <h7>
                    <br />
                  </h7>
                  <h5>
                    <AiOutlineUser size="20" color="#000000" />
                    Nome Completo:
                    <br />
                  </h5>
                  <h5>{client.name}</h5>

                  <h7>
                    <br />
                  </h7>
                  <h5>
                    <AiFillCreditCard size="20" color="#000000" />
                    Número de contribuinte:
                    <br />
                  </h5>
                  <h5>{client.tin}</h5>

                  <h7>
                    <br />
                  </h7>
                  <h5>
                    <IoLocationOutline size="20" color="#000000" />
                    Morada:
                    <br />
                  </h5>
                  <h5>{client.street}</h5>

                  <h7>
                    <br />
                  </h7>

                  <h5>
                    <GrMapLocation size="20" color="#000000" />
                    Localidade:
                    <br />
                  </h5>
                  <h5>{client.locality}</h5>
                  <h7>
                    <br />
                  </h7>
                  <h5>
                    <GrMapLocation size="20" color="#000000" />
                    País:
                    <br />
                  </h5>
                  <h5>{client.country}</h5>
                </Col>
              </Row>
              <Col md={2}></Col>
              <Row>
                <Col>
                  <h7>
                    <br />
                  </h7>
                  <h5>
                    <br />
                    <MdDateRange size="20" color="#000000" />
                    Data de nascimento:
                    <br />
                  </h5>
                  <h5>{client.birthday}</h5>

                  <h7>
                    <br />
                  </h7>
                  <h5>
                    <AiFillPhone size="20" color="#000000" />
                    Contacto:
                    <br />
                  </h5>
                  <h5>{client.telephone}</h5>

                  <h7>
                    <br />
                  </h7>
                  <h5>
                    Código Postal:
                    <br />
                  </h5>
                  <h5>{client.postal_code}</h5>

                  <h7>
                    <br />
                  </h7>
                  <h5>
                    <AiOutlineMail size="20" color="#000000" />
                    Email:
                    <br />
                  </h5>
                  <h5>{client.email}</h5>
                </Col>
              </Row>
            </Breadcrumb>
            <Row>
              <Col md={3}></Col>
              <Col md={2}>
                <Button
                  variant="dark"
                  href="/editclient"
                  style={{
                    color: "#444903",
                    backgroundColor: "#AAAA74",
                  }}
                >
                  Editar
                </Button>
              </Col>
              <Col>
                <Button
                  variant="dark"
                  onClick={this.handleShowDelete}
                  style={{
                    color: "#444903",
                    backgroundColor: "#444903",
                  }}
                >
                  Eliminar conta
                </Button>
                {showModalDelete ? this.modalDelete() : false}
              </Col>
              <br />
              <br />
            </Row>
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Profileclient;
 */
