import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { SupportPanel } from 'ui';

export const FrequentTask: React.FC = () => {
	return (
		<Container fluid>
			<Row style={{ marginLeft: 20 }}>
				<Col sm={2}>
					<SupportPanel onFrequentTask />
				</Col>
				<Col sm={1} />
				<Col sm={8}>
					<h3 style={{ marginTop: 20 , color:'#8A3535', fontFamily:'Artifika'}}>
						<br />
						Perguntas Frequentes
					</h3>
					<br />
          <h6>Como o mel deve ser conservado em casa?</h6>
					<p style={{ textAlign: 'justify',  fontFamily:'Artifika'  }}>           Armazenar mel é um processo bem simples. Para mantê-lo, tudo o que você precisa fazer é encontrar um recipiente adequado e, depois, manter esse recipiente em um local fresco e seco. Se quiser armazenar o mel para um uso em longo prazo, você pode até mesmo deixá-lo no freezer e descongelar mais tarde.
</p>
				
					<br />

					<h6>Quero um enchido ou queijo diferente será podem arranjar?</h6>
					<p style={{ textAlign: 'justify', fontFamily:'Artifika' }}>
						Podemos de qualquer forma obter o teu desejo desde que tenhamos tempo para o fazer. Mesmo que
						não o vejas no nosso website podes entrar em contacto connosco para podermos procurar por ti e
						oferecer-te o melhor preço possível.
					</p>
					<br />

					<h6>Devo levar em conta a data de validade da tampa mesmo após a abertura do produto, como o caso da geleia?</h6>
					<p style={{ textAlign: 'justify', fontFamily:'Artifika' }}>
					Não. A data de validade da tampa deve ser levada em conta apenas se a sua geleia, por exemplo, estiver fechada e sem qualquer sinal de violação. Se manuseadas corretamente, as geleias das linhas Classic e Gourmet duram até 30 dias na geladeira após a abertura. Por não conterem adição de açúcar, que age como um conservante natural, as geleias das linhas Diet e Wellness duram até 10 dias na geladeira após abertas.
					</p>
					<br />

					<h6>Como posso receber a minha encomenda?</h6>
					<p style={{ textAlign: 'justify', fontFamily:'Artifika' }}>
						Através do envio de uma transportadora a designar no dia da expedição.
					</p>
					<br />
				
				</Col>
				<Col sm={1} />
			</Row>
		</Container>
	);
};
