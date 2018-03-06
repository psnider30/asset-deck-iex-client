import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { logOutUser } from '../actions/userActions';

// import LogoutButton from './components/LogoutButton'
import * as userActions from '../actions/userActions';

class Header extends Component {

  handleLogOut = (event) => {
    this.props.logOutUser();
  }

  render() {
    const currentPath = this.props.location.pathname
    if (this.props.loggedIn) {
      return (
        <div className="App-header">
          <h1 className="App-title">Asset Deck</h1>
          <div className="nav">
            <a onClick={(event) => this.handleLogOut(event)}>Logout</a>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App-header">
          <h1 className="App-title">Asset Deck</h1>
          <div className="nav">
          {currentPath === '/login' ?
          <Link to="/signup">
            Signup
          </Link>
          :
          <Link to="/login">
            Login
          </Link>
        }
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.users.loggedIn
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: bindActionCreators(logOutUser, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
