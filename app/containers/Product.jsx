import React from 'react';
import {Link} from 'react-router';
let { connect } = require('react-redux');
let actions = require('actions');

import Loader from 'Loader';

class Product extends React.Component {
  constructor(){
    super();

    let dispatch;
  }

  componentWillMount(){
    this.dispatch = this.props.dispatch;
    this.dispatch(actions.setActiveProduct(this.props.params.productId));
  }

  componentWillUnmount(){
    this.dispatch(actions.clearActiveProduct());
  }

  render() {
    let activeProduct;
    activeProduct = this.props.activeProduct;
    if (activeProduct){
      let {dispatch} = this.props;
      let {product_id, title, images, options} = activeProduct;

      return (
        <div className="product-index">
          <Link to="/products" className="button hollow">&lsaquo; Back to products</Link>
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
          <button onClick={()=>dispatch(actions.addToCart(activeProduct))} className="btn">Add To Cart</button>
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
