import React from 'react';
import {Link} from 'react-router';
let {connect} = require('react-redux');
import FacebookProvider, { Login } from 'react-facebook';

class Upload extends React.Component {
  constructor(){
    super();
  }

  onFacebookResponse(data, user_data) {
    console.log(user_data);
  }

  render() {
    let {dispatch} = this.props;

    return (

      <div className="container text-center">
        <FacebookProvider appID="170767116762303">
          <Login scope="email" onResponse={this.onFacebookResponse.bind(this)}>
            <span>Login via Facebook</span>
          </Login>
        </FacebookProvider>

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
