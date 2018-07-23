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
    'react': {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    }
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  }
};
