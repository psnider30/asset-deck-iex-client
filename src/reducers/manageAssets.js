import * as types from '../actions/actionTypes';

export default function assets(state = {
  assets: [],
  fetchingData: false,
  replacingAsset: false,
  updatingShares: false,
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
      idx = action.asset.replacing ?
        state.assets.findIndex(asset => asset.id === action.asset.oldId) :
        state.assets.findIndex(asset => asset.id === action.asset.id);
      symbol = action.asset.quote.symbol;
      delete action.asset.oldId
      return {
        ...state,
        assets: [...state.assets.slice(0, idx), action.asset, ...state.assets.slice(idx + 1)],
        userAssets: [...state.userAssets.slice(0, idx), symbol, ...state.userAssets.slice(idx + 1)],
        fetchingData: false,
        replacingAsset: action.asset.replacing,
      };
    case types.REMOVE_ASSET:
      idx = state.assets.findIndex(asset => asset.id === action.assetId);
      return {
        ...state,
        assets: state.assets.filter(asset => asset.id !== action.assetId),
        userAssets: [...state.userAssets.slice(0, idx), ...state.userAssets.slice(idx + 1)],
        assetsInMemory: JSON.parse(sessionStorage.assets),
      };
    case types.CLEAR_ASSETS:
      return {...state, assets: [], userAssets: []};
    case types.UPDATE_ASSETS_IN_MEMORY:
      return {...state, assetsInMemory: JSON.parse(sessionStorage.assets)};
    case types.RESET_REPLACING_ASSET:
      return {...state, replacingAsset: false}
    case types.UPDATE_ASSET_SHARES:
      return {
        // alternative to slice used in UPDATE_ASSET is to map to replace updated asset
        ...state,
        assets: state.assets.map(a => a.id === action.asset.id ? action.asset : a),
      }
    case types.SET_UPDATING_SHARES:
      return {...state, updatingShares: true}
    case types.RESET_UPDATING_SHARES:
      return {...state, updatingShares: false}
    default:
      return state;
  }
}
