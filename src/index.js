/*eslint-disable import/default */
import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/App.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import WebFont from 'webfontloader';
import store from './store';

WebFont.load({
  google: {
    families: ['Roboto Slab', 'Mukta Mahee', 'Quicksand']
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
// registerServiceWorker();
