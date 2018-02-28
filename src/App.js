import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
// import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import AssetDeck from './containers/AssetDeck.js'

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <h1 className="App-title">Asset Deck</h1>
          </div>
          <div className="App-body">
            <AssetDeck />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
