let webpack = require('webpack');
let path = require('path');
let Merge = require('webpack-merge');
let StatsPlugin = require('stats-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HTMLWebpackPlugin = require('html-webpack-plugin');
let autoprefixer = require('autoprefixer');
let PostCSS = require('./postcss.config');

// production or development environment?
const IS_PRODUCTION = (process.env.NODE_ENV === 'production');

// Extract sass into separate file
const extractSass = new ExtractTextPlugin({
  filename: IS_PRODUCTION ? '[name].min.[contenthash].css' : '[name].[contenthash].css'
});

// Static vendor assets for which one can expect
//  minimal and a slow rate of change:
const VENDOR_LIBS = [
  'jquery',
  'react',
  'react-dom',
  'react-router',
  'react-redux',
  'react-document-meta'
];


// Webpack config for both production and development environments
// ====================
const BASE_CONFIG = {
  entry: {
    bundle: path.resolve(__dirname, 'app/app'),
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'app/index.html'
    })
  ],
  resolve: {
    modules: [
      'node_modules',
      './app',
      './app/router',
      './app/containers',
      './app/presentational',
      './app/vendor',
      './app/api',
      './app/utils'
    ],
    alias: {
      app: 'app',
      router: 'router/router.jsx',
      cartActions: 'actions/cartActions.jsx',
      productActions: 'actions/productActions.jsx',
      collectionActions: 'actions/collectionActions.jsx',
      reducers: 'reducers/reducers.jsx',
      configureStore: 'store/configureStore.jsx',
      applicationStyles: 'styles/app.scss'
    },
    extensions: ['.js', '.jsx']
  }
};


// Webpack plugins unique to the production build:
const PROD_PLUGINS = [
];


// Webpack plugins unique to the development build:
const DEV_PLUGINS = [
];

// Webpack field-value pairs re: webpack-dev-server:
const PROD_CONFIG = {
};

// Webpack field-value pairs re: webpack-dev-server:
const DEV_CONFIG = {
  output: {
    filename: '[name].[hash].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    open: true,
    host: 'localhost',
    hot: true,
    inline: true,
    noInfo: false,
    port: 8080,
    historyApiFallback: true
  }
};

// Final Webpack configuration object constructed
//  conditionally according to the NODE_ENV value:
const AGGREGATE_CONFIG = IS_PRODUCTION
  ? Merge(BASE_CONFIG, PROD_CONFIG, { plugins: PROD_PLUGINS })
  : Merge(BASE_CONFIG, DEV_CONFIG, { plugins: DEV_PLUGINS });

export default AGGREGATE_CONFIG;
