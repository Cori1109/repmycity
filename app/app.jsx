import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import shopifyAPI from 'shopifyAPI';
import 'applicationStyles';

let cartActions = require('cartActions');
let productActions = require('productActions');
let collectionActions = require('collectionActions');
let store = require('configureStore').configure();
import router from './router/router.jsx';


// subscribe to the redux store
store.subscribe(() => {
  let state = store.getState();
  console.log('New state', state);
});

// add products and collections to store
store.dispatch(productActions.startAddProducts());
store.dispatch(collectionActions.startAddCollections());

// create shopify cart instance based on last session (based on localStorage)
if(localStorage.getItem('lastCartId')) {
  shopifyAPI.restoreCart().then((localCart) => {
    store.dispatch({ type: 'SET_INITIAL_CART_STATE', localCart });
  });
}else{
  shopifyAPI.createCart().then((localCart) => {
    store.dispatch({ type: 'SET_INITIAL_CART_STATE', localCart });
  });
}

// App css
// require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
