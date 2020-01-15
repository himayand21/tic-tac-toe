import React from "react";

export const Score = (props) => {
    const {
        player1,
        player2,
        nextTurn
    } = props;
    return (
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
    )
}