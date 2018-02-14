import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

import EtfDeck from './EtfDeck.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>ETF Deck</h1>
        </div>
        <Router>
          <div>
            <NavLink style={{ marginRight: '10px' }} to="/etfs">Your Portfolio</NavLink>
            <NavLink style={{ marginRight: '10px' }} to="/etfs/new">Add ETF</NavLink>
          </div>
        </Router>
        <EtfDeck />
      </div>
    );
  }
}

export default App;
