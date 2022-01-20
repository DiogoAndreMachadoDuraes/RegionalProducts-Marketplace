export enum ProducerActions {
	PRODUCER_INFO = 'PRODUCER_INFO',
}

export interface Producer {
	id?: string;
	address?: string;
	birthday?: string;
	country?: string;
	email?: string;
	location?: string;
	name?: string;
	logo?: string;
	postal_code?: string;
	state?: string;
	telephone?: string;
	tin?: number;
	social_network?:string;
}

export type ProducerState = {
	producer:Producer;
};

export type ProducerAction = {
	type: string;
	producer?:Producer;
};

export type DispatchTypeProducer = (args: ProducerAction) => ProducerAction;
