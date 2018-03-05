import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logOutUser } from '../actions/userActions';

const LogoutButton = ({history, logOutUser}) => (
  <button onClick={logOutUser()}>
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
    logOutUser,
  };
}

export default connect(null, mapDispatchToProps)(withRouter(LogoutButton))
