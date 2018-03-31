import sessionApi from '../api/sessionApi';
import signUpApi from '../api/signUpApi';
import * as types from './actionTypes';

function logInAttempt(username, valid) {
  valid ? sessionStorage.setItem('username', username) : username = null;

  return {
    type: types.LOG_IN_ATTEMPT,
    username,
    valid
  };
}

export function logInUser(credentials, history) {
  let valid = true;
  return function(dispatch) {
    return sessionApi.login(credentials).then(response => {
      sessionStorage.setItem('jwt', response.jwt);
      if (!sessionStorage.jwt || sessionStorage.jwt === "undefined") {
        valid = false;
      }
      dispatch(logInAttempt(credentials.username, valid));
      history.push('/assets/quote');
    }).catch(error => {
      return error;
    });
  };
}

export function logOutUser() {
  sessionStorage.removeItem('jwt');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('assets');
  return { type: types.LOG_OUT };
}

function signUpAttempt(user) {
  return {
    type: types.SIGN_UP_ATTEMPT,
    registerFail: !user
  };
}

export function signUpUser(userInfo, history) {
  return function(dispatch) {
    return signUpApi.signup(userInfo).then(user => {
      dispatch(signUpAttempt(user));
      history.push('/login');
    }).catch(error => {
      return error;
    });
  };
}

export function resetRegisterFail() {
  return { type: types.RESET_REGISTER_FAIL };
}
