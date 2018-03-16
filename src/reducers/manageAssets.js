import * as types from '../actions/actionTypes';

export default function assets(state = {
  assets: [],
  fetchingData: false,
  replacingAsset: false,
  userAssets: [],
  assetsInMemory: sessionStorage.assets ? JSON.parse(sessionStorage.assets) : []
}, action) {

  let idx;
  let symbol;

  switch(action.type) {
    case types.START_FETCHING_DATA:
      return {...state, fetchingData: true };
    case types.STOP_FETCHING_DATA:
      return {...state, fetchingData: false };
    case types.ADD_ASSET:
      symbol = action.asset.quote.symbol;
      return {...state, assets: [...state.assets, action.asset], userAssets: [...state.userAssets, symbol.toUpperCase()], fetchingData: false };
    case types.UPDATE_ASSET:
      idx = state.assets.findIndex(asset => asset.id === action.asset.id);
      symbol = action.asset.quote.symbol;
      return {
        ...state,
        assets: [...state.assets.slice(0, idx), action.asset, ...state.assets.slice(idx + 1)],
        userAssets: [...state.userAssets.slice(0, idx), symbol, ...state.userAssets.slice(idx + 1)],
        fetchingData: false,
        replacingAsset: action.asset.replacing,
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
    case types.CLEAR_ASSETS:
      return {...state, assets: [], userAssets: []};
    case types.UPDATE_ASSETS_IN_MEMORY:
      return {...state, assetsInMemory: JSON.parse(sessionStorage.assets)};
    case types.RESET_REPLACING_ASSET:
      return {...state, replacingAsset: false}
    default:
      return state;
  }
}
