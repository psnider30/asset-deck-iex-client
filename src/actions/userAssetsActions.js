import userAssetsApi from '../api/userAssetsApi';
import * as types from './actionTypes';

export function addUserAsset(symbol, username) {
  return dispatch => {
    return userAssetsApi.saveUserAsset(symbol, username).then(response => {
      console.log(response)
      dispatch(addAsset(symbol));
    })
  }
}

function addAsset(symbol) {
  return {
    type: types.ADD_USER_ASSET,
    symbol
  }
}
