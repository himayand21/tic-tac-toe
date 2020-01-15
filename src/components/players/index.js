import React from "react";

import './players.scss';

export const Players = props => {
  const {
    players,
    handleChange,
    updateStage,
    aiFlag,
    toggleAI
  } = props;
  return (
    <section className="player-entry">
      <h1>Tic-tac-toe</h1>
      {Object.entries(players).map(([playerID, playerDetails], index) => {
        return (
          <div className="player-block" key={`player${index}`}>
            <div className="player-name">{`Player ${index + 1} -`}</div>
            <input
              data-playerid={playerID}
              onChange={handleChange}
              value={playerDetails.name}
              placeholder="enter player name"
            />
          </div>
        );
      })}
      <div className="option-button-wrapper">
        <button
          className="option-button"
          onClick={toggleAI}
        >
          {aiFlag ? <div className="option-filled" /> : null}
        </button>
        <span>Use AI</span>
      </div>
      <button
        data-stage="choice"
        className="choice-button"
        onClick={updateStage}
        disabled={Object.values(players).some(player => !player.name)}
      >
        Next
      </button>
    </section>
  );
};
