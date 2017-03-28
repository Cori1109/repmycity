import React from 'react';
import {Link} from 'react-router';
let {connect} = require('react-redux');
import FacebookProvider, { Login } from 'react-facebook';
import axios from 'axios';

class Upload extends React.Component {
  constructor(){
    super();
  }

  onFacebookResponse(data, user_data) {
    console.log(user_data);
  }

  render() {
    let {dispatch} = this.props;

    console.log('ENV: ', ENV);

    console.log('fb app id: ', ENV.FB_APP_ID);
    console.log('Shopify API key: ', ENV.SHOPIFY_API_KEY);
    console.log('Shopify API password: ', ENV.SHOPIFY_API_PASSWORD);
    console.log('Shopify shop name: ', ENV.SHOPIFY_SHOP_NAME);
    console.log('Shopify api access tokenn: ', ENV.SHOPIFY_API_ACCESS_TOKEN);

    axios.get('https://<app-key>:<app-password>@rmc-preview.myshopify.com/admin/orders.json').then((data) => {
      // Respond to the express call
      // res.json(data);
      console.log('data: ', data);
    });

    return (

      <div className="container text-center">
        <FacebookProvider appID={ENV.FB_APP_ID}>
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
