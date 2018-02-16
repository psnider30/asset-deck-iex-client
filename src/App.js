import React, { Component } from 'react';
import './App.css';
// import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import AssetDeck from './containers/AssetDeck.js'

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">Asset Deck</h1>
        </div>
        {/* <Router>
          <div className="Nav">
            <NavLink style={{ marginRight: '10px' }} to="/assets">Your Portfolio</NavLink>
            <NavLink style={{ marginRight: '10px' }} to="/assets/new">Add Asset</NavLink>
          </div>
        </Router> */}

        <div className="App-body">
          <AssetDeck />
        </div>
      </div>
    );
  }
}

export default App;
