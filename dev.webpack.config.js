var webpack = require('webpack');

module.exports = require('./scalajs.webpack.config');
module.exports.mode = "development";
module.exports.devtool = "eval";
module.exports.output.libraryTarget = "window";
