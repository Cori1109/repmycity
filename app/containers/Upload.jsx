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

    console.log('fb app id: ', process.env.FB_APP_ID);
    console.log('Shopify API key: ', process.env.SHOPIFY_API_KEY);
    console.log('Shopify API password: ', process.env.SHOPIFY_API_PASSWORD);
    console.log('Shopify shop name: ', process.env.SHOPIFY_SHOP_NAME);
    console.log('Shopify api access tokenn: ', process.env.SHOPIFY_API_ACCESS_TOKEN);

    // axios.get('https://3f65ac6bcc5e4bb064776dc47b464c8f:326d1ba3916b9c719a848c9a9999fa5c@rmc-preview.myshopify.com/admin/orders.json').then((data) => {
    //   // Respond to the express call
    //   // res.json(data);
    //   console.log('data: ', data);
    // });

    return (

      <div className="container text-center">
        <FacebookProvider appID={process.env.FB_APP_ID}>
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
