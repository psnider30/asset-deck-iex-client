import uuidv4 from 'uuid/v4';

export default function manageAssets(state = {assets: []}, action) {
  let idx;
  let asset;

  switch(action.type) {
    case 'ADD_ASSET':
      asset = {...action.asset, id: uuidv4()}
      return {...state, assets: [...state.assets, asset]};
    case 'FIND_ASSET':
      return {...state, editing: action.assetId};
    case 'UPDATE_ASSET':
      idx = state.assets.findIndex(asset => asset.id === action.asset.id);
      return {
        ...state,
        assets: [...state.assets.slice(0, idx), action.asset, ...state.assets.slice(idx + 1)]
      }
    case 'REMOVE_ASSET':
      const assets = state.assets.filter(asset => asset.id !== action.assetId);
      return {...state, assets: assets}
    default:
      return state;
  }
}
