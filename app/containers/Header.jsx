import React from 'react';
import {Link, IndexLink} from 'react-router';

class Header extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <header id="site-header">
        <ul className="mini-nav">
          <li className="mini-nav-item"><Link to="/about" activeClassName="active">About</Link></li>
          <li className="mini-nav-item"><Link to="/order-status" activeClassName="active">Order Status</Link></li>
          <li className="mini-nav-item"><Link to="/map" activeClassName="active">Map</Link></li>
          <li className="mini-nav-item"><Link to="/login" activeClassName="active">Login</Link></li>
        </ul>

        <div id="site-logo">
          <IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}><img src="/images/logo.png" /></IndexLink>
        </div>

        <nav id="site-nav">
          <li className="site-nav-item"><Link to="/products" activeClassName="active">Shop</Link></li>
          <li className="site-nav-item"><Link to="/my-city" activeClassName="active">My City</Link></li>
          <li className="site-nav-item"><Link to="/collections" activeClassName="active">Categories</Link></li>
          <div id="site-nav-upload">
            <Link to={`/upload`}><img src="/images/upload.png" /></Link>
          </div>
        </nav>
      </header>
    )
  }
}

module.exports = Header;
