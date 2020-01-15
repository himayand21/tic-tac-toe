import React from "react";

import { getWinnerName } from '../../utils/getWinnerName';
import { Score } from "../score";

import './result.scss';

const getHeading = (winnerName, aiFlag) => {
    if (aiFlag && winnerName === "AI") return 'You lose !';
    if (!winnerName) return `It's a tie !`;
    return `Congratulations, ${winnerName}`;
}

export const Result = (props) => {
    const {
        player1,
        player2,
        restart,
        aiFlag
    } = props;

    const winnerName = getWinnerName(player1, player2);
    const heading = getHeading(winnerName, aiFlag);
    return (
        <section className="result-section">
            <h1>{heading}</h1>
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