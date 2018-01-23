var webpack = require('webpack')
var path = require('path')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  context: projectRoot,
  entry: {
    form: './src/core/index.js'
  },
  devtool: "#source-map",
  externals: {
    'jquery': 'var jQuery',
    'vue': 'var Vue',
    'vuex': 'var Vuex',
    'lodash': 'var _'
  },
  output: {
    path: './dist',
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
}
