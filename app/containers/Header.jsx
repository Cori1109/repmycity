import React from 'react';
import {Link, IndexLink} from 'react-router';
let {connect} = require('react-redux');
let cartActions = require('cartActions');

class Header extends React.Component {
  constructor(){
    super();
  }

  render() {
    let {dispatch, cartItems} = this.props;

    return (
      <header id="site-header">
        <ul className="mini-nav">
          <li className="mini-nav-item"><Link to="/about" activeClassName="active">About</Link></li>
          <li className="mini-nav-item"><Link to="/order-status" activeClassName="active">Order Status</Link></li>
          <li className="mini-nav-item"><Link to="/map" activeClassName="active">Map</Link></li>
          <li className="mini-nav-item"><Link to="/login" activeClassName="active">Login</Link></li>
          <li className="mini-nav-item mini-nav-item-cart" onClick={()=>{
            dispatch(cartActions.openCart());
          }}><i className="fa fa-shopping-cart"></i> {cartItems > 0 ? '[' + cartItems + ']' : ''}</li>
        </ul>

        <div id="site-logo">
          <IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}><img src="/images/logo.png" /></IndexLink>
        </div>

        <nav id="site-nav">
          <li className="site-nav-item"><Link to="/products" activeClassName="active">Shop</Link></li>
          <li className="site-nav-item"><Link to="/my-city" activeClassName="active">My City</Link></li>
          <li className="site-nav-item"><Link to="/categories" activeClassName="active">Categories</Link></li>
          <div id="site-nav-upload">
            <Link to={`/upload`}><img src="/images/upload.png" /></Link>
          </div>
        </nav>
      </header>
    )
  }
}

export default connect(
  (state) => {
    return {
      cartItems: state.cart.lineItemsCount
    }
  }
)(Header);
