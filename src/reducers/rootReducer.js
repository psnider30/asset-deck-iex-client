import { combineReducers } from 'redux';
import manageEtfs from './manageEtfs.js';

export default combineReducers ({
  etfDeck: manageEtfs,
})
