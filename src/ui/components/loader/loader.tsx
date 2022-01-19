import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { ErrorPage } from 'ui';

export const Loader: React.FC = () => {
	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		setTimeout(function () {
			setIsActive(false);
		}, 120000);
	}, [isActive]);

	return isActive ? (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				marginTop: '8vh',
				marginBottom: '35vh',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Spinner animation="border" />
			<span style={{ textAlign: 'center', marginTop: 8, fontSize: 20, fontFamily: 'artifika' }}>Loading...</span>
		</div>
	) : (
		<ErrorPage />
	);
};
