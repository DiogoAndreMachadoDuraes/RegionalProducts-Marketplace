import { useEffect, useState } from 'react';

export interface HeaderOutput {
	isLogged: boolean;
	name: string;
	type: string;
}

export const useHeaderHelper = (): HeaderOutput => {
	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		try {
			let nameStoraged = localStorage.getItem('name');
			let typeStoraged = localStorage.getItem('type');

			if (nameStoraged !== null && typeStoraged != null) {
				setIsLogged(true);
				setIsLoading(true);
				setName(nameStoraged);
				setType(typeStoraged);
			}
		} catch (e) {
			console.log('Error rending data: ' + e);
			setIsLoading(true);
		}
	}, [name, isLoading, type]);

	return { isLogged, name, type };
};
