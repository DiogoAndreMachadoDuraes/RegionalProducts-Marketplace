import { OrderAction, OrderActions, OrderState } from './types';

export const orderInitialState: OrderState = {
	orders: [],
};

export const orderReducer = (state: OrderState = orderInitialState, action: OrderAction): OrderState => {
	switch (action.type) {
		case OrderActions.ORDER_LIST: {
			return {
				...state,
				orders: [...state.orders, action.order],
			};
		}
		default:
			return state;
	}
};
