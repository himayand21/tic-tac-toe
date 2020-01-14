import React, { Component } from "react";

import "./App.scss";
import { Players } from "./components/Players";
import { Choice } from "./components/Choice";
import { Game } from "./components/Game";

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
    stage: "players"
  };

  handleNameChange = event => {
    const { target } = event;
    const { value, dataset } = target;
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
    const { target } = event;
    const { dataset } = target;
    const { choice } = dataset;
    const { player1 } = this.state;
    this.setState({
      player1: {
        ...player1,
        choice
      },
	  stage: "game"
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
        return <Choice handleChoice={this.handleChoice}/>;
      }
	  case "game": {
		  return <Game />
	  }
    }
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default App;
