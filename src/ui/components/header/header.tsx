import React from 'react';
import { HeaderTop } from './headerTop';
import { HeaderDown } from './headerDown';
import { useHeaderHelper } from './header.helper';

export const Header: React.FC = () => {
	const { isLogged, name, type } = useHeaderHelper();

	return (
		<>
			<HeaderTop isLogged={isLogged} name={name} type={type} />
			<HeaderDown isLogged={isLogged} type={type} />
		</>
	);
};
