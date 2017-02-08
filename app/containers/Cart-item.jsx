import React from 'react';
import Format from 'format';
let { connect } = require('react-redux');
let actions = require('cartActions');

class CartItem extends React.Component {
  constructor(){
    super();
  }

  render() {
    let {dispatch, item, incrementLineItem, quantity} = this.props;

    let changeQuantity = (quantity) => {
      // console.log('cart Item object: ', item);
      dispatch(actions.startAddorUpdateCartItem(item, parseInt(quantity)));
    }

    return (
      <div className="cart-item">
        <div className="cart-item__img" style={{backgroundImage: 'url(' + item.imageVariants[2].src + ')'}}></div>
        <div className="cart-item__content">
          <div className="cart-item__content-row">
            <div className="cart-item__variant-title">{item.variant_title}</div>
            <span className="cart-item__title">{item.title}</span>
          </div>
          <div className="cart-item__content-row">
            <div className="cart-item__quantity-container">
              <button
                className="btn--seamless quantity-decrement"
                type="button"
                onClick={() => {changeQuantity(-1)}}
              ><span>-</span><span className="hide">Decrement</span></button>
              <input
                value={quantity}
                className="cart-item__quantity"
                type="number"
                min="0"
                readOnly
              />
              <button
                className="btn--seamless quantity-increment"
                type="button"
                onClick={() => {changeQuantity(1)}}
              ><span>+</span><span className="hide">Increment</span></button>
            </div>
            <span className="cart-item__price">{Format.asMoney(item.price*quantity)}</span>
          </div>
        </div>
      </div>
    )
  }
}


export default connect(
  (state) => {
    return {
      cart: state.cart
    }
  }
)(CartItem);
