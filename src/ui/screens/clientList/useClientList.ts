import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';
import axios from 'axios';

export interface Client {
	_id: { $oid: string };
	name: string;
	state: string;
	tin: string;
	birthday: string;
	telephone: string;
	address: string;
	postal_code: string;
	location: string;
	country: string;
	email: string;
	password: string;
	photo: string;
}

interface ClientListOutPut {
	isLogged?: boolean;
	isLoading: boolean;
	type?: string;
	showEdit: boolean;
	showDelete: boolean;
	client?: Client[];
	editSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
	searchTerm: string;
	showModalEdit: boolean;
	handleCloseEdit: () => void;
	handleShowEdit: (item: Client) => void;
	showModalDelete: boolean;
	handleCloseDelete: () => void;
	clientName: string;
	handleType: (e: React.ChangeEvent<HTMLInputElement>) => void;
	clientState: string;
	handleEdit: () => void;
	handleDelete: () => void;
	handleShowDelete: (item: Client) => void;
}

export const useClientList = (): ClientListOutPut => {
	const [client, setClient] = useState<Client[]>();
	const [showModalEdit, setShowModalEdit] = useState(false);
	const [showModalDelete, setShowModalDelete] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [clientName, setClientName] = useState('');
	const [clientId, setClientId] = useState('');
	const [clientState, setClientState] = useState('');
	const [showEdit, setShowEdit] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [clientTin, setClientTin] = useState('');
	const [clientBirthday, setClientBirthday] = useState('');
	const [clientTelephone, setClientTelephone] = useState('');
	const [clientAddress, setClientAddress] = useState('');
	const [clientPostalCode, setClientPostalCode] = useState('');
	const [clientLocation, setClientLocation] = useState('');
	const [clientCountry, setClientCountry] = useState('');
	const [clientEmail, setClientEmail] = useState('');
	const [clientPassword, setClientPassword] = useState('');
	const [clientPhoto, setClientPhoto] = useState('');
	const [refreshKey, setRefreshKey] = useState(0);

	const token = useSelector((state: StoreState) => state.common.user.token);
	const type = useSelector((state: StoreState) => state.common.user.type);
	const isLogged = useSelector((state: StoreState) => state.common.user.isLogged);

	const config = {
		headers: {
			Authorization: 'Bearer ' + token,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	};

	useEffect(() => {
		axios.get(`http://127.0.0.1:5000/clients`, config).then((res) => {
			const client = res.data;
			setClient(client);
			setIsLoading(true);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refreshKey]);

	const handleShowEdit = (item: Client) => {
		setClientId(item._id.$oid);
		setClientName(item.name);
		setClientState(item.state);
		setClientTin(item.tin);
		setClientBirthday(item.birthday);
		setClientTelephone(item.telephone);
		setClientAddress(item.address);
		setClientPostalCode(item.postal_code);
		setClientLocation(item.location);
		setClientCountry(item.country);
		setClientEmail(item.email);
		setClientPassword(item.password);
		setClientPhoto(item.photo);
		setShowModalEdit(true);
	};

	const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
		setClientState(e.target.value);
	};

	const handleShowDelete = (item: Client) => {
		setClientId(item._id.$oid);
		setClientName(item.name);
		setShowModalDelete(true);
	};

	const handleCloseEdit = () => {
		setShowModalEdit(false);
	};

	const handleCloseDelete = () => {
		setShowModalDelete(false);
	};

	const showAlertEdit = () => {
		window.setTimeout(() => {
			setShowEdit(false);
		}, 5000);
	};

	const showAlertDelete = () => {
		window.setTimeout(() => {
			setShowDelete(false);
		}, 5000);
	};

	const handleEdit = async () => {
		try {
			await fetch('http://127.0.0.1:5000/client', {
				method: 'PUT',
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: clientId,
					tin: clientTin,
					name: clientName,
					birthday: clientBirthday,
					telephone: clientTelephone,
					address: clientAddress,
					postal_code: clientPostalCode,
					location: clientLocation,
					country: clientCountry,
					email: clientEmail,
					password: clientPassword,
					state: clientState,
					photo: clientPhoto,
				}),
			});
			handleCloseEdit();
			setShowEdit(true);
			console.log(showEdit);
			showAlertEdit();
			setRefreshKey(refreshKey + 1);
		} catch (e) {
			console.log('Error to Edit Client Status: ' + e);
		}
	};

	const handleDelete = async () => {
		try {
			await fetch('http://127.0.0.1:5000/client', {
				method: 'DELETE',
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: clientId,
				}),
			});
			handleCloseDelete();
			setShowDelete(true);
			showAlertDelete();
			setRefreshKey(refreshKey + 1);
		} catch (e) {
			console.log('Error to Delete Client: ' + e);
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
		client,
		editSearch,
		searchTerm,
		showModalEdit,
		handleCloseEdit,
		handleShowEdit,
		showModalDelete,
		handleCloseDelete,
		clientName,
		handleType,
		clientState,
		handleEdit,
		handleDelete,
		handleShowDelete,
	};
};
