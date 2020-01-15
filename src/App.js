import React, { Component } from "react";

import "./App.scss";
import { Players } from "./components/players";
import { Choice } from "./components/choice";
import { Game } from "./components/game";
import { Result } from "./components/result";

import { getWinner } from "./utils/getWinner";

const initBoxes = {
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: ""
};

const initResult = {
  winningCombination: [],
  status: ""
};

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
    nextTurn: "player1",
    boxes: initBoxes,
    stage: "players",
    result: initResult
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
    this.setState({ boxes: newBoxes });
    const winningCombination = getWinner(newBoxes, nextTurn);
    if (winningCombination) {
      const winnerDetails = this.state[nextTurn];
      this.setState({
        [nextTurn]: {
          ...winnerDetails,
          score: winnerDetails.score + 1
        },
        result: {
          winningCombination,
          status: "win"
        }
      });
    } else {
      if (Object.values(newBoxes).every(boxVal => boxVal)) {
        this.setState({
          result: {
            winningCombination: [],
            status: "tie"
          }
        })
      } else {
        this.setState({
          nextTurn: nextTurn === "player1" ? "player2" : "player1"
        });
      }
    }
  };

  updateStage = event => {
    const { dataset } = event.target;
    const { stage } = dataset;
    this.setState({ stage });
  };

  rematch = () => {
    const { player1, player2 } = this.state;
    const xChoice = player1.choice === "x";
    this.setState({
      player1: {
        ...player1,
        choice: xChoice ? "o" : "x"
      },
      player2: {
        ...player2,
        choice: xChoice ? "x" : "o"
      },
      nextTurn: xChoice ? "player2" : "player1",
      boxes: initBoxes,
      result: initResult
    });
  }

  endGame = () => {
    this.setState({
      stage: "result",
      boxes: initBoxes,
      result: initResult
    });
  }

  restart = () => {
    this.setState({
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
      nextTurn: "player1",
      boxes: initBoxes,
      stage: "players",
      result: initResult
    });
  }

  renderContent = () => {
    const {
      stage,
      player1,
      player2,
      nextTurn,
      result
    } = this.state;
    const players = { player1, player2 };
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
            nextTurn={nextTurn}
            result={result}
            rematch={this.rematch}
            endGame={this.endGame}
          />
        );
      }
      case "result": {
        return (
          <Result
            player1={player1}
            player2={player2}
            restart={this.restart}
          />
        )
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
