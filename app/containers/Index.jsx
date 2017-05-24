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
      arrows: false,
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
 
          <section className="section-callout">
            <div className="container">
              <h4 className="section-headline">Show your pride. Display your talents. <span className="font-white">Rep your city.</span></h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper nulla vel elit gravida, vel placerat turpis convallis. Praesent eu lorem suscipit, gravida leo sed, luctus erat. Nullam consectetur, tortor a facilisis lobortis, velit massa mattis risus, eget imperdiet velit arcu non mauris. Mauris bibendum bibendum ligula, nec maximus sapien porta non.</p>
              <div className="section-callout__cta-items">
                <Link to={`/products`}><img src="/images/button-shop.png" alt="Shop now" /></Link>
                <div className="search-box">
                  <i className="fa fa-search" />
                  <input tyep="text" placeholder="Keyword Search" />
                </div>
                <Link to={`/upload`}><img src="/images/button-upload.png" alt="Shop now" /></Link>
              </div>
            </div>
          </section>

          <div className="container">
            <h3 className="products-grid-title">What's hot / What's new</h3>
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
