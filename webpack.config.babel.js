import webpack from 'webpack';
import path from 'path';
import Merge from 'webpack-merge';
import StatsPlugin from 'stats-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import PostCSS from './postcss.config';
import CopyWebpackPlugin from 'copy-webpack-plugin';

// define environment constants
const NODE_ENV = (process.env.NODE_ENV || 'development');
const IS_PRODUCTION = (NODE_ENV === 'production');

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
    path: path.join(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: extractSass.extract({
          loader: [
            {
              loader: 'css-loader?-svgo',
              options: {
                minimize: IS_PRODUCTION ? true : false,
                sourceMap: IS_PRODUCTION ? false : true
              }
            },
            {
              loader: 'postcss-loader',
              options: PostCSS
            },
            {
              loader: 'sass-loader'
            }
          ],
          // use style-loader in development
          fallbackLoader: 'style-loader'
        })
      },
      {
        test: /\.json$/i,
        use: 'json'
      },
      {
        test: /\.pdf$/i,
        use: 'file?name=/docs/[name].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url',
            options: { limit: 40000 }
          },
          'file?name=/images/[name].[ext]',
          'image-webpack-loader'
        ]
      },
      {
        test: /\.woff$/,
        use: 'url?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]'
      },
      {
        test: /\.woff2$/,
        use: 'url?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        context: 'app',
        from: 'assets'
      }
    ]),
    new webpack.DefinePlugin({
      // Dynamically access local environment variables based on the environment
      ENV_CONFIG: JSON.stringify(require('./config/' + NODE_ENV + '.config')),
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    extractSass,
    new HTMLWebpackPlugin({
      template: 'app/index.html'
    })
  ],
  devtool: `${IS_PRODUCTION ? 'inline' : 'cheap-eval'}-source-map`,
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
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false
    },
    output: {
      comments: false
    }
  }),
  new webpack.optimize.AggressiveMergingPlugin()
];


// Webpack plugins unique to the development build:
const DEV_PLUGINS = [
  new webpack.HotModuleReplacementPlugin(),
  new StatsPlugin('stats.json', {
    chunkModules: true
  })
];

// Webpack field-value pairs re: webpack-dev-server:
const PROD_CONFIG = {
  output: {
    filename: '[name].min.[hash].js'
  }
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
    port: 3000,
    historyApiFallback: true
  }
};

// Final Webpack configuration object constructed
//  conditionally according to the NODE_ENV value:
const AGGREGATE_CONFIG = IS_PRODUCTION
  ? Merge(BASE_CONFIG, PROD_CONFIG, { plugins: PROD_PLUGINS })
  : Merge(BASE_CONFIG, DEV_CONFIG, { plugins: DEV_PLUGINS });

export default AGGREGATE_CONFIG;
