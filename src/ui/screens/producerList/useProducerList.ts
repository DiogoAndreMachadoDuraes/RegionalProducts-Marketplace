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
	social: string;
	state: string;
	address: string;
	telephone: string;
	tin: string;
}

interface ProducerListOutPut {
	isLogged?: boolean;
	isLoading: boolean;
	type?: string;
	showToastEdit: boolean;
	handleNotShowToastEdit: () => void;
	showToastDelete: boolean;
	handleNotShowToastDelete: () => void;
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
	const [showToastEdit, setShowToastEdit] = useState(false);
	const [showToastDelete, setShowToastDelete] = useState(false);
	const [showModalEdit, setShowModalEdit] = useState(false);
	const [showModalDelete, setShowModalDelete] = useState(false);
	const [searched, setSearched] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [producerId, setProducerId] = useState('');
	const [producerState, setProducerState] = useState('');
	const [producerName, setProducerName] = useState('');
	const [producerEmail, setProducerEmail] = useState('');
	const [producerPassword, setProducerPassword] = useState('');
	const [producerCountry, setProducerCountry] = useState('');
	const [producerlocation, setProducerlocation] = useState('');
	const [producerPostalCode, setProducerPostalCode] = useState('');
	const [producerSocial, setProducerSocial] = useState('');
	const [producerLogo, setProducerLogo] = useState('');
	const [produceraddress, setProduceraddress] = useState('');
	const [producerTin, setProducerTin] = useState('');
	const [producerTelephone, setProducerTelephone] = useState('');

	const [isLoading, setIsLoading] = useState(false);

	const type = useSelector((state: StoreState) => state.common.user.type);
	const isLogged = useSelector((state: StoreState) => state.common.user.isLogged);

	const token = useSelector((state: StoreState) => state.common.user.token);


	const handleCloseEdit = () => {
		setShowToastEdit(true);
		setShowModalEdit(false);
	};

	const handleShowEdit = (item: Producer) => {
		setProducerId(item._id.$oid);
		setProducerState(item.state);
		setProducerName(item.name);
		setProducerEmail(item.email);
		setProducerPassword(item.password);
		setProducerCountry(item.country);
		setProducerlocation(item.location);
		setProducerPostalCode(item.postal_code);
		setProducerSocial(item.social);
		setProducerLogo(item.logo);
		setProduceraddress(item.address);
		setProducerTin(item.tin);
		setProducerTelephone(item.telephone);
		setShowModalEdit(true);
	};

	const handleCloseDelete = () => {
		setShowModalDelete(false);
		setShowToastDelete(true);
	};

	const handleShowDelete = (item: Producer) => {
		setProducerId(item._id.$oid);
		setProducerName(item.name);
		setShowModalDelete(true);
	};

	const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProducerState(e.target.value);
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
					logo: producerLogo,
					email: producerEmail,
					password: producerPassword,
					country: producerCountry,
					location: producerlocation,
					name: producerName,
					postal_code: producerPostalCode,
					social: producerSocial,
					state: producerState,
					address: produceraddress,
					telephone: producerTelephone,
					tin: producerTin,
				}),
			});
			handleCloseEdit();
			alert('Estado editado com sucesso!');
		} catch (e) {
			console.log('Error to Edit Producer: ' + e);
		}
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
			alert('Produtor eliminado com sucesso!');
			window.location.reload();
		} catch (e) {
			console.log('Error to Delete Producer: ' + e);
		}
	};

	const editSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleNotShowToastEdit = () => {
		setShowToastEdit(false);
	};

	const handleNotShowToastDelete = () => {
		setShowToastDelete(false);
	};

	useEffect(() => {
		const fetchApi = async () => {
			if (producer === undefined || isLoading) {
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
			}
		};
		fetchApi();
	}, [producer, isLoading, token]);


	return {
		isLogged,
		isLoading,
		type,
		showToastEdit,
		handleNotShowToastEdit,
		showToastDelete,
		handleNotShowToastDelete,
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
