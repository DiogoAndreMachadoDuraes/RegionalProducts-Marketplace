import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';

export interface Product {
	id: {
		$oid: string;
	};
	name: string;
	type: string;
	quantity: string;
	validity: string;
	harvest: string;
	category: string;
	price: string;
	photo: string;
	stock: string;
	id_producer: string;
	logo_producer: string;
	name_producer: string;
	state: string;
}

interface ProductListProducerOutPut {
	isLogged?: boolean;
	isLoading: boolean;
	type?: string;
	showToastEdit: boolean;
	handleNotShowToastEdit: () => void;
	showToastDelete: boolean;
	handleNotShowToastDelete: () => void;
	product?: Product[];
	editSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
	searchTerm: string;
	showModalEdit: boolean;
	handleCloseEdit: () => void;
	handleShowEdit: (item: Product) => void;
	showModalDelete: boolean;
	handleCloseDelete: () => void;
	productName: string;
	handleType: (e: React.ChangeEvent<HTMLInputElement>) => void;
	productState: string;
	handleEdit: () => void;
	handleDelete: () => void;
	handleShowDelete: (item: Product) => void;
}

export const useProductListProducer = (): ProductListProducerOutPut => {
	const [product, setProduct] = useState<Product[]>();

	const userId = useSelector((state: StoreState) => state.common.user.id);
	const token = useSelector((state: StoreState) => state.common.user.token);
	const products = useSelector((state: StoreState) => state.products.products);
	const type = useSelector((state: StoreState) => state.common.user.type);
	const isLogged = useSelector((state: StoreState) => state.common.user.isLogged);

	const [showModalEditHoney, setShowModalEditHoney] = useState(false);
	const [showmodalEditJam, setShowmodalEditJam] = useState(false);
	const [ShowModalEditFruit, setShowModalEditFruit] = useState(false);
	const [showmodalEditSausages, setShowmodalEditSausages] = useState(false);
	const [showToastEdit, setShowToastEdit] = useState(false);
	const [showToastDelete, setShowToastDelete] = useState(false);
	const [showModalEdit, setShowModalEdit] = useState(false);
	const [showModalDelete, setShowModalDelete] = useState(false);
	const [searched, setSearched] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [productName, setProductName] = useState('');
	const [activeItemID, setActiveItemID] = useState('');
	const [activeItemQuantity, setActiveItemQuantity] = useState('');
	const [activeItemValidity, setActiveItemValidity] = useState('');
	const [activeItemCategory, setActiveItemCategory] = useState('');
	const [activeItemPhoto, setActiveItemPhoto] = useState('');
	const [activeItemHarvest, setActiveItemHarvest] = useState('');
	const [activeItemPrice, setActiveItemPrice] = useState('');
	const [activeItemType, setActiveItemType] = useState('');
	const [activeItemStock, setActiveItemStock] = useState('');
	const [activeItemname_producer, setActiveItemname_producer] = useState('');
	const [activeItemlogo_producer, setActiveItemlogo_producer] = useState('');
	const [activeItemid_producer, setActiveItemid_producer] = useState('');
	const [productState, setProductState] = useState('');

	const [categoryfilter, setCategoryfilter] = useState('');

	const config = {
		headers: {
			Authorization: 'Bearer ' + token,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	};

	useEffect(() => {
		if (product === undefined || isLoading === false) {
			axios.get(`http://127.0.0.1:5000/products/producer/` + userId, config).then((res) => {
				const product = res.data;
				setProduct(product.products);
				setIsLoading(true);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleShowEdit = (item: Product) => {
		setProductName(item.name);
		setActiveItemID(item.id.$oid);
		setActiveItemQuantity(item.quantity);
		setActiveItemValidity(item.validity);
		setActiveItemCategory(item.category);
		setActiveItemPhoto(item.photo);
		setActiveItemHarvest(item.harvest);
		setActiveItemPrice(item.price);
		setActiveItemType(item.type);
		setActiveItemStock(item.stock);
		setActiveItemname_producer(item.name_producer);
		setActiveItemlogo_producer(item.logo_producer);
		setActiveItemid_producer(item.id_producer);
		setProductState(item.state);

		if (activeItemCategory === 'Mel') {
			setShowModalEditHoney(true);
		}

		if (activeItemCategory === 'Compotas') {
			setShowmodalEditJam(true);
		}

		if (activeItemCategory === 'Frutos Secos') {
			setShowModalEditFruit(true);
		}
		if (activeItemCategory === 'Enchidos e Carne') {
			setShowmodalEditSausages(true);
		}
	};

	const handleCloseEdit = () => {
		setShowToastEdit(true);
		setShowModalEdit(false);
		setShowModalEditHoney(false);
		setShowModalEditFruit(false);
		setShowmodalEditJam(false);
		setShowModalDelete(false);
	};

	const handleShowDelete = (item: Product) => {
		setActiveItemID(item.id.$oid);
		setProductName(item.name);
		setShowModalDelete(true);
	};

	const handleCategoryFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === 'Todos os Produtos') {
			setCategoryfilter('Todos');
		}

		if (e.target.value === 'Todo o Mel') {
			setCategoryfilter('Mel');
		}
		if (e.target.value === 'Todas as Compotas') {
			setCategoryfilter('Compotas');
		}
		if (e.target.value === 'Todos os Frutos Secos') {
			setCategoryfilter('Frutos Secos');
		}
		if (e.target.value === 'Todos os Enchidos e Carnes') {
			setCategoryfilter('Enchidos e Carne');
		}
	};

	const getByCategory = (category: string, id: string) => {
		if (category === 'Todos') {
			axios.get(`http://127.0.0.1:5000/products/producer/${userId}`, config).then((res) => {
				const product = res.data;
				setProduct(product);
			});
		} else {
			if (
				category === 'Mel' ||
				category === 'Compotas' ||
				category === 'Frutos Secos' ||
				category === 'Enchidos e Carne'
			) {
				axios.get(`http://127.0.0.1:5000/products/${userId}/Category/${category}`, config).then((res) => {
					const product = res.data;
					setProduct(product);
				});
			} else {
				axios.get(`http://127.0.0.1:5000/products/${userId}/${category}`, config).then((res) => {
					const product = res.data;
					setProduct(product);
				});
			}
		}
	};

	const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProductName(e.target.value);
	};

	const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActiveItemType(e.target.value);
	};

	const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActiveItemQuantity(e.target.value);
	};

	const handleValidity = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActiveItemValidity(e.target.value);
	};

	const handleHarvest = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActiveItemHarvest(e.target.value);
	};

	const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActiveItemCategory(e.target.value);
	};

	const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActiveItemPrice(e.target.value);
	};

	const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setActiveItemPhoto(URL.createObjectURL(e.target.files[0]));
		}
	};

	const handleStock = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActiveItemStock(e.target.value);
	};

	const handleEdit = async () => {
		try {
			await fetch('http://127.0.0.1:5000/product', {
				method: 'PUT',
				headers: {
					Authorization: 'Bearer ' + token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: activeItemID,
					name: productName,
					type: activeItemType,
					quantity: activeItemQuantity,
					validity: activeItemValidity,
					harvest: activeItemHarvest,
					category: activeItemCategory,
					price: activeItemPrice,
					photo: activeItemPhoto,
					stock: activeItemStock,
					id_producer: activeItemid_producer,
					logo_producer: activeItemlogo_producer,
					name_producer: activeItemname_producer,
					state: productState,
				}),
			});
			handleCloseEdit();
			alert('Produto modificado com sucesso!');
		} catch (e) {
			console.log('Error to Edit Product Status: ' + e);
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
					_id: activeItemID,
				}),
			});
			handleCloseDelete();
			alert('Cliente eliminado com sucesso!');
		} catch (e) {
			console.log('Error to Delete Client: ' + e);
		}
	};

	const handleSubmit = (id: string) => {
		handleCloseEdit();
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		axios
			.put(
				`http://127.0.0.1:5000/products/${id}`,
				{
					name: productName,
					type: activeItemType,
					quantity: activeItemQuantity,
					validity: activeItemValidity,
					harvest: activeItemHarvest,
					category: activeItemCategory,
					price: activeItemPrice,
					photo: activeItemPhoto,
					stock: activeItemStock,
					id_producer: activeItemid_producer,
					logo_producer: activeItemlogo_producer,
					name_producer: activeItemname_producer,
					state: productState,
				},
				config
			)
			.then((res) => {
				console.log(res);
				console.log(res.data);
			});
	};

	const handleCloseDelete = () => {
		setShowModalDelete(false);
		setShowToastDelete(true);
	};

	const handleNotShowToastEdit = () => {
		setShowToastEdit(false);
	};

	const handleNotShowToastDelete = () => {
		setShowToastDelete(false);
	};

	const editSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	return {
		isLogged,
		isLoading,
		type,
		showToastEdit,
		handleNotShowToastEdit,
		showToastDelete,
		handleNotShowToastDelete,
		product,
		editSearch,
		searchTerm,
		showModalEdit,
		handleCloseEdit,
		handleShowEdit,
		showModalDelete,
		handleCloseDelete,
		productName,
		handleType,
		productState,
		handleEdit,
		handleDelete,
		handleShowDelete,
	};
};
