import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

/* interface Producer {
	email?: string;
	password?: string;
	country?: string;
	location?: string;
	name?: string;
	postal_code?: string;
	state?: string;
	street?: string;
	telephone?: string;
	tin?: string;
	logo?: string;
	social?: string;
} */

interface ProducerRegisterOutPut {
	handleName: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleTin: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleTelephone: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleStreet: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handlePostalCode: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleLocation: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSocial: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleRegion: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleCountry: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleLogo: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handlePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isPasswordShown: boolean;
	togglePasswordVisiblity: () => void;
	show: boolean;
	handleClose: () => void;
	name: string;
	handleLogin: () => void;
	handleSubmit: () => void;
}

export const useProducerRegister = (): ProducerRegisterOutPut => {
	const history = useHistory();
	const [show, setShow] = useState(false);
	/* const [producer, setProducer] = useState<Producer>(); */
	const [isPasswordShown, setIsPasswordShown] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [region, setRegion] = useState('');
	const [country, setCountry] = useState('');
	const [location, setLocation] = useState('');
	const [name, setName] = useState('');
	const [postal_code, setPostal_Code] = useState('');
	const [state /* , setState */] = useState('Ativo');
	const [street, setStreet] = useState('');
	const [telephone, setTelephone] = useState('');
	const [tin, setTin] = useState('');
	const [social, setSocial] = useState('');
	const [logo, setLogo] = useState('');

	const togglePasswordVisiblity = () => {
		setIsPasswordShown(!isPasswordShown);
	};

	const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSocial = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSocial(e.target.value);
	};

	const handleRegion = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegion(e.target.value);
	};

	const handleCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCountry(e.target.value);
	};

	const handleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocation(e.target.value);
	};

	const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handlePostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPostal_Code(e.target.value);
	};

	const handleStreet = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStreet(e.target.value);
	};

	const handleTelephone = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTelephone(e.target.value);
	};

	const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLogo(e.target.value);
	};

	const handleTin = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTin(e.target.value);
	};

	const handleLogin = () => {
		history.push('/login');
	};

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = () => {
		console.log(
			logo,
			email,
			tin,
			password,
			country,
			location,
			name,
			postal_code,
			region,
			social,
			state,
			street,
			telephone,
			show
		);
		handleShow();
		axios.post('http://127.0.0.1:5000/producerregister', {
			logo: logo,
			email: email,
			tin: tin,
			password: password,
			country: country,
			location: location,
			name: name,
			postal_code: postal_code,
			region: region,
			social_network: social,
			state: state,
			address: street,
			telephone: telephone,
		});
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	};

	return {
		handleName,
		handleTin,
		handleTelephone,
		handleStreet,
		handlePostalCode,
		handleLocation,
		handleSocial,
		handleRegion,
		handleCountry,
		handleLogo,
		handleEmail,
		handlePassword,
		isPasswordShown,
		togglePasswordVisiblity,
		show,
		handleClose,
		name,
		handleLogin,
		handleSubmit,
	};
};
