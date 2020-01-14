import React, { Component } from "react";

import "./App.scss";
import { Players } from "./components/players";
import { Choice } from "./components/choice";
import { Game } from "./components/game";

import { getWinner } from "./utils/getWinner";

class App extends Component {
  state = {
    player1: {
      name: "",
      score: 0,
      choice: "x"
    },
    player2: {
      name: "",
      score: 0,
      choice: "o"
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
    const newBoxes = {
      ...boxes,
      [boxid]: nextTurn
    };
    const winner = getWinner(newBoxes, nextTurn);
    if (winner) {
      const winnerDetails = this.state[nextTurn];
      this.setState({
        boxes: newBoxes,
        stage: 'congrats',
        [nextTurn]: {
          ...winnerDetails,
          score: winnerDetails.score + 1
        }
      });
    } else {
      this.setState({
        boxes: newBoxes,
        nextTurn: nextTurn === "player1" ? "player2" : "player1"
      });
    }
  };

  updateStage = event => {
    const { dataset } = event.target;
    const { stage } = dataset;
    this.setState({ stage });
  };

  renderContent = () => {
    const { stage, player1, player2 } = this.state;
    const players = {player1, player2};
    switch (stage) {
      case "players": {
        return (
          <Players
            players={players}
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
            players={players}
          />
        );
      }
      case "game": {
        return (
          <Game
            boxes={this.state.boxes}
            handleBoxClick={this.handleBoxClick}
            players={players}
          />
        );
      }
    }
  };

  render() {
    return (
      <div className="app-block">
        {this.renderContent()}
      </div>
    );
  }
}

export default App;
