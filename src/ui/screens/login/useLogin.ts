import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userInfo, userLogin } from 'store/User';
import axios from 'axios';
import { Order, orderList, producerInfo, adminInfo } from 'store';

interface LoginOutPut {
	email?: string;
	password?: string;
	isShowedPassword: boolean;
	show: boolean;
	isValidEmail: boolean;
	isValidPassword: boolean;
	isInvalidCredentials: boolean;
	handleEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleCheckEmail: () => void;
	changeShowedPassword: () => void;
	handlePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleCheckPassword: () => void;
	login: () => void;
	handleShow: () => void;
	handleClose: () => void;
}

export const useLogin = (): LoginOutPut => {
	const [email, setEmail] = useState<string | undefined>(undefined);
	const [password, setPassword] = useState<string | undefined>(undefined);
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [isValidPassword, setIsValidPassword] = useState(true);
	const [isShowedPassword, setIsShowedPassword] = useState(false);
	const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
	const [show, setShow] = useState(false);
	const history = useHistory();

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleCheckEmail = () => {
		const expression = /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)$/;
		var validEmail = expression.test(String(email).toLowerCase());

		if (!validEmail) {
			setIsValidEmail(false);
		} else {
			setIsValidEmail(true);
		}
	};

	const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleCheckPassword = () => {
		if (password !== undefined && password.length < 8) {
			setIsValidPassword(false);
		} else {
			setIsValidPassword(true);
		}
	};

	const changeShowedPassword = () => {
		setIsShowedPassword(!isShowedPassword);
	};

	const dispatch = useDispatch();

	const showInvalidAlert = () => {
		window.setTimeout(() => {
			setIsInvalidCredentials(false);
		}, 5000);
	};

	const login = async () => {
		try {
			let response = await fetch('http://127.0.0.1:5000/auth', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			});
			let json = await response.json();
			const type: string = json.type;
			const token: string = json.token;
			const userId: string = json.id;

			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};

			try {
				await axios.get(`http://127.0.0.1:5000/shop/client/${userId}`, config).then((res) => {
					const order = res.data.shops;
					order.forEach((element: Order) => {
						dispatch(orderList(element));
					});
				});
			} catch (e) {
				console.log('Error to get Orders: ' + e);
			}

			try {
				await axios.get(`http://127.0.0.1:5000/client/${userId}`, config).then((res) => {
					const client = res.data;
					dispatch(userInfo(client));
				});
			} catch (e) {
				console.log('Error to get Favorites: ' + e);
			}

			if (type === 'client') {
				try {
					await axios.get(`http://127.0.0.1:5000/client/${userId}`, config).then((res) => {
						const client = res.data;
						dispatch(userInfo(client));
					});
				} catch (e) {
					console.log('Error to get Client: ' + e);
				}
				dispatch(userLogin(json));
				history.push('/');
			} else {
				if (type === 'admin') {
					try {
						await axios.get(`http://127.0.0.1:5000/admin/` + userId, config).then((res) => {
							const admin = res.data;
							console.log(admin);
							dispatch(adminInfo(admin));
						});
					} catch (e) {
						console.log('Error to get Admin: ' + e);
					}
					dispatch(userLogin(json));
					history.push('/dashboardAdmin');
				} else {
					if (type === 'producer') {
						try {
							await axios.get(`http://127.0.0.1:5000/producer/${userId}`, config).then((res) => {
								const producer = res.data;
								dispatch(producerInfo(producer));
							});
						} catch (e) {
							console.log('Error to get Producer: ' + e);
						}
						dispatch(userLogin(json));
						history.push('/dashboardProducer');
					} else {
						setIsInvalidCredentials(true);
						showInvalidAlert();
					}
				}
			}
		} catch (e) {
			console.log('Error to Authenticate: ' + e);
		}
	};

	return {
		handleEmail,
		email,
		isValidEmail,
		handleCheckEmail,
		password,
		handlePassword,
		handleCheckPassword,
		isShowedPassword,
		isValidPassword,
		changeShowedPassword,
		login,
		handleShow,
		show,
		handleClose,
		isInvalidCredentials,
	};
};
