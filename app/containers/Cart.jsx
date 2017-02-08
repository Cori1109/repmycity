import React from 'react';
let { connect } = require('react-redux');
let actions = require('cartActions');

import shopifyAPI from 'shopifyAPI';
import CartItem from 'Cart-item';

import Format from 'format';

class Cart extends React.Component {
  constructor(){
    super();

    let dispatch;
    let handleCheckout = this.handleCheckout();
  }

  componentWillMount() {
    this.dispatch = this.props.dispatch;
  }

  handleCloseCart() {
    this.dispatch(actions.closeCart());
  }

  handleCheckout() {
    window.open(shopifyAPI.cart.checkoutUrl, '_self');
  }

  render() {
    let {isOpen, lineItems, lineItemCount, subtotal} = this.props.cart;
    let renderLineItems = () => {
      if (lineItems.length > 0){
        return lineItems.map(lineItem => {
          return <CartItem
            key={lineItem.id}
            item={lineItem}
            quantity={lineItem.quantity}
          />
        });
      }
    };

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
              {renderLineItems()}
            </div>
          </div>

          <div className="cart-bottom">
            <div className="cart-info clearfix cart-section">
              <div className="type--caps cart-info__total cart-info__small">Total</div>
              <div className="cart-info__pricing">
                <span className="cart-info__small cart-info__total">USD</span>
                <span className="pricing pricing--no-padding">{Format.asMoney(subtotal)}</span>
              </div>
            </div>
            <div className="cart-actions-container cart-section type--center">
              <div className="cart-discount-notice cart-info__small">Shipping and discount codes are added at checkout.</div>
              <input
                type="submit"
                className="btn btn--cart-checkout"
                id="checkout"
                name="checkout"
                value="Checkout"
                onClick={this.handleCheckout}
              />
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
