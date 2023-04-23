const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV ?? 'development';

module.exports = {
  mode: env,
  entry: {
    react: ['react', 'react-dom'],
  },
  output: {
    filename: '__dll_[name].js',
    path: path.resolve(__dirname, 'dll'),
    library: '__dll_[name]',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DllPlugin({
      name: '__dll_[name]',
      path: path.resolve(__dirname, 'dll', 'manifest.json'),
    }),
  ],
};
