import { Favorites, FavoritesAction, FavoritesActions } from './types';

export const favoritesList = (favorite: Favorites) => {
	const action: FavoritesAction = {
		type: FavoritesActions.FAVORITES_LIST,
		favorite,
	};

	return action;
};
