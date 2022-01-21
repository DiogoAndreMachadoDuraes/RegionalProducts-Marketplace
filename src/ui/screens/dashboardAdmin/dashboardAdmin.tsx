import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BsBarChartFill } from 'react-icons/bs';
import { Tab, Row, Col, Table, Card } from 'react-bootstrap';

const data = [
	{
		name: 'Out.',
		Compotas: 10,
		EnchidoseCarne: 30,
		Frutossecos: 8,
		/* amt: 0, */
	},
	{
		name: 'Nov.',
		Compotas: 20,
		EnchidoseCarne: 50,
		Frutossecos: 18,
		/* amt: 0, */
	},
	{
		name: 'Dez.',
		Compotas: 40,
		EnchidoseCarne: 90,
		Frutossecos: 0,
		/* amt: 0, */
	},
	{
		name: 'Jan.',
		Compotas: 30,
		EnchidoseCarne: 25,
		Frutossecos: 15,
		/* amt: 5, */
	},
	{
		name: 'Fev.',
		Compotas: 33,
		EnchidoseCarne: 13,
		Frutossecos: 10,
		/* amt: 5, */
	},
];

export const DashboardAdmin: React.FC = () => {
	const Spacer = require('react-spacer');
	return (
		<>
			<div>
				<Row id="row" style={{ color: 'black', marginTop: 60 }}>
					<Col sm={1} />
					<Col sm={9} style={{ color: '8A3535', fontFamily: 'artifika' }}>
						<BsBarChartFill size="40" style={{ color: 'black' }} />
					</Col>
					<Col sm={2} />
				</Row>

				<Row
					id="row"
					style={{
						color: '#8A3535',
						fontFamily: 'artifika',
						marginTop: -30,
						marginLeft: -50,
					}}
				>
					<Col sm={2} />
					<Col sm={9} style={{ color: '#8A3535', fontFamily: 'Artifika' }}>
						<h3> Produtos Regionais - Vendas mensais </h3>
					</Col>
					<Col sm={1} />
				</Row>
				<br />
				<br />
				<h4
					style={{
						marginLeft: 450,

						color: '#8A3535',
						fontFamily: 'Artifika',
					}}
				>
					Vendas - Compotas, Enchidos e Carne, Frutos secos
				</h4>
				<LineChart
					style={{
						marginLeft: '310px',
					}}
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
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="Compotas" stroke="#F3AAAA" activeDot={{ r: 6 }} />
					<Line type="monotone" dataKey="EnchidoseCarne" stroke="#F4C10B" activeDot={{ r: 6 }} />
					<Line type="monotone" dataKey="Frutossecos" stroke="#ACB9FF" activeDot={{ r: 6 }} />
				</LineChart>

				<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
					<Row
						id="row"
						style={{
							fontFamily: 'artifika',
							marginTop: -80,
							marginBottom: 200,
						}}
					>
						<Col sm={1} />
						<Col sm={10}>
							<h5 style={{ marginTop: 10, fontFamily: 'Artifika' }}>
								<br />
								Compras mensais mais recentes
							</h5>
							<Card
								style={{
									color: 'black',
									fontFamily: 'artifika',
									marginTop: 40,
								}}
							>
								<Table
									size="20"
									style={{
										color: 'black',
										fontFamily: 'artifika',
										alignItems: 'center',
										justifyContent: 'center',
										textAlign: 'center',
									}}
								>
									<thead style={{ width: 10 }}>
										<tr>
											<th>Ordem</th>
											<th>Quantidades</th>
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
	);
};
