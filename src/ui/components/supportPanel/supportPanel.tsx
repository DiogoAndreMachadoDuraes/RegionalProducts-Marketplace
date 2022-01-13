import React from 'react';
import { useHistory } from 'react-router-dom';

interface SupportPanelProps {
	onPrivacityPolitics?: boolean;
	onCookiesPolitics?: boolean;
	onTerms?: boolean;
	onFrequentTask?: boolean;
}

export const SupportPanel: React.FC<SupportPanelProps> = ({
	onPrivacityPolitics,
	onCookiesPolitics,
	onTerms,
	onFrequentTask,
}) => {
	const history = useHistory();

	return (
		<div style={{ marginTop: 100, display: 'flex', flexDirection: 'column', justifyContent: 'left' }}>
			<p style={{ marginTop: 15, marginLeft: 50, fontSize: '25px', fontWeight: 'bold' }}>Suporte</p>

			{onPrivacityPolitics ? (
				<div
					style={{
						marginTop: 25,
						marginLeft: -10,
						backgroundColor: '#FFF2F2',
						width: 230,
						borderRadius: 7,
					}}
				>
					<button
						onClick={() => history.push('/privacityPolitics')}
						style={{
							marginLeft: 24,
							fontSize: '18px',
							color: 'black',
							backgroundColor: '#FFF2F2',
							border: 0,
						}}
					>
						Política de Privacidade
					</button>
				</div>
			) : (
				<button
					onClick={() => history.push('/privacityPolitics')}
					style={{
						marginTop: 25,
						fontSize: '18px',
						color: 'black',
						backgroundColor: 'white',
						border: 0,
					}}
				>
					Política de Privacidade
				</button>
			)}
			{onCookiesPolitics ? (
				<div
					style={{
						marginTop: 15,
						marginLeft: -10,
						backgroundColor: '#FFF2F2',
						width: 230,
						borderRadius: 7,
					}}
				>
					<button
						onClick={() => history.push('/cookiesPolitics')}
						style={{
							marginLeft: 24,
							fontSize: '18px',
							color: 'black',
							backgroundColor: '#FFF2F2',
							border: 0,
						}}
					>
						Política de Cookies
					</button>
				</div>
			) : (
				<button
					onClick={() => history.push('/cookiesPolitics')}
					style={{
						marginTop: 15,
						marginLeft: -29,
						fontSize: '18px',
						color: 'black',
						backgroundColor: 'white',
						border: 0,
					}}
				>
					Política de Cookies
				</button>
			)}
			{onTerms ? (
				<div
					style={{
						marginTop: 15,
						marginLeft: -10,
						backgroundColor: '#FFF2F2',
						width: 230,
						borderRadius: 7,
					}}
				>
					<button
						onClick={() => history.push('/termsConditions')}
						style={{
							marginLeft: 23,
							fontSize: '18px',
							color: 'black',
							backgroundColor: '#FFF2F2',
							border: 0,
						}}
					>
						Termos e Condições
					</button>
				</div>
			) : (
				<button
					onClick={() => history.push('/termsConditions')}
					style={{
						marginTop: 15,
						marginLeft: -17,
						fontSize: '18px',
						color: 'black',
						backgroundColor: 'white',
						border: 0,
					}}
				>
					Termos e Condições
				</button>
			)}
			{onFrequentTask ? (
				<div
					style={{
						marginTop: 15,
						marginLeft: -10,
						backgroundColor: '#FFF2F2',
						width: 230,
						borderRadius: 7,
					}}
				>
					<button
						onClick={() => history.push('/frequentTask')}
						style={{
							marginLeft: 24,
							fontSize: '18px',
							color: 'black',
							backgroundColor: '#FFF2F2',
							border: 0,
						}}
					>
						Perguntas Frequentes
					</button>
				</div>
			) : (
				<button
					onClick={() => history.push('/frequentTask')}
					style={{
						marginTop: 15,
						marginLeft: -6,
						fontSize: '18px',
						color: 'black',
						backgroundColor: 'white',
						border: 0,
					}}
				>
					Perguntas Frequentes
				</button>
			)}
		</div>
	);
};
