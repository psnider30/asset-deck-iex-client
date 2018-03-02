import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// import fetchingData from '../reducers/fetchingDataReducer.js'
import changeLayout from '../reducers/changeLayout';
import manageAssets from '../reducers/manageAssets';
import { sessionReducer } from 'redux-react-session';
// import assetData from '../reducers/assetDataReducer';
import { users } from '../reducers/usersReducer';
const middlewares = [thunk];
const reducers = combineReducers({
  manageAssets,
  changeLayout,
  users,
  sessions: sessionReducer,
})

export default createStore (
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middlewares)
)
