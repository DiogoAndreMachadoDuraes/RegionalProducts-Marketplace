import React, { useState } from 'react';
import {
	Navbar,
	Form,
	Nav,
	FormControl,
	NavDropdown,
	Image,
	Container,
	Row,
	Col,
	Dropdown,
	InputGroup,
} from 'react-bootstrap';
import { images } from 'assets';
import { AiOutlineSearch } from 'react-icons/ai';
import { HeaderTopWithSession } from './headerTop.withSession';
import { HeaderTopWithoutSession } from './headerTop.withoutSession';

export interface HeaderTopProps {
	isLogged: boolean;
	name: string;
	type: string;
}

export const HeaderTop: React.FC<HeaderTopProps> = ({ isLogged, name, type }) => {
	const [language, setLanguage] = useState('PT');

	return (
		<Navbar collapseOnSelect expand="lg" style={{ backgroundColor: 'white' }}>
			<Container fluid>
				<Row id="row" style={{ justifyContent: 'center', alignItems: 'center' }}>
					<Col sm={3}>
						<Navbar.Brand>
							<Image src={images.logo} width={200} height={80} />
						</Navbar.Brand>
					</Col>
					<Col sm={1}>
						<Nav className="mr-auto">
							<Nav.Link>
								<Row>
									<h3 style={{ fontWeight: 700, fontSize: 16, color: 'black' }}>Idioma:</h3>
									<NavDropdown
										title={<span style={{ fontWeight: 500, color: 'black' }}>{language}</span>}
										id="language-dropdown"
										style={{ fontSize: 14, marginLeft: 2, marginTop: -8, color: 'black' }}
									>
										<Dropdown.Header>
											<span style={{ fontWeight: 'bold', color: 'black' }}>Linguagem:</span>
											<Form.Group style={{ width: 70 }}>
												<Form.Control
													as="select"
													value={language}
													onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
														setLanguage(e.target.value)
													}
												>
													<option value="PT">PT</option>
													<option value="EN">EN</option>
												</Form.Control>
											</Form.Group>
										</Dropdown.Header>
										<Dropdown.Divider />
										<Dropdown.Header>
											<p>
												<span style={{ fontWeight: 'bold', color: 'black' }}>Moeda: </span>Euro
												(€)
											</p>
										</Dropdown.Header>
									</NavDropdown>
								</Row>
							</Nav.Link>
						</Nav>
					</Col>
					<Col sm={1} />
					<Col sm={3}>
						<Form className="mr-auto">
							<InputGroup className="mb-2">
								<FormControl type="text" placeholder="O que procura?" />
								<InputGroup.Append>
									<InputGroup.Text style={{ backgroundColor: '#9b3939', color: 'white' }}>
										<AiOutlineSearch />
									</InputGroup.Text>
								</InputGroup.Append>
							</InputGroup>
						</Form>
					</Col>
					<Col sm={4}>
						{isLogged ? (
							<HeaderTopWithSession isLogged={isLogged} name={name} type={type} />
						) : (
							<HeaderTopWithoutSession />
						)}
					</Col>
				</Row>
			</Container>
		</Navbar>
	);
};
