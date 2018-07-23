const path = require('path');
module.exports = {
  entry: [
    './src/index.js',  
  ],
  output: {
    filename: 'session.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'react-session',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  }
};
