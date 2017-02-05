import React from 'react';
import shopifyAPI from 'shopifyAPI';
let store = require('configureStore').configure();
let actions = require('actions');
import Cart from 'Cart';

class Store extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Cart />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

module.exports = Store;
