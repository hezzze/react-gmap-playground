var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
  entry: {
    app: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/main.jsx')],
    vendors: ['react', 'google-map-react', 'faker', 'alt']
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'assets']
  },
  debug: true,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    sourceMapFilename: '[file].map'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015'],
        plugins: ['babel-plugin-transform-decorators-legacy', 'babel-plugin-transform-class-properties', 'babel-plugin-transform-object-rest-spread']
      },
      exclude: /node_modules/
    },{
      test: /\.css$/,
      loader: 'css'
    }, {
      test: /(png|jpg|jpeg|gif|svg)/,
      loader: 'url-loader?limit=10000'
    }, {
      test: /\.sass$/,
      loader: ExtractTextPlugin.extract('style', 'css!sass')
    }]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ],
  devtool: 'source-map'
};

module.exports = config;
