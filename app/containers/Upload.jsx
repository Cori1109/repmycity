import React from 'react';
import {Link} from 'react-router';
let {connect} = require('react-redux');
let productActions = require('productActions');
let cartActions = require('cartActions');
import {browserHistory} from 'react-router';

class Upload extends React.Component {
  constructor(){
    super();
  }

  render() {
    let {dispatch} = this.props;

    return (
      <div className="container text-center">
        <img src="/images/upload-placeholder.png" />
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      activeProduct: state.products.active
    }
  }
)(Upload);
