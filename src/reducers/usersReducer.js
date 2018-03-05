import * as types from '../actions/actionTypes';

export default function users(state = {
  loggedIn: !!sessionStorage.jwt,
  currentUser: null,
}, action) {
  switch(action.type) {
    case types.LOG_IN_SUCCESS:
      return {...state, loggedIn: !!sessionStorage.jwt, currentUser: action.username}
    case types.LOG_OUT:
      return {...state, loggedIn: !!sessionStorage.jwt, currentUser: null}
    default:
      return state
  }
}
