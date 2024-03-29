const path = require('path')

const pkg = require('../package.json')

const rootPath = path.resolve(__dirname, '../')

const config = {
  mode: 'production',
  entry: path.resolve(rootPath, 'index.js'),
  output: {
    filename: `${pkg.name}.min.js`,
    path: path.resolve(rootPath, 'dist'),
    library: `EStorage`,
    libraryTarget: 'umd'
  },
  externals: {

  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  }
}

module.exports = config
