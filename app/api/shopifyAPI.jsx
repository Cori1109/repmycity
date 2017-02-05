var ShopifyBuy = require('shopify-buy');

const SHOP_CLIENT = ShopifyBuy.buildClient({
  apiKey: 'e0ab8cf9b5a30cee2616bf151a56c763',
  domain: 'rmc-preview.myshopify.com',
  appId: '6'
});

export default SHOP_CLIENT;


  // fetchProducts: function () {
  //   SHOP_CLIENT.fetchAllProducts().then((data) => {
  //     store.dispatch(actions.setProducts(data));
  //   });
  // },
  // getAllCollections: function () {
  //   return new Promise(function(resolve, reject) {
  //      resolve(SHOP_CLIENT.fetchAllCollections());
  //   });
  // },
  // getProduct: function (productId) {
  //   return SHOP_CLIENT.fetchProduct(productId);
  // },
  // getCollection: function (collectionHandle) {
  //   // fetch a product using resource id
  //   SHOP_CLIENT.fetchProduct(productId)
  //     .then(function (product) {
  //       console.log('product', product);
  //     })
  //     .catch(function () {
  //       console.log('Request failed');
  //     });
  // }
