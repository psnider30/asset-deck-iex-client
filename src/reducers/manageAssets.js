import uuidv4 from 'uuid/v4';

export default function assets(state = {
  assets: [],
  fetchingData: false,
}, action) {

  let idx;
  let asset;

  switch(action.type) {
    case 'START_FETCHING_DATA':
      return {...state, fetchingData: true };
    case 'ADD_ASSET':
      asset = {...action.asset, id: uuidv4()}
      return {...state, assets: [...state.assets, asset], fetchingData: false};
    case 'UPDATE_ASSET':
      idx = state.findIndex(asset => asset.id === action.asset.id);
      return {
        ...state,
        assets: [...state.assets.slice(0, idx), action.asset, ...state.assets.slice(idx + 1)],
        fetchingData: false
      };
    case 'REMOVE_ASSET':
      const assets = state.filter(asset => asset.id !== action.assetId);
      return {...state, assets: assets};
    default:
      return state;
  }
}
