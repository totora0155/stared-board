const path = require('path');

module.exports = {
  quiet: true,
  resolve: {
    root: [
      path.resolve('src/scripts')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      }
    ]
  }
};
