import userAssetsApi from '../api/userAssetsApi';
import * as types from './actionTypes';

export function addUserAsset(symbol) {
  return {
    type: types.ADD_USER_ASSET,
    symbol
  }
}
