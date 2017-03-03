const Shopify = require('shopify-api-node');
const shopify = new Shopify({
  shopName: 'rmc-preview',
  accessToken: 'd93602932b8cd1585fb2b35c6cfbda9517054645f6cefa5f3b28cdff8ada4899'
});

shopify.customer.create({
  first_name: 'Julian'
}).then((response) => {
  console.log(response);
});
