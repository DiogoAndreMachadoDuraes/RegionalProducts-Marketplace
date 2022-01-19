import React from 'react';
import { Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export const HeaderProducer: React.FC = () => {
	const history = useHistory();

	return (
		<>
			<Nav.Link onClick={() => history.push('/dashboardProducer')} style={{ color: 'white', marginLeft: 20 }}>
				Home
			</Nav.Link>
			<Nav.Link onClick={() => history.push('/productListProducer')} style={{ color: 'white' }}>
				Produtos
			</Nav.Link>
			<Nav.Link onClick={() => history.push('/producerOrder')} style={{ color: 'white' }}>
				Encomendas
			</Nav.Link>
		</>
	);
};
