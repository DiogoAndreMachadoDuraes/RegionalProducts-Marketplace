import React from 'react';
import { Col, Row, Form, Container, InputGroup, Button } from 'react-bootstrap';
import { AiOutlineUser, AiTwotoneLock } from 'react-icons/ai';
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
import { ModalSuccess } from './modalSuccess';
import { useProducerRegister } from './useProducerRegister';

export const ProducerRegister: React.FC = () => {
	const {
		handleName,
		handleTin,
		handleTelephone,
		handleStreet,
		handlePostalCode,
		handleLocation,
		handleSocial,
		handleRegion,
		handleCountry,
		handleLogo,
		handleEmail,
		handlePassword,
		isPasswordShown,
		togglePasswordVisiblity,
		show,
		handleClose,
		name,
		handleLogin,
		handleSubmit,
	} = useProducerRegister();

	return (
		<>
			<Container>
				<br />
				<br />
				<br />
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<h2 style={{ color: '#9B3939' }}>Criar Conta Produtor</h2>
				</div>
				<br />
				<br />
				<Row>
					<AiOutlineUser size="25" color="#9B3939" />
					<h5 style={{ marginLeft: 5 }}>Informação Pessoal</h5>
				</Row>
				<br />
				<Row>
					<Col>
						<Form.Label>Nome Completo </Form.Label>
						<Form.Control placeholder="Nome Completo" required onChange={handleName} />
					</Col>
					<Col>
						<Form.Label>Número de Contribuinte </Form.Label>
						<Form.Control
							type="number"
							placeholder="Número de Contribuinte"
							required
							onChange={handleTin}
						/>
					</Col>
					<Col>
						<Form.Label>Contacto </Form.Label>
						<Form.Control
							id="telephone"
							type="number"
							placeholder="Contacto"
							required
							onChange={handleTelephone}
						/>
					</Col>
				</Row>
				<br />
				<Row>
					<Col>
						<Form.Label>Rua</Form.Label>
						<Form.Control placeholder="Rua" required onChange={handleStreet} />
					</Col>
					<Col>
						<Form.Label>Código Postal </Form.Label>
						<Form.Control
							id="postal_code"
							type="number"
							placeholder="Código Postal"
							required
							onChange={handlePostalCode}
						/>
					</Col>
					<Col>
						<Form.Label>Localidade </Form.Label>
						<Form.Control placeholder="Localidade" required onChange={handleLocation} />
					</Col>
				</Row>
				<br />
				<Row>
					<Col>
						<Form.Label>Rede Social </Form.Label>
						<Form.Control placeholder="Rede Social" onChange={handleSocial} />
					</Col>
					<Col>
						<Form.Label>Região</Form.Label>
						<Form.Control placeholder="Região" required onChange={handleRegion} />
					</Col>
					<Col>
						<Form.Label>País </Form.Label>
						<Form.Control title="País" as="select" required onChange={handleCountry}>
							<option>Portugal</option>
							<option>Espanha</option>
						</Form.Control>
					</Col>
				</Row>
				<br />
				<Row>
					<Col md={6}>
						<Form.Label> Comprovativo das finanças </Form.Label>
						<Form.Group>
							<Form.File
								id="custom-file-translate-html"
								label="Escolher ficheiro"
								data-browse="Procurar"
								custom
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.File id="insertLogo" label="Inserir logotipo" onChange={handleLogo} />
						</Form.Group>
					</Col>
				</Row>
				<br />
				<br />
				<Row>
					<AiTwotoneLock size="25" color="#9B3939" />
					<h5 style={{ marginLeft: 5 }}>Informação de Login</h5>
				</Row>
				<br />
				<Row>
					<Col md={6}>
						<Form.Label>Email </Form.Label>
						<Form.Control placeholder="Email" onChange={handleEmail} />
					</Col>
				</Row>
				<br />
				<Row>
					<Col>
						<Form.Label>Palavra-Passe </Form.Label>
						<InputGroup className="mb-1">
							<Form.Control
								placeholder="Palavra-Passe"
								onChange={handlePassword}
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
						<Form.Label>Confirmar Palavra-Passe</Form.Label>
						<InputGroup className="mb-1">
							<Form.Control
								placeholder="Confirmar Palavra-Passe"
								onChange={handlePassword}
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
				<Row style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
					<Col>
						<Form.Group controlId="formBasicCheckbox">
							<Form.Check
								type="checkbox"
								required
								label="Aceito os Termos e Condições / Politica de Privacidade"
							/>
						</Form.Group>
					</Col>
				</Row>
				<ModalSuccess show={show} handleClose={handleClose} name={name} handleLogin={handleLogin} />
				<Row style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
					<Button
						variant="dark"
						onClick={handleSubmit}
						style={{
							color: 'white',
							backgroundColor: '#9B3939',
						}}
					>
						Criar Conta
					</Button>
				</Row>
				<br />
				<br />
				<br />
				<br />
			</Container>
		</>
	);
};

