import * as types from '../actions/actionTypes';
import { BrowserRouter } from 'react-router-dom'

export default function users(state= !!sessionStorage.jwt, action) {
  switch(action.type) {
    case types.LOG_IN_SUCCESS:
      BrowserRouter.push('/assets/quote')
      return !!sessionStorage.jwt
    default:
      return state
  }
}
