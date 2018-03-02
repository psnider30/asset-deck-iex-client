import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../actions/userActions';

const LogoutButton = ({history, logout}) => (
  <button onClick={logout(history)}>
    Logout
  </button>
);

const { object, func } = PropTypes;

LogoutButton.propTypes = ({
  history: object.isRequired,
  logout: func.isRequired,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: logout
  };
}

export default connect(null, mapDispatchToProps)(withRouter(LogoutButton))
