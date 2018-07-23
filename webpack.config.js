const path = require('path');
module.exports = {
  entry: [
    './src/index.js',  
  ],
  output: {
    filename: 'session.js',
    path: path.resolve(__dirname, 'dist')
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
  externals:{
    "react": "React",
    "react-dom": "ReactDOM",
    "prop-types": "PropTypes"
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  }
};
