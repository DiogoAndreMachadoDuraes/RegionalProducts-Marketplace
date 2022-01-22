import React from 'react';
import { Nav, Navbar, Dropdown, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { StoreState } from 'store';
import { useSelector } from 'react-redux';

export const HeaderDefault: React.FC = () => {
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
						id="nav-dropdown"
						style={{ color: 'white' }}
					>
						{categories.map((item, index) => {
							return (
								<Dropdown.Item
									onClick={() => history.push('/product/' + item)}
									eventKey={index.toString()}
									key={index}
								>
									{item}
								</Dropdown.Item>
							);
						})}
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</>
	);
};