/* class ProducerRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      social: "",
      country: "",
      location: "",
      name: "",
      postal_code: "",
      state: "Ativo",
      street: "",
      telephone: "",
      logo: "",
      showModal: false,
      isPasswordShown: false,
      showPass: false,
    };
  }
  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  handleSocial = (e) => {
    this.setState({ social: e.target.value });
  };

  handleCountry = (e) => {
    this.setState({ country: e.target.value });
  };

  handlelocation = (e) => {
    this.setState({ location: e.target.value });
  };

  handleName = (e) => {
    this.setState({ name: e.target.value });
  };

  handlePostal_code = (e) => {
    this.setState({ postal_code: e.target.value });
  };

  handleStreet = (e) => {
    this.setState({ street: e.target.value });
  };

  handleTelephone = (e) => {
    this.setState({ telephone: e.target.value });
  };

  handleLogo = (e) => {
    this.setState({ logo: e.target.value });
  };

  handleTin = (e) => {
    this.setState({ tin: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:5000/producerregister", {
        email: this.state.email,
        password: this.state.password,
        social: this.state.social,
        country: this.state.country,
        location: this.state.location,
        name: this.state.name,
        postal_code: this.state.postal_code,
        state: this.state.state,
        street: this.state.street,
        telephone: this.state.telephone,
        logo: this.state.logo,
        tin: this.state.tin,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  render() {
    const { isPasswordShown } = this.state;
    return (
      <Container>
        <br />
        <br />
        <br />
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <h3>Criar Nova Conta Produtor</h3>
          </Col>
        </Row>

        <br />
        <Row>
          <Col md={4}>
            <h5>
              <AiOutlineUser size="20" color="#000000" />
              Informação Pessoal
            </h5>
          </Col>
        </Row>
        <form onSubmit={this.handleSubmit}>
          <br />
          <Row>
            <Col>
              <Form.Label>Nome Completo </Form.Label>
              <Form.Control
                placeholder="Nome Completo"
                required
                onChange={this.handleName}
              />
            </Col>

            <Col>
              <Form.Label>País </Form.Label>
              <Form.Control as="select" required onChange={this.handleCountry}>
                <option>País</option>
                <option>Portugal</option>
                <option>Espanha</option>
              </Form.Control>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>Rua </Form.Label>
              <Form.Control
                placeholder="Rua"
                required
                onChange={this.handleStreet}
              />
            </Col>
            <Col>
              <Form.Label>Código Postal </Form.Label>
              <Form.Control
                id="postal_code"
                type="number"
                placeholder="Código Postal"
                required
                onChange={this.handlePostal_code}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>Contacto </Form.Label>
              <Form.Control
                id="telephone"
                type="number"
                placeholder="Contacto"
                required
                onChange={this.handleTelephone}
              />
            </Col>
            <Col>
              <Form.Label>Localidade </Form.Label>
              <Form.Control
                placeholder="Localidade"
                required
                onChange={this.handlelocation}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}>
              <Form.Label>Número de Contribuinte </Form.Label>
              <Form.Control
                type="number"
                placeholder="Número de Contribuinte"
                required
                onChange={this.handleTin}
              />
            </Col>
            <Col>
              <Form.Label>Rede Social </Form.Label>
              <Form.Control
                placeholder="Rede Social"
                onChange={this.handleSocial}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}>
              <Form.Label> Comprovativo das finanças </Form.Label>
              <Form>
                <Form.File
                  id="custom-file-translate-html"
                  label="Escolher ficheiro"
                  data-browse="Procurar"
                  custom
                />
              </Form>
            </Col>
            <Col>
              <Form.Group>
                <Form.File
                  onChange={this.selectFoto}
                  id="exampleFormControlFile1"
                  label="Inserir logotipo"
 */ //onChange={this.handleLogo}
/*                 />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={4}>
              <h5>
                <AiTwotoneLock size="20" color="#000000" />
                Informação de Login
              </h5>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}>
              <Form.Label>Email </Form.Label>
              <Form.Control placeholder="Email" />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>Palavra-Passe </Form.Label>
              <Form.Control
                placeholder="Palavra-Passe"
                onChange={this.handlePassword}
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
                placeholder="Confirmar Palavra-Passe"
                onChange={this.handlePassword}
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
            <Col md={6}>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  required
                  label="Aceito os Termos e Condições / Politica de Privacidade"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <Button
                variant="dark"
                type="submit"
                style={{
                  color: "white",
                  backgroundColor: "#AAAA74",
                }}
              >
                Criar Conta
              </Button>
            </Col>

            <Col md={2}>
              <Button
                variant="dark"
                href="/register"
                style={{
                  color: "white",
                  backgroundColor: "#8E8E8E",
                }}
              >
                Voltar
              </Button>
            </Col>
          </Row>
        </form>
        <br />
      </Container>
    );
  }
}
export default ProducerRegister;
 */
