import { Order, OrderAction, OrderActions } from './types';

export const orderList = (order: Order) => {
	const action: OrderAction = {
		type: OrderActions.ORDER_LIST,
		order,
	};

	return action;
};
