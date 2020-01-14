import React, { Component } from "react";

import "./App.scss";
import { Players } from "./components/Players";
import { Choice } from "./components/Choice";
import { Game } from "./components/Game";

import {getWinner} from "./utils/getWinner";

class App extends Component {
  state = {
    player1: {
      name: "",
      score: 0,
      choice: ""
    },
    player2: {
      name: "",
      score: 0,
      choice: ""
    },
    nextTurn: "",
    boxes: {
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
      9: ""
    },
    stage: "players"
  };

  handleNameChange = event => {
    const { value, dataset } = event.target;
    const { playerid } = dataset;

    const inputValue = value;
    const playerDetails = this.state[playerid];
    this.setState({
      [playerid]: {
        ...playerDetails,
        name: inputValue
      }
    });
  };

  handleChoice = event => {
    const { dataset } = event.target;
    const { choice, playerid } = dataset;

	const otherPlayerId = playerid === "player1" ? "player2" : "player1";

	const {
		[playerid]: playerDetails,
		[otherPlayerId]: otherPlayerDetails
	} = this.state;
    const xChoice = choice === "x";

    this.setState({
      [playerid]: {
        ...playerDetails,
        choice
      },
      [otherPlayerId]: {
        ...otherPlayerDetails,
        choice: xChoice ? "o" : "x"
      },
      nextTurn: xChoice ? playerid : otherPlayerId
    });
  };

  handleBoxClick = event => {
    const { dataset } = event.target;
    const { boxid } = dataset;
    const { nextTurn, boxes } = this.state;
	const winner = getWinner(boxes, nextTurn);
	console.log(winner);
    this.setState({
      boxes: {
        ...boxes,
        [boxid]: nextTurn
      },
      nextTurn: nextTurn === "player1" ? "player2" : "player1"
    });
  };

  updateStage = event => {
    const { dataset } = event.target;
    const { stage } = dataset;
    this.setState({ stage });
  };

  renderContent = () => {
    const { stage, player1, player2 } = this.state;
    switch (stage) {
      case "players": {
        return (
          <Players
            players={{ player1, player2 }}
            updateStage={this.updateStage}
            handleChange={this.handleNameChange}
          />
        );
      }
      case "choice": {
        return (
			<Choice
				handleChoice={this.handleChoice}
				updateStage={this.updateStage}
			/>
		);
      }
      case "game": {
        return (
          <Game
		  	boxes={this.state.boxes}
			handleBoxClick={this.handleBoxClick}
			players={{ player1, player2 }}
		/>
        );
      }
    }
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default App;
