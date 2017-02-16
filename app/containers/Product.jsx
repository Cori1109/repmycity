import React from 'react';
import {Link} from 'react-router';
let {connect} = require('react-redux');
let productActions = require('productActions');
let cartActions = require('cartActions');
import {browserHistory} from 'react-router';

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


      return (
        <div className="container">
          <div className="product-index">
            <button onClick={browserHistory.goBack} className="button hollow">&lsaquo; Back to products</button>
            <h1 className="text-center">{title}</h1>
            <p className="text-center"><img src={images[0].src} alt="" /></p>
            <hr />
            {/* <p>Current options:</p> */}
            {/* {options.map(option => {
              return <p>{option.name}</p>
            })}
            {images.map(image => {
              return <img key={image.id} height="50" width="50" src={image.src} alt="" />
            })} */}
            <button
              onClick={()=>{
                dispatch(cartActions.startAddorUpdateCartItem(activeProduct.selectedVariant, 1));
              }}
              className="btn">Add To Cart</button>
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
