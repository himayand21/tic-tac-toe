import React from 'react';

export const Game = (props) => {
	const {
		boxes,
		handleBoxClick,
		players
	} = props;
	return (
		<div>
			{Object.entries(boxes).map(([boxID, boxValue]) => {
				const playerDetails = players[boxValue];
				return (
					<button
						onClick={handleBoxClick}
						data-boxid={boxID}
						disabled={playerDetails}
					>
						{playerDetails ? playerDetails.choice : ''}
					</button>
				)
			})}
		</div>
	)
}