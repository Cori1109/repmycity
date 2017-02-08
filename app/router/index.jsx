import React from 'react';
import {Route, Router, IndexRoute, browserHistory} from 'react-router';
let {connect} = require('react-redux');
let store = require('configureStore').configure();

import DocumentMeta from 'react-document-meta';
import Main from 'Main';
import Index from 'Index';
import Products from 'Products';
import Product from 'Product';
import Collections from 'Collections';
import Collection from 'Collection';
import About from 'About';
import Contact from 'Contact';

import ReactGA from 'react-ga';
// ReactGA.initialize('UA-6241825-9'); // initialize Google Analytics

function logPageView(location) {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
}

browserHistory.listen((location) => {
  // logPageView(location);
});

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Index}/>
      <Route path='/collections'>
        <Route path='/collection/:collectionId' component={Collection} />
        <IndexRoute component={Collections}/>
      </Route>
      <Route path='/products'>
        <Route path="/product/:productId" component={Product}/>
        <IndexRoute component={Products}/>
      </Route>
      <Route path="about" component={About}/>
      <Route path="contact" component={Contact}/>
    </Route>
  </Router>
);
