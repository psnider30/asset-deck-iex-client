import sessionApi from '../api/sessionApi';
import signUpApi from '../api/signUpApi';
import * as types from './actionTypes';

function logInAttempt(username, valid) {
  if (!valid) { username = null; }
  return {
    type: types.LOG_IN_ATTEMPT,
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
        valid = false
      }
      dispatch(logInAttempt(credentials.username, valid));
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

function signUpAttempt(user) {
  if (user.id) {
    return {
      type: types.SIGN_UP_ATTEMPT,
    }
  }
}

export function signUpUser(userInfo, history) {
  debugger;
  return function(dispatch) {
    return signUpApi.signup(userInfo).then(user => {
      console.log(user)
      dispatch(signUpAttempt(user));
    }).then(() => {
      history.push('/login');
    }).catch(error => {
      throw(error);
    });
  };
}
