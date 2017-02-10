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
          <li className="mini-nav-item"><a href="#">About</a></li>
          <li className="mini-nav-item"><a href="#">Order Status</a></li>
          <li className="mini-nav-item"><a href="#">Map</a></li>
          <li className="mini-nav-item"><a href="#">Login</a></li>
        </ul>

        <div id="site-logo">
          <IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}><img src="/images/logo.png" /></IndexLink>
        </div>

        <nav id="site-nav">
          <li className="site-nav-item"><Link to="/products" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Shop</Link></li>
          <li className="site-nav-item"><a href="/my-city/">My City</a></li>
          <li className="site-nav-item"><Link to="/collections" activeClassName="active"  activeStyle={{fontWeight: 'bold'}}>Categories</Link></li>
          <div id="site-nav-upload">
            <img src="/images/upload.png" />
          </div>
        </nav>
      </header>
    )
  }
}

module.exports = Header;
