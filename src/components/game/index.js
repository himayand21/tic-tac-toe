import React from 'react';

import {Circle} from '../circle';
import {Cross} from '../cross';

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
		result
	} = props;
	const {
		player1,
		player2
	} = players;
	return (
		<section className="game-section">
			<div className="score-section">
				<div className="player-name">
					<span>{player1.name}</span>
					{nextTurn === "player1" ? <i className="fas fa-circle" /> : null}
				</div>
				<div className="score-wrapper">
					<div className="player-score">
						{player1.score}
					</div>
					<div className="score-separator">-</div>
					<div className="player-score">
						{player2.score}
					</div>
				</div>
				<div className="player-name">
					{nextTurn === "player2" ? <i className="fas fa-circle" /> : null}
					<span>{player2.name}</span>
				</div>
			</div>
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
							disabled={result.status}
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
				>
					End Game
				</button>
			</div>
		</section>
	)
}