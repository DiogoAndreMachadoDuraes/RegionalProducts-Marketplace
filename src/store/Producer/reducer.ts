import { Producer, ProducerAction, ProducerActions, ProducerState } from './types';

export const producerInitialState: ProducerState = {
	producer: {
	id: '',
	address: '',
	birthday: '',
	country: '',
	email: '',
	location: '',
	name: '',
	logo: '',
	postal_code: '',
	state: '',
	telephone: '',
	tin: 0,
	social_network:'',
	},
};

export const producerReducer = (state: ProducerState = producerInitialState, action: ProducerAction): ProducerState => {
	switch (action.type) {
		case ProducerActions.PRODUCER_INFO: {
			const producer: Producer = {
				id: action.producer?.id,
				address: action.producer?.address,
				birthday: action.producer?.birthday,
				country: action.producer?.country,
				email: action.producer?.email,
				location: action.producer?.location,
				name: action.producer?.name,
			logo: action.producer?.logo,
				postal_code: action.producer?.postal_code,
				state: action.producer?.state,
				telephone: action.producer?.telephone,
				tin: action.producer?.tin,
				social_network: action.producer?.social_network,
			};
			return {
				...state,
				producer,
			};
		}
		default:
			return state;
	}
};
