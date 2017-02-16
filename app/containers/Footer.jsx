import React from 'react';
import {Link, IndexLink} from 'react-router';

class Footer extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <footer id="site-footer">
        <nav className="footer-nav">
          <li>
            <Link to="/about" activeClassName="active">About</Link>
          </li>
          <li>
            <Link to="/products" activeClassName="active">Shop All</Link>
          </li>
          <li>
            <Link to="/contact" activeClassName="active">Contact</Link>
          </li>
          <li>
            <Link to="/upload" activeClassName="active">Upload Design</Link>
          </li>
        </nav>
        <p>Lorem ipsum dolar sit amit. Sed dono avec.</p>
      </footer>
    )
  }
}

module.exports = Footer;
