import sessionApi from '../api/sessionApi';
import * as types from './actionTypes';

function logInSuccess(username, valid) {
  if (!valid) { username = null }
  return {
    type: types.LOG_IN_SUCCESS,
    username,
    valid
   }
}

export function logInUser(credentials, history) {
  let valid = true;
  return function(dispatch) {
    return sessionApi.login(credentials).then(response => {
      sessionStorage.setItem('jwt', response.jwt);
      if (!sessionStorage.jwt || sessionStorage.jwt === "undefined") {
        debugger
        valid = false
      }
      dispatch(logInSuccess(credentials.username, valid));
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
