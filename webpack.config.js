var path = require("path");

module.exports = {
  entry: path.join(__dirname, '/src/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public')
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
