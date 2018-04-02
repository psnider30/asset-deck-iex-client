import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AssetDeckEntrance from './containers/AssetDeckEntrance';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import Header from './components/Header';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="users-entrance">
            <Route path="/signup" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
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
