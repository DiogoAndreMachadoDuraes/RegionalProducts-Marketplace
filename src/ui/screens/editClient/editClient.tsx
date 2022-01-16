import React, { useState } from 'react';
import './style.css';
import { Col, Container, Row, Form, Button, InputGroup, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { AiOutlineUser, AiTwotoneLock } from 'react-icons/ai';
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
import { useHistory } from 'react-router';

interface ClientList {
	_id: { $oid: string };
	email: string;
	password: string;
	country: string;
	locality: string;
	name: string;
	postal_Code: string;
	state: string;
	street: string;
	telephone: string;
	tin: string;
}

export const EditClient: React.FC = () => {
	const Spacer = require('react-spacer');

	const history = useHistory();

	const [client, setClient] = useState<ClientList[]>();
	const [showModal, setShowModal] = useState(false);
	const [isPasswordShown, setIsPasswordShown] = useState(false);
	const [showPass, setShowPass] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [birthday, setBirthday] = useState('');
	const [country, setCountry] = useState('');
	const [locality, setLocality] = useState('');
	const [name, setName] = useState('');
	const [postal_Code, setPostal_Code] = useState('');
	const [state, setState] = useState('Ativo');
	const [street, setStreet] = useState('');
	const [telephone, setTelephone] = useState('');
	const [tin, setTin] = useState('');

	const togglePasswordVisiblity = () => {
		setIsPasswordShown(!isPasswordShown);
	};

	const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleBirthday = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBirthday(e.target.value);
	};

	const handleCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCountry(e.target.value);
	};

	const handleLocality = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocality(e.target.value);
	};

	const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handlePostal_code = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPostal_Code(e.target.value);
	};

	const handleState = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState(e.target.value);
	};

	const handleStreet = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStreet(e.target.value);
	};

	const handleTelephone = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTelephone(e.target.value);
	};

	const handleTin = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTin(e.target.value);
	};

	const handleSubmit = async (item: ClientList) => {
		try {
			await fetch('http://127.0.0.1:5000/client', {
				method: 'PUT',
				headers: {
					/* Authorization: "Bearer " + token, */
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: client,
					tin: tin,
					name: name,
					birthday: birthday,
					telephone: telephone,
					street: street,
					postal_Code: postal_Code,
					locality: locality,
					country: country,
					email: email,
					password: password,
					state: state,
				}),
			});

			alert('Cliente editado com sucesso!');
			window.location.reload();
		} catch (e) {
			console.log('Error to Edit Client Status: ');
		}
		history.push('/client');
	};

	return (
		<>
			<Container>
				<br />
				<Row className="justify-content-md">
					<Col xs lg="12">
						<h3 style={{ color: '#8A3535', fontFamily: 'Artifika' }}>
							Editar Informação da Conta de {name}
						</h3>
					</Col>
				</Row>

				<br />
				<br />

				<Row>
					<Col md={30}>
						<Spacer horizontal="10px" />
						<h5 style={{ fontFamily: 'Artifika' }}>
							<AiOutlineUser size="24" color="#8A3535" />
							Informação Pessoal
						</h5>
					</Col>

					<Col md={{ span: 11, offset: 11 }}></Col>
				</Row>
				<br />
				<Row>
					<Col>
						<Form.Label style={{ fontFamily: 'Artifika' }}>Nome Completo </Form.Label>
						<Form.Control onChange={handleName} defaultValue={name} />
					</Col>

					<Col>
						<Form.Label style={{ fontFamily: 'Artifika' }}>Data de Nascimento </Form.Label>
						<Form.Control onChange={handleBirthday} defaultValue={birthday} />
					</Col>
				</Row>
				<br />
				<Row>
					<Col>
						<Form.Label style={{ fontFamily: 'Artifika' }}>Morada </Form.Label>
						<Form.Control onChange={handleStreet} defaultValue={street} />
					</Col>
					<Col>
						<Form.Label style={{ fontFamily: 'Artifika' }}>Código Postal </Form.Label>
						<Form.Control onChange={handlePostal_code} defaultValue={postal_Code} />
					</Col>
				</Row>
				<br />
				<Row>
					<Col>
						<Form.Label style={{ fontFamily: 'Artifika' }}>Contacto </Form.Label>
						<Form.Control onChange={handleTelephone} defaultValue={telephone} />
					</Col>
					<Col>
						<Form.Label style={{ fontFamily: 'Artifika' }}>Localidade </Form.Label>
						<Form.Control onChange={handleLocality} defaultValue={locality} />
					</Col>
				</Row>
				<br />
				<Row>
					<Col md={6}>
						<Form.Label style={{ fontFamily: 'Artifika' }}>Número de Contribuinte </Form.Label>
						<Form.Control onChange={handleTin} defaultValue={tin} />
					</Col>
					<Col>
						<Form.Label style={{ fontFamily: 'Artifika' }}>País </Form.Label>
						<Form.Control required onChange={handleCountry} as="select" defaultValue={country}>
							<option>País</option>
							<option>Afeganistão</option>
							<option>África do Sul</option>
							<option>Akrotiri</option>
							<option>Albânia</option>
							<option>Alemanha</option>
							<option>Andorra</option>
							<option>Angola</option>
							<option>Anguila</option>
							<option>Antárctida</option>
							<option>Antígua e Barbuda</option>
							<option>Arábia Saudita</option>
							<option>Arctic Ocean</option>
							<option>Argélia</option>
							<option>Argentina</option>
							<option>Arménia</option>
							<option>Aruba</option>
							<option>Ashmore and Cartier Islands</option>
							<option>Atlantic Ocean</option>
							<option>Austrália</option>
							<option>Áustria</option>
							<option>Azerbaijão</option>
							<option>Baamas</option>
							<option>Bangladeche</option>
							<option>Barbados</option>
							<option>Barém</option>
							<option>Bélgica</option>
							<option>Belize</option>
							<option>Benim</option>
							<option>Bermudas</option>
							<option>Bielorrússia</option>
							<option>Birmânia</option>
							<option>Bolívia</option>
							<option>Bósnia e Herzegovina</option>
							<option>Botsuana</option>
							<option>Brasil</option>
							<option>Brunei</option>
							<option>Bulgária</option>
							<option>Burquina Faso</option>
							<option>Burúndi</option>
							<option>Butão</option>
							<option>Cabo Verde</option>
							<option>Camarões</option>
							<option>Camboja</option>
							<option>Canadá</option>
							<option>Catar</option>
							<option>Cazaquistão</option>
							<option>Chade</option>
							<option>Chile</option>
							<option>China</option>
							<option>Chipre</option>
							<option>Clipperton Island</option>
							<option>Colômbia</option>
							<option>Comores</option>
							<option>Congo-Brazzaville</option>
							<option>Congo-Kinshasa</option>
							<option>Coral Sea Islands</option>
							<option>Coreia do Norte</option>
							<option>Coreia do Sul</option>
							<option>Costa do Marfim</option>
							<option>Costa Rica</option>
							<option>Croácia</option>
							<option>Cuba</option>
							<option>Curacao</option>
							<option>Dhekelia</option>
							<option>Dinamarca</option>
							<option>Domínica</option>
							<option>Egipto</option>
							<option>Emiratos Árabes Unidos</option>
							<option>Equador</option>
							<option>Eritreia</option>
							<option>Eslováquia</option>
							<option>Eslovénia</option>
							<option>Espanha</option>
							<option>Estados Unidos</option>
							<option>Estónia</option>
							<option>Etiópia</option>
							<option>Faroé</option>
							<option>Fiji</option>
							<option>Filipinas</option>
							<option>Finlândia</option>
							<option>França</option>
							<option>Gabão</option>
							<option>Gâmbia</option>
							<option>Gana</option>
							<option>Gaza Strip</option>
							<option>Geórgia</option>
							<option>Geórgia do Sul e Sandwich do Sul</option>
							<option>Gibraltar</option>
							<option>Granada</option>
							<option>Grécia</option>
							<option>Gronelândia</option>
							<option>Guame</option>
							<option>Guatemala</option>
							<option>Guernsey</option>
							<option>Guiana</option>
							<option>Guiné</option>
							<option>Guiné Equatorial</option>
							<option>Guiné-Bissau</option>
							<option>Haiti</option>
							<option>Honduras</option>
							<option>Hong Kong</option>
							<option>Hungria</option>
							<option>Iémen</option>
							<option>Ilha Bouvet</option>
							<option>Ilha do Natal</option>
							<option>Ilha Norfolk</option>
							<option>Ilhas Caimão</option>
							<option>Ilhas Cook</option>
							<option>Ilhas dos Cocos</option>
							<option>Ilhas Falkland</option>
							<option>Ilhas Heard e McDonald</option>
							<option>Ilhas Marshall</option>
							<option>Ilhas Salomão</option>
							<option>Ilhas Turcas e Caicos</option>
							<option>Ilhas Virgens Americanas</option>
							<option>Ilhas Virgens Britânicas</option>
							<option>Índia</option>
							<option>Indian Ocean</option>
							<option>Indonésia</option>
							<option>Irão</option>
							<option>Iraque</option>
							<option>Irlanda</option>
							<option>Islândia</option>
							<option>Israel</option>
							<option>Itália</option>
							<option>Jamaica</option>
							<option>Jan Mayen</option>
							<option>Japão</option>
							<option>Jersey</option>
							<option>Jibuti</option>
							<option>Jordânia</option>
							<option>Kosovo</option>
							<option>Kuwait</option>
							<option>Laos</option>
							<option>Lesoto</option>
							<option>Letónia</option>
							<option>Líbano</option>
							<option>Libéria</option>
							<option>Líbia</option>
							<option>Listenstaine</option>
							<option>Lituânia</option>
							<option>Luxemburgo</option>
							<option>Macau</option>
							<option>Macedónia</option>
							<option>Madagáscar</option>
							<option>Malásia</option>
							<option>Malávi</option>
							<option>Maldivas</option>
							<option>Mali</option>
							<option>Malta</option>
							<option>Marianas do Norte</option>
							<option>Marrocos</option>
							<option>Maurícia</option>
							<option>Mauritânia</option>
							<option>México</option>
							<option>Micronésia</option>
							<option>Moçambique</option>
							<option>Moldávia</option>
							<option>Mónaco</option>
							<option>Mongólia</option>
							<option>Monserrate</option>
							<option>Montenegro</option>
							<option>Namíbia</option>
							<option>Nauru</option>
							<option>Navassa Island</option>
							<option>Nepal</option>
							<option>Nicarágua</option>
							<option>Níger</option>
							<option>Nigéria</option>
							<option>Niue</option>
							<option>Noruega</option>
							<option>Nova Caledónia</option>
							<option>Nova Zelândia</option>
							<option>Omã</option>
							<option>Pacific Ocean</option>
							<option>Países Baixos</option>
							<option>Palau</option>
							<option>Panamá</option>
							<option>Papua-Nova Guiné</option>
							<option>Paquistão</option>
							<option>Paracel Islands</option>
							<option>Paraguai</option>
							<option>Peru</option>
							<option>Pitcairn</option>
							<option>Polinésia Francesa</option>
							<option>Polónia</option>
							<option>Porto Rico</option>
							<option>Portugal</option>
							<option>Quénia</option>
							<option>Quirguizistão</option>
							<option>Quiribáti</option>
							<option>Reino Unido</option>
							<option>República Centro-Africana</option>
							<option>República Dominicana</option>
							<option>Roménia</option>
							<option>Ruanda</option>
							<option>Rússia</option>
							<option>Salvador</option>
							<option>São Tomé e Príncipe</option>
							<option>São Vicente e Granadinas</option>
							<option>Sara Ocidental</option>
							<option>Seicheles</option>
							<option>Senegal</option>
							<option>Serra Leoa</option>
							<option>Sérvia</option>
							<option>Singapura</option>
							<option>Sint Maarten</option>
							<option>Síria</option>
							<option>Somália</option>
							<option>Southern Ocean</option>
							<option>Spratly Islands</option>
							<option>Sri Lanca</option>
							<option>Suazilândia</option>
							<option>Sudão</option>
							<option>Sudão do Sul</option>
							<option>Suécia</option>
							<option>Suíça</option>
							<option>Suriname</option>
							<option>Svalbard e Jan Mayen</option>
							<option>Tailândia</option>
							<option>Taiwan</option>
							<option>Tajiquistão</option>
							<option>Tanzânia</option>
							<option>Território Britânico do Oceano Índico</option>
							<option>Territórios Austrais Franceses</option>
							<option>Timor Leste</option>
							<option>Togo</option>
							<option>Tokelau</option>
							<option>Tonga</option>
							<option>Trindade e Tobago</option>
							<option>Tunísia</option>
							<option>Turquemenistão</option>
							<option>Turquia</option>
							<option>Tuvalu</option>
							<option>Ucrânia</option>
							<option>Uruguai</option>
							<option>Usbequistão</option>
							<option>Vaticano</option>
							<option>Venezuela</option>
							<option>Vietname</option>
						</Form.Control>
					</Col>
				</Row>

				<br />
				<Row>
					<Col md={3}>
						<h5 style={{ marginTop: 20, fontFamily: 'Artifika' }}>
							<AiTwotoneLock size="20" color="#8A3535" />
							Informação de Login
						</h5>
					</Col>
				</Row>
				<br />
				<Row>
					<Col md={6}>
						<Form.Label style={{ fontFamily: 'Artifika' }}>Email </Form.Label>
						<Form.Control onChange={handleEmail} defaultValue={email} />
					</Col>
				</Row>
				<br />
				<Row>
					<Col>
						<Form.Label style={{ fontFamily: 'artifika' }}>Palavra-Passe </Form.Label>
						<InputGroup className="mb-1">
							<Form.Control
								placeholder="Palavra-Passe"
								onChange={handlePassword}
								defaultValue={password}
								name="password"
								type={isPasswordShown ? 'text' : 'password'}
								style={{ color: 'black', opacity: 1 }}
							/>
							<InputGroup.Append>
								<InputGroup.Text id="inputGroupAppend" style={{ backgroundColor: 'white' }}>
									{isPasswordShown ? (
										<BsFillEyeFill
											onClick={togglePasswordVisiblity}
											size="20"
											style={{ color: '#9B3939' }}
										/>
									) : (
										<BsFillEyeSlashFill
											onClick={togglePasswordVisiblity}
											size="20"
											style={{ color: '#9B3939' }}
										/>
									)}
								</InputGroup.Text>
							</InputGroup.Append>
						</InputGroup>
					</Col>
					<Col>
						<Form.Label style={{ fontFamily: 'artifika' }}>Confirmar Palavra-Passe</Form.Label>
						<InputGroup className="mb-1">
							<Form.Control
								placeholder="Confirmar Palavra-Passe"
								onChange={handlePassword}
								defaultValue={password}
								name="password"
								type={isPasswordShown ? 'text' : 'password'}
								style={{ color: 'black', opacity: 1 }}
							/>
							<InputGroup.Append>
								<InputGroup.Text id="inputGroupAppend" style={{ backgroundColor: 'white' }}>
									{isPasswordShown ? (
										<BsFillEyeFill
											onClick={togglePasswordVisiblity}
											size="20"
											style={{ color: '#9B3939' }}
										/>
									) : (
										<BsFillEyeSlashFill
											onClick={togglePasswordVisiblity}
											size="20"
											style={{ color: '#9B3939' }}
										/>
									)}
								</InputGroup.Text>
							</InputGroup.Append>
						</InputGroup>
					</Col>
				</Row>
				<br />
				<br />
				<br />
				<Row>
					<Col md={50}>
						<Button
							type="submit"
							variant="dark"
							style={{ backgroundColor: '#8A3535', marginLeft: '450px' }}
						>
							Submeter alterações
						</Button>
					</Col>

					<Col md={4}>
						<Button href="/client" variant="dark" style={{ color: '#8A3535', backgroundColor: '#FFFFFF' }}>
							Voltar
						</Button>
					</Col>
				</Row>
				<br />
				<br />
			</Container>
		</>
	);
};

