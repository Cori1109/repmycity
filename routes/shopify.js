let express = require('express');
let router = express.Router();
let shopifyAPI = require('shopify-node-api');
let cors = require('cors');

// Enable CORS
var whitelist = ['http://example1.com', 'http://example2.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Environment and variables
const NODE_ENV = (process.env.NODE_ENV || 'development');
let ENV = require('.././config/' + NODE_ENV + '.config');

// Establish connection with Shopify
let Shopify = new shopifyAPI({
  shop: ENV.SHOPIFY_SHOP,
  shopify_api_key: ENV.SHOPIFY_API_KEY,
  access_token: ENV.ACCESS_TOKEN
});

// Index route for Shopify
router.route('/')
  .get(cors(corsOptions), function (req, res) {
    console.log('getting data from Shopify...');
    Shopify.get('/admin/products.json', function(err, data, headers){
      res.json(data);
    });
  });

module.exports = router;


// var config = {
//   rate_limit_delay: 10000,
//   backoff: 35,
//   backoff_delay: 1000
// };
//
// var url = shopify.buildAuthURL();

// app.get('/finish_auth', function(req, res) {
//   var Shopify = new shopifyAPI(config), // You need to pass in your config here
//     query_params = req.query;
//   Shopify.exchange_temporary_token(query_params, function(err, data) {});
// });
//
// function callback(err, data, headers) {
//   var api_limit = headers['http_x_shopify_shop_api_call_limit'];
//   console.log(api_limit); // "1/40"
// }
//
// shopifyAPI.prototype.exchange_temporary_token = function(query_params, callback) {
//   if (!self.is_valid_signature(query_params)) {
//     return callback(new Error("Signature is not authentic!"));
//   }
// }
//
// app.post('/new_product', function(req, res) {
//   data = {
//     product: {
//       title: req.body.title,
//       body_html: req.body.body_html,
//       images: [
//         {
//           src: req.body.image_src
//         }
//       ],
//       vendor: "Vendor",
//       product_type: "Type"
//     }
//   }
//
//   shopify.post('/admin/products.json', data, function(err, resp, headers) {
//     if (err)
//       return next(error);
//     return res.json(resp);
//   });
// });
//
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }
//
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });
