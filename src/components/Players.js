import React from "react";

export const Players = props => {
  const { players, handleChange, updateStage } = props;
  return (
    <div>
      {Object.entries(players).map(([playerID, playerDetails], index) => {
        return (
          <div className="player-block" key={`player${index}`}>
            <div className="player-name">{`Enter Player ${index + 1} -`}</div>
            <input
              data-playerid={playerID}
              onChange={handleChange}
              value={playerDetails.name}
            />
          </div>
        );
      })}
      <button data-stage="choice" onClick={updateStage}>
        Next
      </button>
    </div>
  );
};
