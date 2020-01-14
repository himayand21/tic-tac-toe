import React from "react";

const options = [
  {
    label: "Cross",
    value: "x"
  },
  {
    label: "Circle",
    value: "o"
  }
];
export const Choice = props => {
  const { handleChoice, updateStage } = props;
  return [
    <div>
      {options.map(option => {
        return (
			<button
				data-choice={option.value}
				data-playerid={"player1"}
				onClick={handleChoice}
			>
				{option.label}
			</button>
		);
      })}
    </div>,
	<div>
      {options.map(option => {
        return (
			<button
				data-choice={option.value}
				data-playerid={"player2"}
				onClick={handleChoice}
			>
				{option.label}
			</button>
		);
      })}
    </div>,
	<button data-stage="game" onClick={updateStage}>Next</button>
  ];
};
