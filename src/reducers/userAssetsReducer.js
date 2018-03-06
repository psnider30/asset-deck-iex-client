import * as types from '../actions/actionTypes';

export default function userAssets(state = [], action) {
  switch(action.type) {
    case types.ADD_USER_ASSET:
      return state.concat(action.symbol)
    default:
      return state;
  }
}
