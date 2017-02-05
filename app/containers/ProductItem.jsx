import React from 'react';

class ProductItem extends React.Component {
  render() {
    let {title, id} = this.props;

    return (
      <div className="product-item">
        <div className="product-item-inner">
          <h6 className="text-center"><a href={'/product/' + id}>{title}</a></h6>
          <button onClick={this.props.addToCart} className="btn">Add To Cart</button>
        </div>
      </div>
    )
  }
}

module.exports = ProductItem;
