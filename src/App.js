import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AssetDeck from './containers/AssetDeck';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <h1 className="App-title">Asset Deck</h1>
          </div>
          <div className="users-entrance">
            <Route path='/assets' render={() => <h2>Welcome, {this.props.currentUser}</h2>} />
            <Route path="/signup" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
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
