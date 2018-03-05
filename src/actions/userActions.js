import sessionApi from '../api/sessionApi';
import * as types from './actionTypes';

function logInSuccess(username) {
  return {
    type: types.LOG_IN_SUCCESS,
    username,
   }
}

export function logInUser(credentials, history) {
  return function(dispatch) {
    return sessionApi.login(credentials).then(response => {
      debugger;
      sessionStorage.setItem('jwt', response.jwt);
      dispatch(logInSuccess(credentials.username));
    }).then(() => {
      history.push('/assets/quote');
    }).catch(error => {
      throw(error);
    });
  };
}

export function logOutUser() {
  sessionStorage.removeItem('jwt');
  return { type: types.LOG_OUT }
}

export function register(data) {
  return {
    type: "REGISTER",
    data,
  }
}
