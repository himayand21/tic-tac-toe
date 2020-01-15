import React from 'react';

import { Circle } from '../circle';
import { Cross } from '../cross';
import { Score } from '../score';

import './game.scss';

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
		nextTurn,
		result,
		endGame
	} = props;
	const {
		player1,
		player2
	} = players;
	return (
		<section className="game-section">
			<Score
				player1={player1}
				player2={player2}
				nextTurn={nextTurn}
			/>
			<div className="box-wrapper">
				{Object.entries(boxes).map(([boxID, boxValue]) => {
					const playerDetails = players[boxValue];
					const winKey = result.winningCombination.includes(parseInt(boxID));
					return (
						<button
							onClick={handleBoxClick}
							data-boxid={boxID}
							disabled={playerDetails}
							className={`box-block-${boxID} ${winKey ? 'box-block-green' : ''}`}
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