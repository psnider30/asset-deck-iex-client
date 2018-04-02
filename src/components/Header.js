import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { logOutUser, resetRegisterFail } from '../actions/userActions';

class Header extends Component {

  handleLogOut() {
    this.props.logOutUser();
  }

  handleLoginClick() {
    const { registerFail, resetRegisterFail } = this.props;
    if (registerFail) {
      resetRegisterFail()
    }
  }

  render() {
    const currentPath = this.props.location.pathname
    if (this.props.loggedIn) {
      return (
        <div className="App-header">
          <h1 className="App-title">Asset Deck</h1>
          <div className="nav">
            <a href='' onClick={() => this.handleLogOut()}>Logout</a>
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
          <Link to="/login" onClick={() => this.handleLoginClick()}>
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
    loggedIn: state.users.loggedIn,
    registerFail: state.users.registerFail,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: bindActionCreators(logOutUser, dispatch),
    resetRegisterFail: bindActionCreators(resetRegisterFail, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
