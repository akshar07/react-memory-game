import React, { Component } from 'react';
import logo from './logo.svg';
import {Game} from './Game'
import './App.css';
import './main.css'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Memory Game</h1>
        </header>
        <Game />
      </div>
    );
  }
}

export default App;
