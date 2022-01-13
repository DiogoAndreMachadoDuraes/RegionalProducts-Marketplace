import React from 'react';
import { Nav } from 'react-bootstrap';

export const HeaderProducer: React.FC = () => {
	return (
		<>
			<Nav.Link href="/dashboardadmin" style={{ color: 'white', marginLeft: 20 }}>
				Home
			</Nav.Link>
			<Nav.Link href="/producerlist" style={{ color: 'white' }}>
				Produtores
			</Nav.Link>
			<Nav.Link href="/productlist" style={{ color: 'white' }}>
				Produtos
			</Nav.Link>
			<Nav.Link href="/clientlist" style={{ color: 'white' }}>
				Clientes
			</Nav.Link>
		</>
	);
};
