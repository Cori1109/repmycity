import React from 'react';

class CartItem extends React.Component {
  render() {
    let {id, title, variantTitle, quantity, price, images} = this.props.item;

    // console.log(imageThumb);
    let cartItemThumbStyle = {
      backgroundImage: 'url(' + images[0].src + ')'
    }

    return (
      <div className="cart-item">
        <div className="cart-item__img" style={cartItemThumbStyle}></div>
        <div className="cart-item__content">
          <div className="cart-item__content-row">
            <div className="cart-item__variant-title">{variantTitle}</div>
            <span className="cart-item__title">{title}</span>
          </div>
          <div className="cart-item__content-row">
            <div className="cart-item__quantity-container">
              <button className="btn--seamless quantity-decrement" type="button"><span>-</span><span className="hide">Decrement</span></button>
              <input defaultValue="1" className="cart-item__quantity" type="number" min="0" />
              <button className="btn--seamless quantity-increment" type="button"><span>+</span><span className="hide">Increment</span></button>
            </div>
            <span className="cart-item__price">{price}</span>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = CartItem;
