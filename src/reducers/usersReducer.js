import * as types from '../actions/actionTypes';

export default function users(state = {
  loggedIn: !!sessionStorage.jwt && sessionStorage.jwt !== 'undefined',
  currentUser: sessionStorage.username,
  logInFail: false,
  registerFail: false,
}, action) {
  switch(action.type) {
    case types.LOG_IN_ATTEMPT:
      return {...state, loggedIn: action.valid, logInFail: !action.valid, currentUser: action.username}
    case types.LOG_OUT:
      return {...state, loggedIn: !!sessionStorage.jwt, logInFail: false, currentUser: null}
    case types.SIGN_UP_ATTEMPT:
      return {...state, registerFail: action.registerFail}
    case types.RESET_REGISTER_FAIL:
      return {...state, registerFail: false}
    default:
      return state
  }
}
