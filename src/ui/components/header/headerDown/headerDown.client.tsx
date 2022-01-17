import React from 'react';
import { Nav, Navbar, Dropdown, NavDropdown } from 'react-bootstrap';
import { TiShoppingCart } from 'react-icons/ti';
import { useHistory, Link } from 'react-router-dom';
import { StoreState } from 'store';
import { useSelector } from 'react-redux';

export const HeaderClient: React.FC = () => {
	const history = useHistory();

	const categories = useSelector((state: StoreState) => state.categories.categories);

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
						{categories.map((item, index) => {
							return (
								<Dropdown.Item
									onClick={() => history.push('/product/' + item)}
									eventKey={index.toString()}
								>
									{item}
								</Dropdown.Item>
							);
						})}
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
