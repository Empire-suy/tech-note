const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');

const getStyleLoader = (pre) => {
  return [
    'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env'],
        },
      },
    },
    pre,
  ].filter(Boolean);
};

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: '[name].chunk.js',
    // 通过type: asset 形式导入的
    assetModuleFilename: 'static/media/[hash:8][ext][query]',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, '../public/index.html') }),
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules',
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        '../node_modules/.cache/eslint-webpack-plugin/.eslintcache'
      ),
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /.css$/,
            use: getStyleLoader(),
          },
          {
            test: /.less$/,
            use: getStyleLoader('less-loader'),
          },
          {
            test: /.s[ac]ss$/,
            use: getStyleLoader('sass-loader'),
          },
          {
            test: /.styl$/,
            use: getStyleLoader('stylus-loader'),
          },
          {
            test: /\.(png|jpe?g|webp|svg|gif)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024,
              },
            },
          },
          {
            test: /\.(woff2?|ttf)$/,
            type: 'asset/resource',
          },
          {
            test: /\.[tj]sx?$/,
            include: path.resolve(__dirname, '../src'),
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              // js 热更无效
              plugins: ['react-refresh/babel'],
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            },
          },
        ],
      },
    ],
  },
  devServer: {
    host: 'localhost',
    hot: true,
    port: 3000,
    // 路由找不到的时候重定向到index.html
    historyApiFallback: true,
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}.js`,
    },
  },
};
