import * as types from '../actions/actionTypes';
import uuidv4 from 'uuid/v4';

export default function assets(state = {
  assets: [],
  fetchingData: false,
  userAssets: [],
  assetsInMemory: sessionStorage.assets ? JSON.parse(sessionStorage.assets) : []
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
      return {...state, assets: [...state.assets, asset], userAssets: [...state.userAssets, symbol.toUpperCase()], fetchingData: false };
    case types.UPDATE_ASSET:
      idx = state.assets.findIndex(asset => asset.id === action.asset.id);
      symbol = action.asset.quote.symbol;
      // idx2 = state.userAssets.findIndex(userAsset => userAsset.id === action.userAsset.id);
      return {
        ...state,
        assets: [...state.assets.slice(0, idx), action.asset, ...state.assets.slice(idx + 1)],
        userAssets: [...state.userAssets.slice(0, idx), symbol, ...state.userAssets.slice(idx + 1)],
        fetchingData: false
      };
    case types.REMOVE_ASSET:
      idx = state.assets.findIndex(asset => asset.id === action.assetId);
      const assets = state.assets.filter(asset => asset.id !== action.assetId);
      return {
        ...state,
        assets: assets,
        userAssets: [...state.userAssets.slice(0, idx), ...state.userAssets.slice(idx + 1)],
        assetsInMemory: JSON.parse(sessionStorage.assets),
      };
    case types.UPDATE_ASSETS_IN_MEMORY:
      return {...state, assetsInMemory: JSON.parse(sessionStorage.assets)};
    default:
      return state;
  }
}
