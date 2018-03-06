/* global __dirname, require, module*/

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const env  = require('yargs').argv.env; // use --env with webpack 2

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
let libraryName = 'Js';

let plugins = [], outputFile, outputPath;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
  outputPath = __dirname + '/lib';
} else {
  outputFile = libraryName + '.js';
  outputPath = __dirname + '/demo';
  plugins.push(new BrowserSyncPlugin({
      host: 'localhost',
      port: 3100,
      server: {
        baseDir: ['demo']
      },
      files: [outputPath + '/*']
    }));
}

const config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: outputPath,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: plugins
};

module.exports = config;
