import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import rootReducer from './reducers/rootReducer.js'
import WebFont from 'webfontloader';
import store from './store'

WebFont.load({
  google: {
    families: ['Roboto Slab', 'Mukta Mahee', 'Quicksand']
  }
});

// wrap store in a function for testing purposes
// export function configureStore(){
//   return createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__());
// };
 // const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App store={store}/>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
