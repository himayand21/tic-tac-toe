import React, { useEffect } from 'react';

import { Circle } from '../circle';
import { Cross } from '../cross';
import { Score } from '../score';

import './game.scss';
import { getAIMove } from '../../utils/getAIMove';

const boxCells = {
	x: <Cross />,
	o: <Circle />
}

export const Game = (props) => {
	const {
		boxes,
		handleBoxClick,
		rematch,
		players,
		currentTurn,
		result,
		endGame,
		aiFlag
	} = props;
	const {
		player1,
		player2
	} = players;

	useEffect(() => {
		if (currentTurn === "player2" && aiFlag) {
			const boxId = getAIMove(boxes);
			handleBoxClick(boxId);
		}
	}, [currentTurn]);
	return (
		<section className="game-section">
			<Score
				player1={player1}
				player2={player2}
				currentTurn={currentTurn}
			/>
			<div className="box-wrapper">
				{Object.entries(boxes).map(([boxId, boxValue]) => {
					const playerDetails = players[boxValue];
					const winKey = result.winningCombination.includes(parseInt(boxId));
					return (
						<button
							onClick={() => handleBoxClick(boxId)}
							disabled={playerDetails}
							className={`box-block-${boxId} ${winKey ? 'box-block-green' : ''}`}
							disabled={result.status || boxValue}
						>
							{playerDetails ? boxCells[playerDetails.choice] : ''}
						</button>
					)
				})}
			</div>
			<div className="button-wrapper">
				<button
					className="restart-button"
					disabled={!result.status}
					onClick={rematch}
				>
					Rematch
				</button>
				<button
					className="endgame-button"
					onClick={endGame}
				>
					End Game
				</button>
			</div>
		</section>
	)
}