import React from 'react';
import Slider from 'react-slick';
import {Link} from 'react-router';
let {connect} = require('react-redux');
let actions = require('cartActions');

import Loader from 'Loader';
import ProductItem from 'ProductItem';

class Index extends React.Component {
  constructor() {
    super();
  }

  handleAddToCart(product) {
    let {dispatch} = this.props;
    dispatch(actions.startAddorUpdateCartItem(product.selectedVariant, 1));
  }

  render() {
    let {products} = this.props;
    products = products.slice(0, 12);

    // slider settings
    var settings = {
      className: 'center products-carousel',
      infinite: true,
      centerPadding: '60px',
      autoplay: true,
      slidesToShow: 4,
      speed: 500,
      lazyLoad: true,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    };

    if (products.length > 0) {
      return (
        <div>
          <Slider {...settings}>
            {products.map((product, index) => {
              return (
                <div key={index} className="products-carousel-item">
                  <Link to={`/product/${product.attrs.product_id}`}><div className="product-item-image" style={{backgroundImage: 'url(' + product.selectedVariant.imageVariants[5].src + ')'}}></div></Link>
                </div>
              )
            })}
          </Slider>

          <div className="container">
            <h3>What's hot / What's new</h3>
            <div className="products-grid">
              {products.map(product => {
                return <ProductItem key={product.key} addToCart={() => this.handleAddToCart(product)} id={product.attrs.product_id} title={product.attrs.title} image={product.selectedVariant.imageVariants[5].src} />
              })}
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
)(Index);
