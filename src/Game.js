import React, { Component } from 'react';
import ImageArea from './ImageArea';
import Header from './Header';


class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: null,
      currentChallenge: null,
      score: 0,
      toiletOverflow: 0, // 0 = empty, 10 = full
      timer: 5
    };

    /* Challenges:
      0:  Find the flushable
      1:  Find the unflushable
      2:  Find the not flushable
      3:  Find the not unflushable
      4:  Find the flushable (there is none)
      5:  Find the unflushable (there is none)
    */
    this.challenges = [0, 1, 2, 3, 4, 5];
  }

  newGame = () => {
    let challenge = Math.floor(Math.random() * this.challenges.length);
    this.setState({
      isPlaying: true,
      currentChallenge: challenge,
      score: 0,
      toiletOverflow: 0,
    });
  }

  roundOver = (status) => {
    if (status === "win") {
      let challenge = Math.floor(Math.random() * this.challenges.length);
      let newScore = this.state.score + 1;
      let newTimer = this.state.timer;

      if (this.state.timer >= 0.5) {
        newTimer -= 0.1;
      }

      this.setState({
        timer: newTimer.toFixed(1),
        score: newScore,
        isPlaying: true,
        currentChallenge: challenge,
      });
    }
    else {
      let newToiletOverflow = this.state.toiletOverflow + 1;

      if (this.state.toiletOverflow === 9) {
        this.setState({
          toiletOverflow: newToiletOverflow,
          isPlaying: false,
          currentChallenge: null,
        });
      }
      else {
        let challenge = Math.floor(Math.random() * this.challenges.length);
        let newTimer = this.state.timer;
        if (this.state.timer >= 0.5) {
          newTimer -= 0.1;
        }
        this.setState({
          timer: newTimer.toFixed(1),
          toiletOverflow: newToiletOverflow,
          isPlaying: true,
          currentChallenge: challenge,
        });
      }
    }
  };

  componentDidMount = () => {
    this.newGame();
  };

  render() {
    return (
      <div>
        <Header
          score={this.state.score}
          toiletLevel={this.state.toiletOverflow}
          currChallenge={this.state.currentChallenge}
          timer={this.state.timer}
        />
        <h1>Flushable or Not</h1>

        <div>Timer: { this.state.timer }</div>

        <ImageArea
          timer={this.state.timer}
          isPlaying={this.state.isPlaying}
          currChallenge={this.state.currentChallenge}
          roundOver={this.roundOver}
        />
      </div>
    );
  }
}

export default Game;