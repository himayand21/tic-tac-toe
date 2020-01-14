import React from "react";

import { Cross } from '../cross';
import { Circle } from '../circle';

import './choice.scss';

const options = [
  {
    label: <Cross />,
    value: "x"
  },
  {
    label: <Circle />,
    value: "o"
  }
];
export const Choice = props => {
  const { handleChoice, updateStage, players } = props;
  return (
    <section className="choice-section">
      <h1>Pick your side</h1>
      {Object.entries(players).map(([playerId, playerDetails]) => {
        const { name, choice } = playerDetails;
        return (
          <div className="choice-wrapper">
            <div className="player-name">{`${name} -`}</div>
            <div className="choice-details">
              {options.map(option => {
                return (
                  <div className="option-wrapper">
                    <div className="option-icon">
                      {option.label}
                    </div>
                    <button
                      data-choice={option.value}
                      data-playerid={playerId}
                      onClick={handleChoice}
                      className="option-button"
                      disabled={choice === option.value}
                    >
                      {choice === option.value ? <div className="option-filled" /> : null}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )
      })}
      <button
        className="next-button"
        data-stage="game"
        onClick={updateStage}
      >
        Next
      </button>
    </section>
  );
};
