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

export function signUpAttempt(userInfo) {
  return {
    type: types.SIGN_UP_ATTEMPT,
    userInfo,
  }
}

export function signUpUser(userInfo, history) {
  return function(dispatch) {
    return signUpApi.signup(userInfo).then(response => {
      console.log(response)
      dispatch(signUpAttempt(userInfo));
    }).then(() => {
      history.push('/login');
    }).catch(error => {
      throw(error);
    });
  };
}
