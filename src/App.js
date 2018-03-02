import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AssetDeckEntrance from './containers/AssetDeckEntrance';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import LogoutButton from './components/LogoutButton';


class App extends Component {
debugger;
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <h1 className="App-title">Asset Deck</h1>
          </div>
          <div className="users-entrance">
            <Route path="/signup" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path = '/assets' component={LogoutButton} />
          </div>
          <div className="App-body">
            <AssetDeckEntrance />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
