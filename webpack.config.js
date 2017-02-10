var webpack = require('webpack');
var path = require('path');
var StatsPlugin = require('stats-webpack-plugin');

var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
  entry: {
    app: './app/app.jsx',
    vendor: [
      'jquery',
      'react',
      'react-dom',
      'react-router',
      'react-redux',
      'shopifyAPI',
      'font-awesome-sass-loader',
      'react-document-meta'
    ]
  },
  plugins: PROD ? [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new StatsPlugin('stats.json', {
      chunkModules: true
    })
  ],
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './app/containers',
      './app/presentational',
      './app/vendor',
      './app/api',
      './app/utils'
    ],
    alias: {
      app: 'app',
      applicationStyles: 'app/styles/app.scss',
      cartActions: 'app/actions/cartActions.jsx',
      productActions: 'app/actions/productActions.jsx',
      collectionActions: 'app/actions/collectionActions.jsx',
      reducers: 'app/reducers/reducers.jsx',
      configureStore: 'app/store/configureStore.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/foundation-sites/scss')     
    ]
  },
  devtool: PROD ? 'cheap-module-source-map' : 'cheap-module-eval-source-map'
};
