import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import fetchingData from '../reducers/fetchingDataReducer.js'
import financeData from '../reducers/financeData.js'

const middlewares = [thunk];

export default createStore {
  applyMiddleware(...middlewares)
}

// store = {
//   fetchingData: true,
//   financeData: {},
//   assetToUpdate: null,
//   timeSeries: '1 min',
// }
