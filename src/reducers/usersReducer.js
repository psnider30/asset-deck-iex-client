import * as types from '../actions/actionTypes';
import { BrowserRouter } from 'react-router-dom'

export default function users(state = {
  loggedIn: !!sessionStorage.jwt,
  currentUser: null,
}, action) {
  switch(action.type) {
    case types.LOG_IN_SUCCESS:
      BrowserRouter.push('/assets/quote')
      return {...state, loggedIn: !!sessionStorage.jwt, currentUser: action.username}
    default:
      return state
  }
}
