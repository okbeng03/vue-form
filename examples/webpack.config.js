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
    // 'tabs': './tabs.js',
    'type': './type.js',
    'definition': './definition.js',
    'validate': './validate.js',
    'editor': './editor.js',
    'image-upload': './image-upload.js'
  },
  devtool: "#source-map",
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  output: {
    path: path.resolve(root, './build'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(root, '../'),
        exclude: /node_modules/
      },
      // {
      //   test: /\.css$/,
      //   loader: 'style!css'
      // }, {
      //   test: /\.less$/,
      //   loader: 'style!css!less'
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}
