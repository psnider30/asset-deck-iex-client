import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import fetchingData from '../reducers/fetchingDataReducer.js'
import timeSeriesChange from '../reducers/timeSeriesChange.js'
import manageAssets from '../reducers/manageAssets.js';

const middlewares = [thunk];
const reducers = combineReducers({
  fetchingData,
  manageAssets,
  timeSeriesChange,
})

export default createStore (
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middlewares)
)
