import React from 'react';
import { Navbar } from 'react-bootstrap';
import { HeaderAdmin } from './headerDown.admin';
import { HeaderClient } from './headerDown.client';
import { HeaderDefault } from './headerDown.default';
import { HeaderProducer } from './headerDown.producer';

interface HeaderDownProps {
	isLogged?: boolean;
	type?: string;
}

export const HeaderDown: React.FC<HeaderDownProps> = ({ isLogged, type }) => {
	return (
		<Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#9B3939', height: '40px' }}>
			{isLogged && type === 'client' && <HeaderClient />}
			{isLogged && type === 'admin' && <HeaderAdmin />}
			{isLogged && type === 'producer' && <HeaderProducer />}
			{isLogged === false && <HeaderDefault />}
		</Navbar>
	);
};
