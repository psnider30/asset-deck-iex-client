import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import changeLayout from '../reducers/changeLayout';
import manageAssets from '../reducers/manageAssets';
import users from '../reducers/usersReducer';
const middlewares = [thunk];

const reducers = combineReducers({
  manageAssets,
  changeLayout,
  users,
});

export default createStore (
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middlewares)
);
