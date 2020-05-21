var webpack = require('webpack');

module.exports = require('./scalajs.webpack.config');

// NOTE: development is useful for debugging but apparently it breaks the build for Chrome
// with the current settings.
module.exports.mode = "production";

// by default, scalajs-bundler sets this to "var" but that breaks the build for Firefox.
module.exports.output.libraryTarget = "window";

module.exports.entry.main = [
    "/home/dell/projects/mine/chrome-scalajs-template/src/main/resources/scripts/sidenav/customSidenav.js"
].concat(module.exports.entry.main);

module.exports.module = {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
 };