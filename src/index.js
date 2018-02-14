import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer.js'
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Roboto Slab', 'Crimson Text', 'Roboto']
  }
});

// wrap store in a function for testing purposes
export function configureStore(){
  return createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__());
};
 const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