/* class Editclient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: [],
      name: "",
      tin: "",
      birthday: "",
      telephone: "",
      street: "",
      locality: "",
      country: "",
      postal_code: "",
      email: "",
      password: "",
      state: "Ativa",
      showModal: false,
      isPasswordShown: false,
      showPass: false,
    };
  }

  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

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

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  handleBirthday = (e) => {
    this.setState({ birthday: e.target.value });
  };

  handleCountry = (e) => {
    this.setState({ country: e.target.value });
  };

  handleLocality = (e) => {
    this.setState({ locality: e.target.value });
  };

  handleName = (e) => {
    this.setState({ name: e.target.value });
  };

  handlePostal_code = (e) => {
    this.setState({ postal_code: e.target.value });
  };

  handleState = (e) => {
    this.setState({ state: e.target.value });
  };

  handleStreet = (e) => {
    this.setState({ street: e.target.value });
  };

  handleTelephone = (e) => {
    this.setState({ telephone: e.target.value });
  };

  handleTin = (e) => {
    this.setState({ tin: e.target.value });
  };

  handleSubmit = async () => {
    const {
      name,
      tin,
      birthday,
      telephone,
      street,
      postal_code,
      locality,
      country,
      email,
      password,
      state,
      userId,
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
          _id: userId,
          tin: tin,
          name: name,
          birthday: birthday,
          telephone: telephone,
          street: street,
          postal_code: postal_code,
          locality: locality,
          country: country,
          email: email,
          password: password,
          state: state,
        }),
      });

      alert("Cliente editado com sucesso!");
      window.location.reload();
    } catch (e) {
      console.log("Error to Edit Client Status: ");
    }
    this.props.history.push("/client");
  };
  render() {
    const { client, name_client, isPasswordShown } = this.state;
    return (
      <Container>
        <br />
        <Row className="justify-content-md">
          <Col xs lg="12">
            <h3 style={{ fontWeight: "bold" }}>
              Editar Informação da Conta de {name_client}
            </h3>
          </Col>
        </Row>

        <br />
        <br />
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={30}>
              <h5>
                <AiOutlineUser size="20" color="#000000" />
                Informação Pessoal
              </h5>
            </Col>

            <Col md={{ span: 11, offset: 11 }}></Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>Nome Completo </Form.Label>
              <Form.Control
                onChange={this.handleName}
                defaultValue={client.name}
              />
            </Col>

            <Col>
              <Form.Label>Data de Nascimento </Form.Label>
              <Form.Control
                onChange={this.handleBirthday}
                defaultValue={client.birthday}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>Morada </Form.Label>
              <Form.Control
                onChange={this.handleStreet}
                defaultValue={client.street}
              />
            </Col>
            <Col>
              <Form.Label>Código Postal </Form.Label>
              <Form.Control
                onChange={this.handlePostal_code}
                defaultValue={client.postal_code}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>Contacto </Form.Label>
              <Form.Control
                onChange={this.handleTelephone}
                defaultValue={client.telephone}
              />
            </Col>
            <Col>
              <Form.Label>Localidade </Form.Label>
              <Form.Control
                onChange={this.handleLocality}
                defaultValue={client.locality}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}>
              <Form.Label>Número de Contribuinte </Form.Label>
              <Form.Control
                onChange={this.handleTin}
                defaultValue={client.tin}
              />
            </Col>
            <Col>
              <Form.Label>País </Form.Label>
              <Form.Control
                required
                onChange={this.handleCountry}
                as="select"
                defaultValue={client.country}
              >
                <option>País</option>
                <option>Afeganistão</option>
                <option>África do Sul</option>
                <option>Akrotiri</option>
                <option>Albânia</option>
                <option>Alemanha</option>
                <option>Andorra</option>
                <option>Angola</option>
                <option>Anguila</option>
                <option>Antárctida</option>
                <option>Antígua e Barbuda</option>
                <option>Arábia Saudita</option>
                <option>Arctic Ocean</option>
                <option>Argélia</option>
                <option>Argentina</option>
                <option>Arménia</option>
                <option>Aruba</option>
                <option>Ashmore and Cartier Islands</option>
                <option>Atlantic Ocean</option>
                <option>Austrália</option>
                <option>Áustria</option>
                <option>Azerbaijão</option>
                <option>Baamas</option>
                <option>Bangladeche</option>
                <option>Barbados</option>
                <option>Barém</option>
                <option>Bélgica</option>
                <option>Belize</option>
                <option>Benim</option>
                <option>Bermudas</option>
                <option>Bielorrússia</option>
                <option>Birmânia</option>
                <option>Bolívia</option>
                <option>Bósnia e Herzegovina</option>
                <option>Botsuana</option>
                <option>Brasil</option>
                <option>Brunei</option>
                <option>Bulgária</option>
                <option>Burquina Faso</option>
                <option>Burúndi</option>
                <option>Butão</option>
                <option>Cabo Verde</option>
                <option>Camarões</option>
                <option>Camboja</option>
                <option>Canadá</option>
                <option>Catar</option>
                <option>Cazaquistão</option>
                <option>Chade</option>
                <option>Chile</option>
                <option>China</option>
                <option>Chipre</option>
                <option>Clipperton Island</option>
                <option>Colômbia</option>
                <option>Comores</option>
                <option>Congo-Brazzaville</option>
                <option>Congo-Kinshasa</option>
                <option>Coral Sea Islands</option>
                <option>Coreia do Norte</option>
                <option>Coreia do Sul</option>
                <option>Costa do Marfim</option>
                <option>Costa Rica</option>
                <option>Croácia</option>
                <option>Cuba</option>
                <option>Curacao</option>
                <option>Dhekelia</option>
                <option>Dinamarca</option>
                <option>Domínica</option>
                <option>Egipto</option>
                <option>Emiratos Árabes Unidos</option>
                <option>Equador</option>
                <option>Eritreia</option>
                <option>Eslováquia</option>
                <option>Eslovénia</option>
                <option>Espanha</option>
                <option>Estados Unidos</option>
                <option>Estónia</option>
                <option>Etiópia</option>
                <option>Faroé</option>
                <option>Fiji</option>
                <option>Filipinas</option>
                <option>Finlândia</option>
                <option>França</option>
                <option>Gabão</option>
                <option>Gâmbia</option>
                <option>Gana</option>
                <option>Gaza Strip</option>
                <option>Geórgia</option>
                <option>Geórgia do Sul e Sandwich do Sul</option>
                <option>Gibraltar</option>
                <option>Granada</option>
                <option>Grécia</option>
                <option>Gronelândia</option>
                <option>Guame</option>
                <option>Guatemala</option>
                <option>Guernsey</option>
                <option>Guiana</option>
                <option>Guiné</option>
                <option>Guiné Equatorial</option>
                <option>Guiné-Bissau</option>
                <option>Haiti</option>
                <option>Honduras</option>
                <option>Hong Kong</option>
                <option>Hungria</option>
                <option>Iémen</option>
                <option>Ilha Bouvet</option>
                <option>Ilha do Natal</option>
                <option>Ilha Norfolk</option>
                <option>Ilhas Caimão</option>
                <option>Ilhas Cook</option>
                <option>Ilhas dos Cocos</option>
                <option>Ilhas Falkland</option>
                <option>Ilhas Heard e McDonald</option>
                <option>Ilhas Marshall</option>
                <option>Ilhas Salomão</option>
                <option>Ilhas Turcas e Caicos</option>
                <option>Ilhas Virgens Americanas</option>
                <option>Ilhas Virgens Britânicas</option>
                <option>Índia</option>
                <option>Indian Ocean</option>
                <option>Indonésia</option>
                <option>Irão</option>
                <option>Iraque</option>
                <option>Irlanda</option>
                <option>Islândia</option>
                <option>Israel</option>
                <option>Itália</option>
                <option>Jamaica</option>
                <option>Jan Mayen</option>
                <option>Japão</option>
                <option>Jersey</option>
                <option>Jibuti</option>
                <option>Jordânia</option>
                <option>Kosovo</option>
                <option>Kuwait</option>
                <option>Laos</option>
                <option>Lesoto</option>
                <option>Letónia</option>
                <option>Líbano</option>
                <option>Libéria</option>
                <option>Líbia</option>
                <option>Listenstaine</option>
                <option>Lituânia</option>
                <option>Luxemburgo</option>
                <option>Macau</option>
                <option>Macedónia</option>
                <option>Madagáscar</option>
                <option>Malásia</option>
                <option>Malávi</option>
                <option>Maldivas</option>
                <option>Mali</option>
                <option>Malta</option>
                <option>Marianas do Norte</option>
                <option>Marrocos</option>
                <option>Maurícia</option>
                <option>Mauritânia</option>
                <option>México</option>
                <option>Micronésia</option>
                <option>Moçambique</option>
                <option>Moldávia</option>
                <option>Mónaco</option>
                <option>Mongólia</option>
                <option>Monserrate</option>
                <option>Montenegro</option>
                <option>Namíbia</option>
                <option>Nauru</option>
                <option>Navassa Island</option>
                <option>Nepal</option>
                <option>Nicarágua</option>
                <option>Níger</option>
                <option>Nigéria</option>
                <option>Niue</option>
                <option>Noruega</option>
                <option>Nova Caledónia</option>
                <option>Nova Zelândia</option>
                <option>Omã</option>
                <option>Pacific Ocean</option>
                <option>Países Baixos</option>
                <option>Palau</option>
                <option>Panamá</option>
                <option>Papua-Nova Guiné</option>
                <option>Paquistão</option>
                <option>Paracel Islands</option>
                <option>Paraguai</option>
                <option>Peru</option>
                <option>Pitcairn</option>
                <option>Polinésia Francesa</option>
                <option>Polónia</option>
                <option>Porto Rico</option>
                <option>Portugal</option>
                <option>Quénia</option>
                <option>Quirguizistão</option>
                <option>Quiribáti</option>
                <option>Reino Unido</option>
                <option>República Centro-Africana</option>
                <option>República Dominicana</option>
                <option>Roménia</option>
                <option>Ruanda</option>
                <option>Rússia</option>
                <option>Salvador</option>
                <option>São Tomé e Príncipe</option>
                <option>São Vicente e Granadinas</option>
                <option>Sara Ocidental</option>
                <option>Seicheles</option>
                <option>Senegal</option>
                <option>Serra Leoa</option>
                <option>Sérvia</option>
                <option>Singapura</option>
                <option>Sint Maarten</option>
                <option>Síria</option>
                <option>Somália</option>
                <option>Southern Ocean</option>
                <option>Spratly Islands</option>
                <option>Sri Lanca</option>
                <option>Suazilândia</option>
                <option>Sudão</option>
                <option>Sudão do Sul</option>
                <option>Suécia</option>
                <option>Suíça</option>
                <option>Suriname</option>
                <option>Svalbard e Jan Mayen</option>
                <option>Tailândia</option>
                <option>Taiwan</option>
                <option>Tajiquistão</option>
                <option>Tanzânia</option>
                <option>Território Britânico do Oceano Índico</option>
                <option>Territórios Austrais Franceses</option>
                <option>Timor Leste</option>
                <option>Togo</option>
                <option>Tokelau</option>
                <option>Tonga</option>
                <option>Trindade e Tobago</option>
                <option>Tunísia</option>
                <option>Turquemenistão</option>
                <option>Turquia</option>
                <option>Tuvalu</option>
                <option>Ucrânia</option>
                <option>Uruguai</option>
                <option>Usbequistão</option>
                <option>Vaticano</option>
                <option>Venezuela</option>
                <option>Vietname</option>
              </Form.Control>
            </Col>
          </Row>

          <br />
          <Row>
            <Col md={3}>
              <h5 style={{ marginTop: 40 }}>
                <AiTwotoneLock size="20" color="#000000" />
                Informação de Login
              </h5>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}>
              <Form.Label>Email </Form.Label>
              <Form.Control
                onChange={this.handleEmail}
                defaultValue={client.email}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>Palavra-Passe </Form.Label>
              <Form.Control
                onChange={this.handlePassword}
                defaultValue={client.password}
                name="password"
                type={isPasswordShown ? "text" : "password"}
                style={{ color: "black", opacity: 1 }}
              />

              <InputGroup.Append>
                <InputGroup.Text id="inputGroupAppend">
                  {isPasswordShown ? (
                    <BsFillEyeFill
                      onClick={this.togglePasswordVisiblity}
                      size="20"
                      style={{ color: "black" }}
                    />
                  ) : (
                    <BsFillEyeSlashFill
                      onClick={this.togglePasswordVisiblity}
                      size="20"
                      style={{ color: "black" }}
                    />
                  )}
                </InputGroup.Text>
              </InputGroup.Append>
            </Col>
            <Col>
              <Form.Label>Confirmar Palavra-Passe</Form.Label>
              <Form.Control
                onChange={this.handlePassword}
                defaultValue={client.password}
                name="password"
                type={isPasswordShown ? "text" : "password"}
                style={{ color: "black", opacity: 1 }}
              />
              <InputGroup.Append>
                <InputGroup.Text id="inputGroupAppend">
                  {isPasswordShown ? (
                    <BsFillEyeFill
                      onClick={this.togglePasswordVisiblity}
                      size="20"
                      style={{ color: "black" }}
                    />
                  ) : (
                    <BsFillEyeSlashFill
                      onClick={this.togglePasswordVisiblity}
                      size="20"
                      style={{ color: "black" }}
                    />
                  )}
                </InputGroup.Text>
              </InputGroup.Append>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={50}>
              <Button
                type="submit"
                variant="dark"
                style={{ color: "white", backgroundColor: "#444903" }}
              >
                Submeter alterações
              </Button>
            </Col>

            <Col md={4}>
              <Button
                href="/client"
                variant="dark"
                style={{ color: "white", backgroundColor: "#AAAA74" }}
              >
                Voltar
              </Button>
            </Col>
          </Row>
        </Form>
        <br />
      </Container>
    );
  }
}
export default Editclient;
 */
