import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
interface ProducerRegisterOutPut {
	show: boolean;
	name: string;
	password: string;
	confirmPassword: string;
	isPasswordShown: boolean;
	checkbox: boolean;
	togglePasswordVisiblity: () => void;
	handleClose: () => void;
	handleLogin: () => void;
	handleSubmit: () => void;
	handleChangeCheckbox: () => void;
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
	handleConfirmPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useProducerRegister = (): ProducerRegisterOutPut => {
	const history = useHistory();
	const [show, setShow] = useState(false);
	const [isPasswordShown, setIsPasswordShown] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [region, setRegion] = useState('');
	const [country, setCountry] = useState('');
	const [location, setLocation] = useState('');
	const [name, setName] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [street, setStreet] = useState('');
	const [telephone, setTelephone] = useState('');
	const [tin, setTin] = useState('');
	const [social, setSocial] = useState('');
	const [logo, setLogo] = useState('');
	const [checkbox, setCheckbox] = useState(false);

	const togglePasswordVisiblity = () => {
		setIsPasswordShown(!isPasswordShown);
	};

	const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(e.target.value);
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
		setPostalCode(e.target.value);
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

	const handleChangeCheckbox = () => {
		setCheckbox(!checkbox);
	};

	const handleSubmit = () => {
		handleShow();
		axios.post('http://127.0.0.1:5000/producerregister', {
			logo: logo,
			email: email,
			tin: tin,
			password: password,
			country: country,
			location: location,
			name: name,
			postal_code: postalCode,
			region: region,
			social_network: social,
			state: 'Ativo',
			address: street,
			telephone: telephone,
		});
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	};

	return {
		name,
		password,
		confirmPassword,
		show,
		checkbox,
		isPasswordShown,
		handleChangeCheckbox,
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
		togglePasswordVisiblity,
		handleClose,
		handleLogin,
		handleSubmit,
		handleConfirmPassword,
	};
};
