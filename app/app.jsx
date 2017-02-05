import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import shopifyAPI from 'shopifyAPI';

let actions = require('actions');
let store = require('configureStore').configure();
import router from 'app/router/';

// subscribe to the redux store
store.subscribe(() => {
  let state = store.getState();
  console.log('New state', state);
});

// add products and collections to store
store.dispatch(actions.startAddProducts());
store.dispatch(actions.startAddCollections());

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
