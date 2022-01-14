import { StoreState } from 'store';
import { useSelector } from 'react-redux';

export interface HeaderOutput {
	isLogged: boolean;
	name: string;
	type: string;
}

export const useHeaderHelper = (): HeaderOutput => {
	const isLogged = useSelector((state: StoreState) => state.common.user.isLogged);
	const name = useSelector((state: StoreState) => state.common.user.name);
	const type = useSelector((state: StoreState) => state.common.user.type);

	return { isLogged, name, type };
};
