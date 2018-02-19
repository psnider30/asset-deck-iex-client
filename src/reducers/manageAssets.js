import uuidv4 from 'uuid/v4';

export default function assets(state = [], action) {
  let idx;
  let asset;

  switch(action.type) {
    case 'ADD_ASSET':
      asset = {...action.asset, id: uuidv4()}
      return [...state, asset];
    case 'UPDATE_ASSET':
      idx = state.findIndex(asset => asset.id === action.asset.id);
      return [...state.slice(0, idx), action.asset, ...state.slice(idx + 1)]
    case 'REMOVE_ASSET':
      const assets = state.filter(asset => asset.id !== action.assetId);
      return assets
    default:
      return state;
  }
}
