export enum FavoritesActions {
	FAVORITES_LIST = 'FAVORITES_LIST',
}

export interface Favorites {
	_id: {
		$oid: string;
	};
	id: string;
	date: string;
	hour: string;
	id_client: string;
	id_product: number;
	name_product: string;
	photo_product: string;
	price_product: string;
	quantity_product: string;
}

export type FavoritesState = {
	favorites: Favorites[];
};

export type FavoritesAction = {
	type: string;
	favorite: Favorites;
};

export type DispatchTypeFavorites = (args: FavoritesAction) => FavoritesAction;
