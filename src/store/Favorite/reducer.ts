import { FavoritesAction, FavoritesActions, FavoritesState } from './types';

export const favoritesInitialState: FavoritesState = {
	favorites: [],
};

export const favoritesReducer = (
	state: FavoritesState = favoritesInitialState,
	action: FavoritesAction
): FavoritesState => {
	switch (action.type) {
		case FavoritesActions.FAVORITES_LIST: {
			return {
				...state,
				favorites: [...state.favorites, action.favorite],
			};
		}
		default:
			return state;
	}
};
