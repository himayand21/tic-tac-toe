import React from "react";

const options = [
  {
    label: "Cross",
    value: "cross"
  },
  {
    label: "Circle",
    value: "circle"
  }
];
export const Choice = props => {
  const { handleChoice } = props;
  return (
    <div>
      {options.map(option => {
        return (
			<button
				data-choice={option.value}
				onClick={handleChoice}
			>
				{option.label}
			</button>
		);
      })}
    </div>
  );
};
