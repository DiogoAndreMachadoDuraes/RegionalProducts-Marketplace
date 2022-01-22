import React, { useState } from 'react';
import {
	Tab,
	Row,
	Col,
	Button,
	Table,
	Modal,
	Form,
	Container,
	InputGroup,
	FormControl,
	Toast,
	Card,
} from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import { Redirect, useHistory } from 'react-router-dom';
import { Product, useProductListProducer } from './useProductListProducer';
import { TableShow, TableNoResults } from './components';
import { Loader } from 'ui';

export const ProductListProducer: React.FC = () => {
	const history = useHistory();
	const {
		isLogged,
		isLoading,
		type,
		showToastEdit,
		handleNotShowToastEdit,
		showToastDelete,
		handleNotShowToastDelete,
		product,
		editSearch,
		searchTerm,
	} = useProductListProducer();

	const search = () => {
		if (product !== undefined) {
			/* const name = Object.values(product).filter((a) => a.name.toLowerCase().includes(searchTerm.toLowerCase())); */
			/* const tin = Object.values(product)
				// eslint-disable-next-line eqeqeq
				.filter((a) => a.tin == searchTerm)
				.map((a) => a); */
			/* 	if (name.length === 0 && tin.length === 0) {
				return <TableNoResults />;
			}
			if (name.length !== 0) {
				return name.map((item, index) => {
					return <TableShow item={item} index={index} />;
				});
			}
			if (tin.length !== 0) {
				return tin.map((item, index) => {
					return <TableShow item={item} index={index} />;
				});
			} */
		}
	};

	return isLogged && type === 'producer' ? (
		isLoading ? (
			<>
				<div>
					{showToastEdit && (
						<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
							<Row id="row">
								<Col sm={4} />
								<Col sm={4}>
									<Toast
										onClose={handleNotShowToastEdit}
										show={showToastEdit}
										delay={3000}
										autohide
										style={{ marginTop: 20 }}
									>
										<Toast.Header style={{ backgroundColor: '#8A3535' }}>
											<strong className="me-auto" style={{ color: 'white' }}>
												Atenção! Produto Editado!
											</strong>
										</Toast.Header>
										<Toast.Body>Produto editado com sucesso!</Toast.Body>
									</Toast>
								</Col>
								<Col sm={4} />
							</Row>
						</Tab.Container>
					)}
					{showToastDelete && (
						<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
							<Row id="row">
								<Col sm={4} />
								<Col sm={4}>
									<Toast
										onClose={handleNotShowToastDelete}
										show={showToastDelete}
										delay={3000}
										autohide
									>
										<Toast.Header style={{ backgroundColor: '#8A3535' }}>
											<strong className="me-auto" style={{ color: 'white' }}>
												Atenção! Produto Eliminado!
											</strong>
										</Toast.Header>
										<Toast.Body>Produto eliminado com sucesso!</Toast.Body>
									</Toast>
								</Col>
								<Col sm={4} />
							</Row>
						</Tab.Container>
					)}
					<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
						<Row id="row">
							<Col sm={1} />
							<Col sm={5} style={{ marginTop: 35 }}>
								<h1 style={{ color: '#8A3535', fontFamily: 'Artifika' }}>Produtos</h1>
							</Col>
							<Col sm={2} />
							<Col sm={3} style={{ marginTop: 35 }}>
								<Form className="mr-auto">
									<InputGroup className="mb-2">
										<FormControl type="text" placeholder="Pesquisar" onChange={editSearch} />
										<InputGroup.Append>
											<InputGroup.Text style={{ backgroundColor: '#9b3939', color: 'white' }}>
												<AiOutlineSearch />
											</InputGroup.Text>
										</InputGroup.Append>
									</InputGroup>
								</Form>
							</Col>
							<Col sm={1} />
						</Row>
					</Tab.Container>
					<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
						<Row id="row" style={{ marginBottom: 80 }}>
							<Col sm={1} />
							<Col sm={10}>
								<Card
									style={{
										color: '#9B3939',
										fontFamily: 'artifika',
										marginTop: 40,
									}}
								>
									<Table
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
												<th>Nome</th>
												<th>Categoria</th>
												<th>Quantidade</th>
												<th>Validade</th>
												<th>Colheita</th>
												<th>Preço</th>
												<th>Foto</th>
												<th>Stock</th>
												<th>
													<Button onClick={() => history.push('/createProduct')}>
														Adicionar Novo Produto
													</Button>
												</th>
												<th></th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{(product === undefined || product === null) && <TableNoResults />}
											{searchTerm === '' && (product !== undefined || product !== null)
												? product?.map((item: Product, index: number) => {
														return <TableShow item={item} index={index} />;
												  })
												: search()}
										</tbody>
									</Table>
								</Card>
							</Col>
							<Col sm={1} />
						</Row>
					</Tab.Container>
				</div>
			</>
		) : (
			<Loader />
		)
	) : (
		<Redirect to="/noPermissions" />
	);
};
