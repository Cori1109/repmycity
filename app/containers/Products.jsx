import React from 'react';
let {connect} = require('react-redux');
let actions = require('cartActions');

import Loader from 'Loader';

import Product from 'Product';
import ProductItem from 'ProductItem';

class Products extends React.Component {
  constructor() {
    super();
  }

  handleAddToCart(product) {
    let {dispatch} = this.props;
    dispatch(actions.startAddorUpdateCartItem(product.selectedVariant, 1));
  }

  render() {
    let {products} = this.props;

    if (products.length > 0) {
      return (
        <div className="container">
          <div className="row">
            <div className="small-3 columns">
              <nav className="products-nav">
                <h2>Categories</h2>
                <ul>
                  <li>City / state</li>
                  <li>Sports</li>
                  <li>Hobbies</li>
                  <li>Music</li>
                  <li>Animals</li>
                </ul>

                <h2>Style</h2>
                <ul>
                  <li>City / state</li>
                  <li>Sports</li>
                  <li>Hobbies</li>
                  <li>Music</li>
                  <li>Animals</li>
                </ul>
              </nav>
            </div>
            <div className="small-9 column">
              <div className="products-grid">
                {products.map(product => {
                  return <ProductItem key={product.key} addToCart={() => this.handleAddToCart(product)} id={product.attrs.product_id} title={product.attrs.title} image={product.selectedVariant.imageVariants[4].src} />
                })}
              </div>
            </div>
          </div>
        </div>
      )
    }else{
      return (
        <Loader />
      )
    }
  }
}

export default connect(
  (state) => {
    return {
      products: state.products.all
    }
  }
)(Products);
