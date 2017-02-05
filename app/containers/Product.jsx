import React from 'react';
let { connect } = require('react-redux');
let actions = require('actions');

class Product extends React.Component {
  constructor(){
    super();
  }

  componentWillMount(){
    let {dispatch} = this.props;
    dispatch(actions.setActiveProduct(this.props.params.productId));
  }

  render() {
    let product;
    product = this.props.product;
    if (product){
      let {dispatch} = this.props;
      let {product_id, title, images, options} = product;

      return (
        <div className="product-index">
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
          <button onClick={()=>dispatch(actions.addToCart(product))} className="btn">Add To Cart</button>
        </div>
      )
    }else{
      return (
        <div>Loading product...</div>
      )
    }
  }
}

export default connect(
  (state) => {
    return {
      product: state.products.active
    }
  }
)(Product);
