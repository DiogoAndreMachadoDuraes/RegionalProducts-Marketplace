import React, { useEffect, useState } from 'react';
import { Row, Col, Breadcrumb, Container } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Order, StoreState } from 'store';
import PDF from './PDF';

interface InvoiceParams {
	id: string;
}

export const Invoice: React.FC = () => {
	const { id } = useParams<InvoiceParams>();
	const history = useHistory();
	const orderList = useSelector((state: StoreState) => state.orders.orders);
	const clientName = useSelector((state: StoreState) => state.common.client.name);
	const telephone = useSelector((state: StoreState) => state.common.client.telephone);

	const [invoice, setInvoice] = useState<Order>();

	useEffect(() => {
		const orderInvoice = orderList.filter((x) => x._id.$oid === id).map((x) => x);
		setInvoice(orderInvoice[0]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div>
				<div>
					<Breadcrumb style={{ marginTop: 20, marginLeft: 38 }} id="breadcrumb">
						<Breadcrumb.Item onClick={() => history.push('/')}>
							<span style={{ fontFamily: 'artifika', color: '#9B3939' }}>Home</span>
						</Breadcrumb.Item>
						<Breadcrumb.Item onClick={() => history.push('/order')}>
							<span style={{ fontFamily: 'artifika', color: '#9B3939' }}>Encomendas</span>
						</Breadcrumb.Item>
						<Breadcrumb.Item active>
							<span style={{ fontFamily: 'artifika', color: 'black' }}>Fatura</span>
						</Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<Container>
					<Row>
						<Col sm={1} />
						<Col sm={10}>
							<PDF
								name={clientName}
								id={id}
								tin={invoice?.tin_client}
								date={invoice?.date}
								telephone={telephone}
								email={invoice?.email_client}
								street={invoice?.address_client}
								postalCode={invoice?.postal_code}
								locality={invoice?.location_client}
								quantity={invoice?.quantity_final}
								price={invoice?.price_final}
								image={invoice?.photo_product}
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
