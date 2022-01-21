import { ProducerActions, ProducerAction, Producer } from './types';


export const producerInfo = (producer: Producer) => {
	const action: ProducerAction = {
		type: ProducerActions.PRODUCER_INFO,
		producer,
	};

	return action;
};
