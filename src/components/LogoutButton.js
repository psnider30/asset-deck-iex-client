import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOutUser } from '../actions/userActions';

const LogoutButton = ({logOutUser}) => (
  <button onClick={logOutUser}>
    Logout
  </button>
);

const { func } = PropTypes;

LogoutButton.propTypes = ({
  logOutUser: func.isRequired,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: bindActionCreators(logOutUser, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(LogoutButton)
