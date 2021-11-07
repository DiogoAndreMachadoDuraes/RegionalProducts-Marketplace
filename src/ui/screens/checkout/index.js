import React from "react";
import "./style.css";
import { Button, Card, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import thanks from "../../assets/thanks.jpg";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 3,
    };
  }

  async componentDidMount() {
    console.log("Mounting the screen Checkout...");
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
  }

  checkPermissions = () => {
    const { isLogged, isLoading, type } = this.state;
    if ((isLogged === false || type !== "client") && isLoading === true) {
      return <Redirect to="/nopermissions" />;
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
    const { number } = this.state;
    /* GET NUMBER OF SHIP IN HISTORY PASSES
        const number = this.props.location.number;
        */
    this.load();
    this.checkPermissions();
    return (
      <div>
        <Card className="text-center text-white">
          <Card.Img src={thanks} alt="Card image" />
          <Card.ImgOverlay style={{ marginTop: 180 }}>
            <Card.Title
              style={{ fontSize: 80, marginBottom: 200, color: "white" }}
            >
              Obrigado pela sua compra!
            </Card.Title>
            <Card.Text
              style={{
                fontSize: 30,
                color: "#444903",
                marginBottom: 110,
                fontWeight: "bold",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <div
                style={{
                  backgroundColor: "#AAAA74",
                  borderRadius: 50,
                  width: 1000,
                  height: 120,
                  textAlign: "center",
                  marginTop: -50,
                }}
              >
                <Card.Text style={{ marginTop: 15 }}>
                  O seu número de encomenda é #{number},
                </Card.Text>
                <Card.Text style={{ marginTop: -20 }}>
                  será informado quando ela estiver em fase de transporte!
                </Card.Text>
              </div>
            </Card.Text>
            <Button
              href="/home"
              variant="light"
              size="lg"
              style={{ backgroundColor: "#444903", color: "white" }}
            >
              Voltar ao iniciar
            </Button>
          </Card.ImgOverlay>
        </Card>
      </div>
    );
  }
}

export default Checkout;
