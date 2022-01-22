import React from 'react';
import { Button, Col, Container, Form, Modal, Row, Image } from 'react-bootstrap';

interface ModalEditSausagesProps {
	showModalEditSausages: boolean;
	handleCloseDelete: () => void;
	handleCloseEdit: () => void;
	productName: string;
	handleDelete: () => void;
	handleSubmit: () => void;
	activeItemQuantity: string;
	activeItemID: string;
	activeItemValidity: string;
	activeItemHarvest: string;
	activeItemPrice: string;
	activeItemStock: string;
	activeItemPhoto: string;
	activeItemType: string;
	handlePhoto: () => void;
	handleName: () => void;
	handleQuantity: () => void;
	handleValidity: () => void;
	handleHarvest: () => void;
	handlePrice: () => void;
	handleType: () => void;
	handleStock: () => void;
}

export const ModalEditSausages: React.FC<ModalEditSausagesProps> = ({
	activeItemQuantity,
	activeItemID,
	activeItemValidity,
	activeItemPhoto,
	activeItemStock,
	activeItemPrice,
	productName,
	showModalEditSausages,
	handleCloseEdit,
	handleDelete,
	handleSubmit,
	activeItemHarvest,
	handleCloseDelete,
	activeItemType,
	handlePhoto,
	handleName,
	handleQuantity,
	handleValidity,
	handleHarvest,
	handlePrice,
	handleType,
	handleStock,
}) => {
	return (
		<Modal centered size="lg" show={showModalEditSausages} onHide={handleCloseEdit} animation={true}>
			<Modal.Header closeButton>
				<Modal.Title>Editar dados do produto {productName} </Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container>
					<Row></Row>
					<br />

					<Row>
						<Col md={4}></Col>
					</Row>

					<Row>
						<Col>
							<Form.Label>Nome do Produto</Form.Label>
							<Form.Control
								id="nome"
								required
								defaultValue={productName}
								onChange={handleName}
								type="text"
								placeholder="Nome"
							/>
						</Col>

						<Col>
							<Form.Label>Quantidade por garrafa (em ML) </Form.Label>
							<Form.Control
								required
								onChange={handleQuantity}
								defaultValue={activeItemQuantity}
								id="quantidade"
								type="number"
								min="1"
								placeholder="Quantidade por garrafa"
							/>
						</Col>
					</Row>
					<br />
					<Row>
						<Col>
							<Form.Label> Validade </Form.Label>
							<Form.Control
								required
								onChange={handleValidity}
								defaultValue={activeItemValidity}
								id="validade"
								min="2021"
								type="number"
								placeholder=" Validade"
							/>
						</Col>
						<Col>
							<Form.Label>Data de Colheita </Form.Label>
							<Form.Control
								required
								onChange={handleHarvest}
								defaultValue={activeItemHarvest}
								id="data_colheita"
								max="2021-05-03"
								type="date"
								placeholder="Data de Colheita"
							/>
						</Col>
					</Row>
					<br />
					<Row>
						<Col md={6}>
							<Form.Label>Preço </Form.Label>
							<Form.Control
								required
								onChange={handlePrice}
								defaultValue={activeItemPrice}
								id="preco"
								min="0.01"
								type="number"
								placeholder="Preço"
								step=".01"
							/>
						</Col>
					</Row>
					<br />
					<Row>
						<Col>
							<Form.Label>Tipo de Enchidos e Carne</Form.Label>
							<Form.Control required onChange={handleType} as="select" defaultValue={activeItemType}>
								<option>Presunto</option>
								<option>Almu</option>
								<option>Alheiras</option>
								<option>Bucho</option>
								<option>Salpicão</option>
								<option>Chouriço</option>
								<option>Farinheira</option>
							</Form.Control>
						</Col>
						<Col>
							<Form.Label>Quantidade de Stock </Form.Label>
							<Form.Control
								required
								onChange={handleStock}
								defaultValue={activeItemStock}
								id="stock"
								min="1"
								type="number"
								placeholder="Stock"
							/>
						</Col>
					</Row>
					<br />
					<Row>
						<Col>
							<Form>
								<Form.Group>
									<Form.File
										onChange={handlePhoto}
										id="exampleFormControlFile1"
										label="Inserir foto"
									/>
								</Form.Group>
							</Form>
						</Col>
						<Col>
							<Image height="120" width="80" className="padding_image" src={activeItemPhoto}></Image>
						</Col>
					</Row>
					<Row style={{ marginTop: 20 }}>
						<Button
							type="submit"
							/* onClick={() => handleSubmit(activeItemID)} */
							variant="primary"
							size="lg"
							block
						>
							Alterar
						</Button>
					</Row>
				</Container>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleCloseEdit} variant="secondary">
					Cancelar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
