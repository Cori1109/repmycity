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
import Upload from 'Upload';
import OrderStatus from 'OrderStatus';
import Map from 'Map';
import Login from 'Login';
import About from 'About';
import Contact from 'Contact';

import ReactGA from 'react-ga';
// ReactGA.initialize('UA-6241825-9'); // initialize Google Analytics

function logPageView(location) {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
}

browserHistory.listen((location) => {
  logPageView(location);

  // scroll to top when changing page
  window.scrollTo(0, 0);
});

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute path="/" component={Index} />
      <Route path="products" component={Products} />
      <Route path="product/:productId" component={Product} />
      <Route path='collections' component={Collections} />
      <Route path='collection/:collectionId' component={Collection} />
      <Route path="my-city" component={Products} />
      <Route path="upload" component={Upload} />
      <Route path="order-status" component={OrderStatus} />
      <Route path="map" component={Map} />
      <Route path="login" component={Login} />
      <Route path="about" component={About} />
      <Route path="contact" component={Contact} />
    </Route>
  </Router>
);


// const componentRoutes = {
//   component: 'Main',
//   path: '/',
//   indexRoute: { component: 'Index' },
//   childRoutes: [
//     {
//       path: 'collections',
//       getComponent(location, cb) {
//         System.import('Collections')
//           .then(module => cb(null, module.default));
//       }
//     },
//     {
//       path: 'collection/:collectionId',
//       getComponent(location, cb) {
//         System.import('Collection')
//           .then(module => cb(null, module.default));
//       }
//     },
//     {
//       path: 'products',
//       getComponent(location, cb) {
//         System.import('Products')
//           .then(module => cb(null, module.default));
//       }
//     },
//     {
//       path: 'product/productId',
//       getComponent(location, cb) {
//         System.import('Product')
//           .then(module => cb(null, module.default));
//       }
//     },
//     {
//       path: 'my-city',
//       getComponent(location, cb) {
//         System.import('Products')
//           .then(module => cb(null, module.default));
//       }
//     },
//     {
//       path: 'about',
//       getComponent(location, cb) {
//         System.import('About')
//           .then(module => cb(null, module.default));
//       }
//     },
//     {
//       path: 'contact',
//       getComponent(location, cb) {
//         System.import('Contact')
//           .then(module => cb(null, module.default));
//       }
//     },
//     {
//       path: 'upload',
//       getComponent(location, cb) {
//         System.import('Upload')
//           .then(module => cb(null, module.default));
//       }
//     },
//     {
//       path: 'map',
//       getComponent(location, cb) {
//         System.import('Map')
//           .then(module => cb(null, module.default));
//       }
//     },
//     {
//       path: 'login',
//       getComponent(location, cb) {
//         System.import('Login')
//           .then(module => cb(null, module.default));
//       }
//     },
//     {
//       path: 'order-status',
//       getComponent(location, cb) {
//         System.import('OrderStatus')
//           .then(module => cb(null, module.default));
//       }
//     }
//   ]
// };
