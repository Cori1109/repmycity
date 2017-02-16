import React from 'react';
import {Link} from 'react-router';

class ProductItem extends React.Component {
  render() {
    let {title, id, image} = this.props;

    return (
      <div className="product-item">
        <div className="product-item-inner">
          <Link to={`/product/${id}`}><div className="product-item-image" style={{backgroundImage: 'url(' + image + ')'}}></div></Link>
          <hr />
          <h6 className="product-item-title"><Link to={`/product/${id}`}>{title}</Link></h6>
          <div className="author">
            <div className="author__photo" style={{backgroundImage: 'url(' + image + ')'}}></div>
            <div className="author__info">
              <Link to ={`/author/`}>
                <div className="author__name">James88</div>
                <div className="author__location">Canton Ohio</div>
              </Link>
            </div>
          </div>
          {/* <button onClick={this.props.addToCart} className="btn">Add To Cart</button> */}
        </div>
      </div>
    )
  }
}

module.exports = ProductItem;
