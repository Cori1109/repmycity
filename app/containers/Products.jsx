import React from 'react';
let {connect} = require('react-redux');
let actions = require('cartActions');
import Loader from 'Loader';
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
            <div className="small-12 medium-3 columns">
              <nav className="products-nav">
                <h4 className="products-nav__headline">Categories</h4>
                <ul>
                  <li>City / state</li>
                  <li>Sports</li>
                  <li>Hobbies</li>
                  <li>Music</li>
                  <li>Animals</li>
                  <li>Show all</li>
                </ul>

                <h4 className="products-nav__headline">Style</h4>
                <div className="products-nav__search">
                  <input type="text" placeholder="Select style" />
                  <button type="submit" className="products-nav__search-button"><i className="fa fa-search"></i></button>
                </div>

                <h4 className="products-nav__headline">Search</h4>
                <div className="products-nav__search">
                  <input type="text" placeholder="Enter keywords" />
                  <button type="submit" className="products-nav__search-button"><i className="fa fa-search"></i></button>
                </div>

              </nav>
            </div>
            <div className="small-12 medium-9 column">
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
