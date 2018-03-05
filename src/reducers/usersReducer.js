import * as types from '../actions/actionTypes';

export default function users(state = {
  loggedIn: !!sessionStorage.jwt,
  currentUser: null,
}, action) {
  switch(action.type) {
    case types.LOG_IN_ATTEMPT:
    debugger;
      return {...state, loggedIn: action.valid, currentUser: action.username}
    case types.LOG_OUT:
      return {...state, loggedIn: !!sessionStorage.jwt, currentUser: null}
    default:
      return state
  }
}
