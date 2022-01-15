import React from 'react';
import { Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export const HeaderProducer: React.FC = () => {
	const history = useHistory();

	return (
		<>
			<Nav.Link onClick={() => history.push('/dashboardadmin')} style={{ color: 'white', marginLeft: 20 }}>
				Home
			</Nav.Link>
			<Nav.Link onClick={() => history.push('/producerlist')} style={{ color: 'white' }}>
				Produtores
			</Nav.Link>
			<Nav.Link onClick={() => history.push('/productlist')} style={{ color: 'white' }}>
				Produtos
			</Nav.Link>
			<Nav.Link onClick={() => history.push('/clientlist')} style={{ color: 'white' }}>
				Clientes
			</Nav.Link>
		</>
	);
};
