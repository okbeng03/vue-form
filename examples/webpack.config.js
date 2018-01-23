var webpack = require('webpack')
var path = require('path')
var root = __dirname

module.exports = {
  context: root,
  entry: {
    'array': './array.js',
    'array-root': './array-root.js',
    'async-options': './async-options.js',
    'basic': './basic.js',
    'fieldset': './fieldset.js',
    'inline': './inline.js',
    'tab': './tab.js',
    'type': './type.js',
    'definition': './definition.js',
    'validate': './validate.js',
    'component': './component.js',
    'mutiple-instance': './mutiple-instance.js'
  },
  devtool: "#source-map",
  externals: {
    'jquery': 'var jQuery',
    'vue': 'var Vue',
    'vuex': 'var Vuex',
    'lodash': 'var _'
  },
  output: {
    path: path.resolve(root, './build'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.resolve(root, '../'),
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
  }
}
