import React from "react";
import { Tab, Row, Col, Button, Form } from "react-bootstrap";
import { GiUnlocking } from "react-icons/gi";

class ForgetPassword extends React.Component {
  /* async componentDidMount () {
        console.log ("Mounting screen Forget Password...");
        
        try {
            let response= await fetch ('http://127.0.0.1:5000/client',{
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let json = await response.json();
            this.setState({ 
                client: json
            });
            console.log(json);
        } catch(e){
            console.log("Error to get data: " + e);
        }
    } */

  /* send(){

    } */

  render() {
    /* const { client } = this.state; */
    return (
      <div>
        <Row id="row">
          <Col sm={2} />
          <Col sm={7} style={{ color: "black", fontFamily: "artifika" }}>
            <GiUnlocking
              size="40"
              style={{ color: "black", marginLeft: 20, marginTop: 50 }}
            />
          </Col>
          <Col sm={3} />
        </Row>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row id="row">
            <Col sm={1} />
            <Col
              sm={8}
              style={{
                marginTop: -40,
                marginLeft: 20,
                color: "#AAAA74",
                fontFamily: "artifika",
              }}
            >
              <h3>Repor palavra-passe</h3>
            </Col>
            <Col sm={3} />
          </Row>
          <Row id="row">
            <Col sm={2} />
            <Col
              sm={8}
              style={{
                marginTop: 100,
                marginLeft: 0,
                color: "black",
                fontFamily: "artifika",
              }}
            >
              <h5>Esqueceu-se da sua palavra-passe?</h5>
            </Col>
            <Col sm={2} />
          </Row>
          <Row id="row">
            <Col sm={2} />
            <Col
              sm={8}
              style={{
                marginTop: 35,
                marginLeft: 0,
                color: "black",
                fontFamily: "artifika",
              }}
            >
              <h5>
                Digite o seu endereço de e-mail abaixo. Receberá um link para
                redefinir a sua palavra-passe.
              </h5>
            </Col>
            <Col sm={2} />
          </Row>
          <Row id="row">
            <Col sm={2} />
            <Col
              sm={8}
              style={{
                marginLeft: 0,
                marginTop: 100,
                color: "black",
                fontFamily: "artifika",
              }}
            >
              <Form>
                <Form.Label> E-mail</Form.Label>
                <Form.Control
                  className="mx-sm-1"
                  id="inlineFormInputName2"
                  placeholder="Digite o seu e-mail..."
                  style={{
                    backgroundColor: "#FFFFFF",
                    marginTop: 0,
                    color: "black",
                  }}
                />
                <Button
                  type="submit"
                  className="mb-2"
                  href="Login"
                  style={{
                    backgroundColor: "#444903",
                    color: "white",
                    marginLeft: 1050,
                    marginTop: -60,
                  }}
                >
                  Submeter
                </Button>
              </Form>
            </Col>
            <Col sm={2} />
          </Row>
        </Tab.Container>
        <div className="mt-5"> </div>
      </div>
    );
  }
}
export default ForgetPassword;
