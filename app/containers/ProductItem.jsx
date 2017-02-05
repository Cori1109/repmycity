import React from 'react';
import {Link} from 'react-router';

class ProductItem extends React.Component {
  render() {
    let {title, id, image} = this.props;

    return (
      <div className="product-item">
        <div className="product-item-inner">
          <Link to={`/product/${id}`}><div className="product-item-image" style={{backgroundImage: 'url(' + image.src + ')'}}></div></Link>
          <hr />
          <h6 className="text-center"><Link to={`/product/${id}`}>{title}</Link></h6>
          <button onClick={this.props.addToCart} className="btn">Add To Cart</button>
        </div>
      </div>
    )
  }
}

module.exports = ProductItem;
