import * as types from '../actions/actionTypes';
import uuidv4 from 'uuid/v4';

export default function assets(state = {
  assets: [],
  fetchingData: false,
  userAssets: [],
}, action) {

  let idx;
  let asset;
  let symbol;

  switch(action.type) {
    case types.START_FETCHING_DATA:
      return {...state, fetchingData: true };
    case types.STOP_FETCHING_DATA:
      return {...state, fetchingData: false };
    case types.ADD_ASSET:
      asset = {...action.asset, id: uuidv4()};
      symbol = action.asset.quote.symbol;
      return {...state, assets: [...state.assets, asset], userAssets: [...state.userAssets, symbol.toUpperCase()], fetchingData: false};
    case types.UPDATE_ASSET:
      idx = state.assets.findIndex(asset => asset.id === action.asset.id);
      return {
        ...state,
        assets: [...state.assets.slice(0, idx), action.asset, ...state.assets.slice(idx + 1)],
        fetchingData: false
      };
    case types.REMOVE_ASSET:
      const assets = state.assets.filter(asset => asset.id !== action.assetId);
      return {...state, assets: assets};
    default:
      return state;
  }
}
