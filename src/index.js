import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import WebFont from 'webfontloader';
import { sessionService } from 'redux-react-session';
import store from './store'

WebFont.load({
  google: {
    families: ['Roboto Slab', 'Mukta Mahee', 'Quicksand']
  }
});

// Init the sessions service
sessionService.initSessionService(store);

ReactDOM.render(
  <Provider store={store}>
    <App store={store}/>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
