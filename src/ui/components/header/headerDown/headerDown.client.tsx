import React from 'react';
import { Nav, Navbar, Dropdown, NavDropdown } from 'react-bootstrap';
import { TiShoppingCart } from 'react-icons/ti';
import { useHistory, Link } from 'react-router-dom';

export const HeaderClient: React.FC = () => {
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
						id="collasible-nav-dropdown"
						style={{ color: 'white' }}
					>
						{/* {
							data.map((item, index) => {
								return(
										<Dropdown.Header>{item.category}</Dropdown.Header>
										<Dropdown.Item href="/product/:categoryolive/virgin" eventKey="1">{item.type}</Dropdown.Item>
										<Dropdown.Item href="/product/olive/extravirgin" eventKey="2">{item.type}</Dropdown.Item>
										<Dropdown.Item href="/product/olive/flavor" eventKey="3">{item.type}</Dropdown.Item>
										<Dropdown.Divider />
									);
								})
						} */}

						<Dropdown.Item onClick={() => history.push('/product/olive/virgin')} eventKey="1">
							Mel
						</Dropdown.Item>
						<Dropdown.Item href="/product/olive/extravirgin" eventKey="2">
							Compotas
						</Dropdown.Item>
						<Dropdown.Item href="/product/olive/flavor" eventKey="3">
							Frutos Secos
						</Dropdown.Item>
					</NavDropdown>
					<Nav.Link onClick={() => history.push('/favorites')} style={{ color: 'white' }}>
						Favoritos
					</Nav.Link>
					<Nav.Link onClick={() => history.push('/order')} style={{ color: 'white' }}>
						Encomendas
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
			<Nav>
				<Nav.Link eventKey={2} onClick={() => history.push('/cart')}>
					<Link to="/cart" style={{ color: 'white', marginRight: 8 }}>
						Carrinho
					</Link>
					<TiShoppingCart size="25" style={{ color: 'white', marginRight: 20 }} />
				</Nav.Link>
			</Nav>
		</>
	);
};
