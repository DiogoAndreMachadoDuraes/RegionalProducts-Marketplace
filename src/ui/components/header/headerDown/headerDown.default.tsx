import React from 'react';
import { Nav, Navbar, Dropdown, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export const HeaderDefault: React.FC = () => {
	const history = useHistory();

	return (
		<>
			<Nav.Link onClick={() => history.push('/')} style={{ color: 'white', marginLeft: 20 }}>
				Home
			</Nav.Link>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<NavDropdown
						title={<span style={{ color: 'white' }}>Produtos</span>}
						id="nav-dropdown"
						style={{ color: 'white' }}
					>
						<Dropdown.Header>Azeites</Dropdown.Header>
						<Dropdown.Item href="/product/olive/virgin" eventKey="1">
							Azeite Virgem
						</Dropdown.Item>
						<Dropdown.Item href="/product/olive/extravirgin" eventKey="2">
							Azeite Extra-Virgem
						</Dropdown.Item>
						<Dropdown.Item href="/product/olive/flavor" eventKey="3">
							Azeite Aromatizado
						</Dropdown.Item>
						<Dropdown.Divider />

						<Dropdown.Header>Vinhos</Dropdown.Header>
						<Dropdown.Item href="/product/wine/tinto" eventKey="1">
							Vinho Tinto
						</Dropdown.Item>
						<Dropdown.Item href="/product/wine/branco" eventKey="2">
							Vinho Branco
						</Dropdown.Item>
						<Dropdown.Item href="/product/wine/rose" eventKey="3">
							Vinho Rosé
						</Dropdown.Item>
						<Dropdown.Item href="/product/wine/espumante" eventKey="4">
							Espumante
						</Dropdown.Item>
						<Dropdown.Divider />

						<Dropdown.Header>Aguardentes</Dropdown.Header>
						<Dropdown.Item href="/product/brandy/arbutus" eventKey="1">
							Aguardente de Medronho
						</Dropdown.Item>
						<Dropdown.Item href="/product/brandy/cereals" eventKey="2">
							Aguardente de Cereais
						</Dropdown.Item>
						<Dropdown.Item href="/product/brandy/woodcane" eventKey="3">
							Aguardente de Cana de Madeira
						</Dropdown.Item>
						<Dropdown.Item href="/product/brandy/pear" eventKey="4">
							Aguardente de Pêra
						</Dropdown.Item>
						<Dropdown.Divider />

						<Dropdown.Header>Licores</Dropdown.Header>
						<Dropdown.Item href="/product/liquor/limoncello" eventKey="1">
							Licor de Limoncello
						</Dropdown.Item>
						<Dropdown.Item href="/product/liquor/coffee" eventKey="2">
							Licor de Café
						</Dropdown.Item>
						<Dropdown.Item href="/product/liquor/almonds" eventKey="3">
							Licor de Amêndoas
						</Dropdown.Item>
						<Dropdown.Item href="/product/liquor/chocolate" eventKey="4">
							Licor de Chocolate
						</Dropdown.Item>
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</>
	);
};
