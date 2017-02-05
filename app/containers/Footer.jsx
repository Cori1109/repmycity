import React from 'react';
import {Link, IndexLink} from 'react-router';

class Footer extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <footer id="site-footer">
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
      </footer>
    )
  }
}

module.exports = Footer;
