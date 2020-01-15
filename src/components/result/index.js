import React from "react";

import { getWinnerName } from '../../utils/getWinnerName';
import { Score } from "../score";

import './result.scss';

export const Result = (props) => {
    const {
        player1,
        player2,
        restart
    } = props;

    const winnerName = getWinnerName(player1, player2);
    return (
        <section className="result-section">
            <h1>{winnerName ? `Congratulations, ${winnerName} !` : `It's a tie !`}</h1>
            <div className="final-score-wrapper">
                <Score
                    player1={player1}
                    player2={player2}
                />
            </div>
            <button
                className="restart-button"
                onClick={restart}
            >
                Restart
            </button>
        </section>
    )
}