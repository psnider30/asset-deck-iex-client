import React, { Component } from 'react';
import './App.css';
// import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import Navbar from './Navbar.js'

import EtfDeck from './containers/EtfDeck.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">ETF Deck</h1>
        </div>
        {/* <Router>
          <div className="Nav">
            <NavLink style={{ marginRight: '10px' }} to="/etfs">Your Portfolio</NavLink>
            <NavLink style={{ marginRight: '10px' }} to="/etfs/new">Add ETF</NavLink>
          </div>
        </Router> */}
        <Navbar />
        <div className="App-body">
          <EtfDeck />
        </div>
      </div>
    );
  }
}

export default App;
