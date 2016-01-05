var webpack = require('webpack');
var PROD = (process.env.PROD);
var plugins = PROD ? [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
] : [];

module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'colors-from-string.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader'},
    ]
  },
  eslint: {
    formatter: require('eslint/lib/formatters/stylish'),
    configFile: './eslintrc'
  },
  plugins: plugins
};
