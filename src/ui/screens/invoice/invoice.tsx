import React, { useEffect, useState } from 'react';
import { Row, Col, Breadcrumb, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { StoreState } from 'store';
import axios from 'axios';
import PDF from './PDF';

interface InvoiceParams {
	id: string;
}

interface Shop {
	name: string;
	id: string;
	tin: number;
	date: string;
	telephone: string;
	email: string;
	street: string;
	postalCode: string;
	locality: string;
	quantity: number;
	price: number;
}

export const Invoice: React.FC = () => {
	const { id } = useParams<InvoiceParams>();
	const token = useSelector((state: StoreState) => state.common.user.token);

	const [invoice, setInvoice] = useState<Shop>();

	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	useEffect(() => {
		const fetchApi = async () => {
			try {
				await axios.get(`http://127.0.0.1:5000/shop/` + id, config).then((res) => {
					const invoice = res.data;
					setInvoice(invoice);
				});
			} catch (e) {
				console.log('Error rending data: ' + e);
			}
		};
		fetchApi();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div>
				<div>
					<Breadcrumb style={{ marginTop: 20, marginLeft: 28, fontFamily: 'artifika' }} id="breadcrumb">
						<Breadcrumb.Item href="/home">Home </Breadcrumb.Item>
						<Breadcrumb.Item href="/order">Encomendas </Breadcrumb.Item>
						<Breadcrumb.Item active style={{ color: '#9B3939', fontFamily: 'artifika' }}>
							Fatura
						</Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<Container>
					<Row>
						<Col sm={1} />
						<Col sm={10}>
							<PDF
								name={invoice?.name}
								id={id}
								tin={invoice?.tin}
								date={invoice?.date}
								telephone={invoice?.telephone}
								email={invoice?.email}
								street={invoice?.street}
								postalCode={invoice?.postalCode}
								locality={invoice?.locality}
								quantity={invoice?.quantity}
								price={invoice?.price}
							/>
						</Col>
						<Col sm={1} />
					</Row>
				</Container>
				<div className="mt-5"> </div>
			</div>
		</>
	);
};

/* class Invoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: "",
      name: "Elvira Tavares",
      id: "1",
      tin: "222111345",
      date: "06/07/2021",
      telephone: "+351967778444",
      email: "et@sapo.pt",
      street: "Rua da Pescada",
      postalCode: "5300-450",
      locality: "Bragança",
      price: "5.67",
      quantity: "1",
    };
  }

  async componentDidMount() {
    console.log("Mounting screen Invoice...");
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
    const shopId = this.props.location.id;
    try {
      let response = await fetch("http://127.0.0.1:5000/shop" + shopId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let json = await response.json();
      this.setState({
        invoice: json,
        isLoading: true,
      });
      const { invoice } = this.state;
      const name = invoice.map((a) => a.name_client);
      const id = invoice.map((a) => a.id_client);
      const tin = invoice.map((a) => a.tin_client);
      const telephone = invoice.map((a) => a.telephone_client);
      const locality = invoice.map((a) => a.locality_client);
      const postalCode = invoice.map((a) => a.postalCode_client);
      const street = invoice.map((a) => a.street_client);
      const quantity = invoice.map((a) => a.quantity_client);
      const price = invoice.map((a) => a.price_client);
      const email = invoice.map((a) => a.email_client);
      const date = invoice.map((a) => a.date_client);
      this.setState({
        name,
        id,
        tin,
        email,
        telephone,
        locality,
        postalCode,
        street,
        quantity,
        price,
        date,
      });
    } catch (e) {
      console.log("Error to get data: " + e);
    }
  }

  checkPermissions() {
    const { isLogged, type, isLoading } = this.state;
    if ((isLogged === false || type !== "client") && isLoading === true) {
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
    const {
      name,
      id,
      date,
      telephone,
      tin,
      email,
      street,
      postalCode,
      locality,
      price,
      quantity,
    } = this.state;
    return (
      <div>
        <div>
          <Breadcrumb style={{ marginTop: 20, marginLeft: 28 }} id="breadcrumb">
            <Breadcrumb.Item href="/home">Home </Breadcrumb.Item>
            <Breadcrumb.Item href="/order">Encomendas </Breadcrumb.Item>
            <Breadcrumb.Item active style={{ color: "#AAAA74" }}>
              {" "}
              Faturas{" "}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Container>
          <Row>
            <Col sm={1} />
            <Col sm={10}>
              <PDF
                name={name}
                id={id}
                tin={tin}
                date={date}
                telephone={telephone}
                email={email}
                street={street}
                postalCode={postalCode}
                locality={locality}
                quantity={quantity}
                price={price}
              />
            </Col>
            <Col sm={1} />
          </Row>
        </Container>
        <div className="mt-5"> </div>
      </div>
    );
  }
}
export default Invoice;
 */
