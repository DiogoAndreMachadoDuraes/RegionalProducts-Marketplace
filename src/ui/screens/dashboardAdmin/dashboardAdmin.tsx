import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { BsBarChartFill } from "react-icons/bs";
import { Tab, Row, Col, Table, Card } from "react-bootstrap";

const data = [
  {
    name: "Jan.",
    VinhoTinto: 30,
    VinhoBranco: 25,
    Azeite: 15,
    /* amt: 5, */
  },
  {
    name: "Fev.",
    VinhoTinto: 33,
    VinhoBranco: 13,
    Azeite: 10,
    /* amt: 5, */
  },
  {
    name: "Mar.",
    VinhoTinto: 40,
    VinhoBranco: 30,
    Azeite: 18,
    /* amt: 0, */
  },
  {
    name: "Abr.",
    VinhoTinto: 50,
    VinhoBranco: 39,
    Azeite: 24,
    /* amt: 0, */
  },
  {
    name: "Mai.",
    VinhoTinto: 40,
    VinhoBranco: 48,
    Azeite: 28,
    /* amt: 0, */
  },
  {
    name: "Jun.",
    VinhoTinto: 43,
    VinhoBranco: 40,
    Azeite: 20,
    /* amt: 0, */
  },
];

export const DashboardAdmin: React.FC = () => {

return ( 
	<>
		<div>
    <Row id="row" style={{ color: "black", marginTop: 60 }}>
          <Col sm={1} />
          <Col sm={9} style={{ color: "444903", fontFamily: "artifika" }}>
            <BsBarChartFill size="40" style={{ color: "black" }} />
          </Col>
          <Col sm={2} />
        </Row>
        <Row
          id="row"
          style={{
            color: "#AAAA74",
            fontFamily: "artifika",
            marginTop: -30,
            marginLeft: -50,
          }}
        >
          <Col sm={2} />
          <Col sm={9} style={{ color: "#AAAA74", fontFamily: "artifika" }}>
            <h3> Wine and Olive - Vendas mensais </h3>
          </Col>
          <Col sm={1} />
        </Row>
        <Row style={{ fontFamily: "artifika", marginTop: 30 }}>
          <Col sm={1} />
          <Col sm={10}>
            <LineChart
              width={800}
              height={600}
              data={data}
              margin={{
                top: 55,
                right: 30,
                left: 20,
                bottom: 150,
              }}
            >
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="VinhoTinto"
                stroke="#f44336"
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="VinhoBranco"
                stroke="#388e3c"
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Azeite"
                stroke="#fbc02d"
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </Col>
          <Col sm={1} />
        </Row>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row
            id="row"
            style={{
              fontFamily: "artifika",
              marginTop: -80,
              marginBottom: 200,
            }}
          >
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
                      <th>Ordem</th>
                      <th>Quantidade</th>
                      <th>Produto mais vendido</th>
                      <th>Última Compra</th>
                      <th></th>
                    </tr>
                  </thead>
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

/* class DashboardAdmin extends React.Component {
  static demoUrl = "https://codesandbox.io/s/simple-line-chart-kec3v";

  render() {
    return (
      <div>
        <Row id="row" style={{ color: "black", marginTop: 60 }}>
          <Col sm={1} />
          <Col sm={9} style={{ color: "444903", fontFamily: "artifika" }}>
            <BsBarChartFill size="40" style={{ color: "black" }} />
          </Col>
          <Col sm={2} />
        </Row>
        <Row
          id="row"
          style={{
            color: "#AAAA74",
            fontFamily: "artifika",
            marginTop: -30,
            marginLeft: -50,
          }}
        >
          <Col sm={2} />
          <Col sm={9} style={{ color: "#AAAA74", fontFamily: "artifika" }}>
            <h3> Wine and Olive - Vendas mensais </h3>
          </Col>
          <Col sm={1} />
        </Row>
        <Row style={{ fontFamily: "artifika", marginTop: 30 }}>
          <Col sm={1} />
          <Col sm={10}>
            <LineChart
              width={800}
              height={600}
              data={data}
              margin={{
                top: 55,
                right: 30,
                left: 20,
                bottom: 150,
              }}
            >
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="VinhoTinto"
                stroke="#f44336"
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="VinhoBranco"
                stroke="#388e3c"
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Azeite"
                stroke="#fbc02d"
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </Col>
          <Col sm={1} />
        </Row>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row
            id="row"
            style={{
              fontFamily: "artifika",
              marginTop: -80,
              marginBottom: 200,
            }}
          >
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
                      <th>Ordem</th>
                      <th>Quantidade</th>
                      <th>Produto mais vendido</th>
                      <th>Última Compra</th>
                      <th></th>
                    </tr>
                  </thead>
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
export default DashboardAdmin;
 */