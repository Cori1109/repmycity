import * as redux from 'redux';
import thunk from 'redux-thunk';

import {productsReducer, collectionsReducer, cartReducer, navReducer} from 'reducers';

export let configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    products: productsReducer,
    collections: collectionsReducer,
    cart: cartReducer,
    nav: navReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
