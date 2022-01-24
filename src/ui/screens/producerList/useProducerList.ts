import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';

export interface Producer {
	_id: { $oid: string };
	logo: string;
	email: string;
	password: string;
	country: string;
	location: string;
	name: string;
	postal_code: string;
	social_network: string;
	region: string;
	state: string;
	address: string;
	telephone: string;
	tin: string;
}

interface ProducerListOutPut {
	isLogged?: boolean;
	isLoading: boolean;
	type?: string;
	showEdit: boolean;
	showDelete: boolean;
	producer?: Producer[];
	editSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
	searchTerm: string;
	showModalEdit: boolean;
	handleCloseEdit: () => void;
	handleShowEdit: (item: Producer) => void;
	showModalDelete: boolean;
	handleCloseDelete: () => void;
	producerName: string;
	handleType: (e: React.ChangeEvent<HTMLInputElement>) => void;
	producerState: string;
	handleEdit: () => void;
	handleDelete: () => void;
	handleShowDelete: (item: Producer) => void;
}

export const useProducerList = (): ProducerListOutPut => {
	const [producer, setProducer] = useState<Producer[]>();
	const [showEdit, setShowEdit] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [showModalEdit, setShowModalEdit] = useState(false);
	const [showModalDelete, setShowModalDelete] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	const [producerId, setProducerId] = useState('');
	const [producerState, setProducerState] = useState('');
	const [producerName, setProducerName] = useState('');
	const [producerEmail, setProducerEmail] = useState('');
	const [producerPassword, setProducerPassword] = useState('');
	const [producerCountry, setProducerCountry] = useState('');
	const [producerLocation, setProducerLocation] = useState('');
	const [producerPostalCode, setProducerPostalCode] = useState('');
	const [producerSocial, setProducerSocial] = useState('');
	const [producerLogo, setProducerLogo] = useState('');
	const [producerAddress, setProducerAddress] = useState('');
	const [producerTin, setProducerTin] = useState('');
	const [producerTelephone, setProducerTelephone] = useState('');
	const [producerRegion, setProducerRegion] = useState('');
	const [refreshKey, setRefreshKey] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const type = useSelector((state: StoreState) => state.common.user.type);
	const isLogged = useSelector((state: StoreState) => state.common.user.isLogged);
	const token = useSelector((state: StoreState) => state.common.user.token);

	useEffect(() => {
		const fetchApi = async () => {
			try {
				let response = await fetch('http://127.0.0.1:5000/producers', {
					headers: {
						Authorization: 'Bearer ' + token,
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				});
				let json = await response.json();
				setProducer(json);
				setIsLoading(true);
			} catch (e) {
				console.log('Error to get data: ' + e);
			}
		};
		fetchApi();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refreshKey]);

	const handleShowEdit = (item: Producer) => {
		setProducerId(item._id.$oid);
		setProducerState(item.state);
		setProducerName(item.name);
		setProducerEmail(item.email);
		setProducerPassword(item.password);
		setProducerCountry(item.country);
		setProducerLocation(item.location);
		setProducerPostalCode(item.postal_code);
		setProducerRegion(item.region);
		setProducerSocial(item.social_network);
		setProducerLogo(item.logo);
		setProducerAddress(item.address);
		setProducerTin(item.tin);
		setProducerTelephone(item.telephone);
		setShowModalEdit(true);
	};

	const handleCloseEdit = () => {
		setShowModalEdit(false);
	};

	const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProducerState(e.target.value);
	};

	const showAlertEdit = () => {
		window.setTimeout(() => {
			setShowDelete(false);
		}, 5000);
	};

	const handleEdit = async () => {
		try {
			await fetch('http://127.0.0.1:5000/producer', {
				method: 'PUT',
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: producerId,
					address: producerAddress,
					country: producerCountry,
					email: producerEmail,
					location: producerLocation,
					logo: producerLogo,
					name: producerName,
					postal_code: producerPostalCode,
					region: producerRegion,
					social_network: producerSocial,
					state: producerState,
					telephone: producerTelephone,
					password: producerPassword,
					tin: producerTin,
				}),
			});
			handleCloseEdit();
			setShowEdit(true);
			console.log(showEdit);
			showAlertEdit();
			setRefreshKey(refreshKey + 1);
		} catch (e) {
			console.log('Error to Edit Producer: ' + e);
		}
	};

	const handleCloseDelete = () => {
		setShowModalDelete(false);
	};

	const handleShowDelete = (item: Producer) => {
		setProducerId(item._id.$oid);
		setProducerName(item.name);
		setShowModalDelete(true);
	};

	const showAlertDelete = () => {
		window.setTimeout(() => {
			setShowDelete(false);
		}, 5000);
	};

	const handleDelete = async () => {
		try {
			await fetch('http://127.0.0.1:5000/producer', {
				method: 'DELETE',
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: producerId,
				}),
			});
			handleCloseDelete();
			setShowDelete(true);
			showAlertDelete();
			setRefreshKey(refreshKey + 1);
		} catch (e) {
			console.log('Error to Delete Producer: ' + e);
		}
	};

	const editSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	return {
		isLogged,
		isLoading,
		type,
		showEdit,
		showDelete,
		producer,
		editSearch,
		searchTerm,
		showModalEdit,
		handleCloseEdit,
		handleShowEdit,
		showModalDelete,
		handleCloseDelete,
		producerName,
		handleType,
		producerState,
		handleEdit,
		handleDelete,
		handleShowDelete,
	};
};
