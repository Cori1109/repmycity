import React from 'react';
import {Link, IndexLink} from 'react-router';

class Header extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <header id="site-header">
        <nav className="main-nav">
          <li>
            <IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Home</IndexLink>
          </li>
          <li>
            <Link to="/collections" activeClassName="active"  activeStyle={{fontWeight: 'bold'}}>Collections</Link>
          </li>
          <li>
            <Link to="/products" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Products</Link>
          </li>
        </nav>
      </header>
    )
  }
}

module.exports = Header;
