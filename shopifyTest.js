const Shopify = require('shopify-api-node');
const shopify = new Shopify({
  shopName: process.env.SHOPIFY_API_SHOP_NAME,
  accessToken: process.env.SHOPIFY_API_ACCESS_TOKEN
});

shopify.customer.create({
  first_name: 'Julian'
}).then((response) => {
  console.log(response);
});
