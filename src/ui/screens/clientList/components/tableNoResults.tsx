import React from 'react';

export const TableNoResults: React.FC = () => {
	return (
		<tr style={{ marginTop: 20 }}>
			<td colSpan={9}> Não existem dados para mostrar</td>
		</tr>
	);
};
