var path = require('path')
var webpack = require('webpack')
var webpackConfig = require('./webpack.config.js')
var ora = require('ora')

var spinner = ora('vue form building...')
spinner.start()

var compiler = webpack(webpackConfig)

compiler.watch({
  aggregateTimeout: 300,
  poll: true
}, function(err, stats) {
  spinner.stop()

  if (err) throw err

  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    progress: true
  }) + '\n')
})
