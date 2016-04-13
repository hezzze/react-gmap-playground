var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToGoogleMapReact = path.resolve(node_modules, 'google-map-react/dist/GoogleMapReact.js');

var config = {
  entry: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      path.resolve(__dirname, 'app/main.jsx')
    ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'assets'],
    alias: {
      'google-map-react': pathToGoogleMapReact
    }
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015'],
        plugins: ['babel-plugin-transform-decorators-legacy', 'babel-plugin-transform-class-properties', 'babel-plugin-transform-object-rest-spread']
      }
    },{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /(png|jpg|jpeg|gif|svg)/,
      loader: 'url-loader?limit=10000'
    }],
    noParse: [pathToGoogleMapReact]
  }
};

module.exports = config;
