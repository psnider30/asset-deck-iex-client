import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import fetchingData from '../reducers/fetchingDataReducer.js'
import layout from '../reducers/changeLayout.js'
import assets from '../reducers/manageAssets.js';
import assetData from '../reducers/assetDataReducer.js';

const middlewares = [thunk];
const reducers = combineReducers({
  fetchingData,
  assets,
  layout,
  assetData,
})

export default createStore (
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middlewares)
)
