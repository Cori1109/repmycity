import React from 'react';
let { connect } = require('react-redux');
let actions = require('actions');

import CartItem from 'Cart-item';

class Cart extends React.Component {

  handleCloseCart() {
    let {dispatch} = this.props;
    dispatch(actions.closeCart());
  }

  render() {
    let {isOpen, items} = this.props.cart;

    return (
      <div className={"cart " + (isOpen ? 'js-active' : '' )}>
        <div className="cart-section cart-section--top">
          <h2 className="cart-title">Your cart: {isOpen}</h2>
          <button className="btn--close">
            <div onClick={this.handleCloseCart.bind(this)}>×</div>
            <span className="hide">Close</span>
          </button>
        </div>

        <div className="cart-form">
          <div className="cart-item-container cart-section">
            <div>
              {items.map(item => {
                // return <div key={item.product_id}>cart item</div>
                return <CartItem key={item.product_id} item={item} />
              })}
            </div>
          </div>

          <div className="cart-bottom">
            <div className="cart-info clearfix cart-section">
              <div className="type--caps cart-info__total cart-info__small">Total</div>
              <div className="cart-info__pricing">
                <span className="cart-info__small cart-info__total">USD</span>
                <span className="pricing pricing--no-padding"></span>
              </div>
            </div>
            <div className="cart-actions-container cart-section type--center">
              <div className="cart-discount-notice cart-info__small">Shipping and discount codes are added at checkout.</div>
              <input type="submit" className="btn btn--cart-checkout" id="checkout" name="checkout" value="Checkout" />
            </div>
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
)(Cart);
