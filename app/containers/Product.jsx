import React from 'react';
import {Link} from 'react-router';
let {connect} = require('react-redux');
let productActions = require('productActions');
let cartActions = require('cartActions');
import {browserHistory} from 'react-router';
import Format from 'format';

import Loader from 'Loader';

class Product extends React.Component {
  constructor(){
    super();

    let dispatch;
  }

  componentWillMount(){
    this.dispatch = this.props.dispatch;
    this.dispatch(productActions.setActiveProduct(this.props.params.productId));
  }

  componentWillUnmount(){
    this.dispatch(productActions.clearActiveProduct());
  }

  render() {
    let activeProduct;
    activeProduct = this.props.activeProduct;
    if (activeProduct){
      let {dispatch} = this.props;
      let {product_id, title, images, options} = activeProduct.attrs;
      let {description, selectedVariant} = activeProduct;

      console.log(activeProduct);
      return (
        <div className="container">
          <div className="row">
            <div className="small-12 medium-8 column">
              <button onClick={browserHistory.goBack} className="button hollow">&lsaquo; Back to products</button>
              <p className="text-center"><img src={images[0].src} alt="" /></p>
              {/* <p>Current options:</p> */}
              {/* {options.map(option => {
                return <p>{option.name}</p>
              })}
              {images.map(image => {
                return <img key={image.id} height="50" width="50" src={image.src} alt="" />
              })} */}
            </div>
            <div className="small-12 medium-4 column">
              <h1 className="product-title">{title}</h1>
              <div className="product-info">
                <h5 className="product-info__headline">Artist</h5>
                <p>JWISH88</p>

                <h5 className="product-info__headline">Description</h5>
                <div dangerouslySetInnerHTML={{__html: description}}></div>

                <div className="product-style">
                  <input type="text" placeholder="Select style" />
                  <button type="submit" className="product-style__button"><i className="fa fa-caret-right"></i></button>
                </div>

                <ul className="product-sizes">
                  <li className="product-size">S</li>
                  <li className="product-size">M</li>
                  <li className="product-size">L</li>
                  <li className="product-size">XL</li>
                  <li className="product-size">2XL</li>
                  <li className="product-size">3XL</li>
                </ul>

                <div className="product-price">{Format.asMoney(selectedVariant.price)}</div>

                <div className="product-charity">
                  <input type="text" placeholder="Choose Charity" />
                  <button type="submit" className="product-charity__button"><i className="fa fa-caret-right"></i></button>
                  <div className="product-charity__more-info"><i className="fa fa-info-circle"></i> <a href="#">more info</a></div>
                </div>

                <button
                  onClick={()=>{
                    dispatch(cartActions.startAddorUpdateCartItem(activeProduct.selectedVariant, 1));
                  }}
                  className="button large add-to-cart">Add To Cart</button>
                <img src="/images/credit-cards.png" alt="Accepted credit cards" />
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
      activeProduct: state.products.active
    }
  }
)(Product);
