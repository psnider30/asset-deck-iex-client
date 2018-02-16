import { combineReducers } from 'redux';
import manageAssets from './manageAssets.js';

export default combineReducers ({
  assetDeck: manageAssets,
})
