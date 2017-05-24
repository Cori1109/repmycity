let React = require('react');
let ShopifyBuy = require('shopify-buy');
let store = require('configureStore').configure();

class shopifyAPI {
  constructor() {
    console.log('apiKey: ', ENV_CONFIG.SHOPIFY_BUY_API_KEY);
    console.log('domain: ', ENV_CONFIG.SHOPIFY_SHOP);
    this.buyClient = ShopifyBuy.buildClient({
      apiKey: ENV_CONFIG.SHOPIFY_BUY_API_KEY,
      domain: ENV_CONFIG.SHOPIFY_SHOP + '.myshopify.com',
      appId: 6
    });

    this.cart = {};
  }

  createCart() {
    return new Promise((resolve, reject) => {
      this.buyClient.createCart().then((newCart) => {
        localStorage.setItem('lastCartId', newCart.id);
        console.log('created new cart', newCart);
        // set singleton cart object to reference shopify cart
        this.cart = newCart;

        // set localCart (redux connected) to keep track of state changes
        let localCart = {
          isOpen: false,
          lineItemsCount: 0,
          lineItems: [],
          subtotal: 0
        }
        resolve(localCart);
      });
    });
  }

  restoreCart() {
    return new Promise((resolve, reject) => {
      this.buyClient.fetchCart(localStorage.getItem('lastCartId')).then((remoteCart) => {
        // set singleton cart object to reference shopify cart
        this.cart = remoteCart;

        // set localCart (redux connected) to keep track of state changes
        let localCart = {
          isOpen: false,
          lineItemsCount: remoteCart.lineItemCount,
          lineItems: remoteCart.lineItems,
          subtotal: remoteCart.subtotal
        }
        resolve(localCart);
      });
    });
  }
}

export default (new shopifyAPI);
