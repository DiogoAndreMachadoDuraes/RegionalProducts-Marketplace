import React from 'react';
import { Nav, Navbar, Dropdown, NavDropdown } from 'react-bootstrap';
import { TiShoppingCart } from 'react-icons/ti';

export const HeaderClient: React.FC = () => {
	return (
		<>
			<Nav.Link href="/" style={{ color: 'white', marginLeft: 20 }}>
				Home
			</Nav.Link>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<NavDropdown title="Produtos" id="collasible-nav-dropdown" style={{ color: 'white' }}>
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

						<Dropdown.Header>Azeites</Dropdown.Header>
						<Dropdown.Item href="/product/:categoryolive/virgin" eventKey="1">
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
					</NavDropdown>
					<Nav.Link href="/favorites" style={{ color: 'white' }}>
						Favoritos
					</Nav.Link>
					<Nav.Link href="/order" style={{ color: 'white' }}>
						Encomendas
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
			<Nav>
				<Nav.Link eventKey={2} href="/cart">
					<a href="/cart" style={{ color: 'white' }}>
						Carrinho
					</a>
					<TiShoppingCart size="25" style={{ color: 'white', marginRight: 20 }} />
				</Nav.Link>
			</Nav>
		</>
	);
};
