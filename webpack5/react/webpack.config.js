const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const path = require('path');

const isProdEnv = process.env.NODE_ENV === 'production';

const getStyleLoader = (pre) => {
  return [
    isProdEnv ? MiniCssExtractPlugin.loader : 'style-loader',
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
  mode: isProdEnv ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    clean: true,
    filename: '[name].[contenthash:10].js',
    chunkFilename: '[name].[contenthash:10].chunk.js',
    // 通过type: asset 形式导入的
    assetModuleFilename: 'static/media/[hash:10][ext][query]',
    path: isProdEnv ? path.resolve(__dirname, './dist') : undefined,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, './public/index.html') }),
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, './src'),
      exclude: 'node_modules',
      cache: true,
      cacheLocation: path.resolve(__dirname, './node_modules/.cache/eslint-webpack-plugin/.eslintcache'),
    }),
    isProdEnv &&
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:10].css',
        chunkFilename: '[name].[contenthash:10].chunk.css',
      }),
    isProdEnv &&
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './public'),
            to: path.resolve(__dirname, './dist'),
            globOptions: {
              ignore: ['**/index.html'],
            },
          },
        ],
      }),
    !isProdEnv && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
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
            include: path.resolve(__dirname, './src'),
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              plugins: [!isProdEnv && 'react-refresh/babel'].filter(Boolean),
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            },
          },
        ],
      },
    ],
  },
  devtool: isProdEnv ? 'source-map' : 'cheap-module-source-map',
  devServer: {
    host: 'localhost',
    hot: true,
    port: 3000,
    // 路由找不到的时候重定向到index.html
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
          name: 'chunk-react',
          priority: 40,
        },
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: 'chunk-antd',
          priority: 30,
        },
        libs: {
          test: /[\\/]node_modules[\\/]/,
          name: 'chunk-libs',
          priority: 20,
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}.js`,
    },
    minimize: isProdEnv,
    minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()],
  },
  // 关闭性能分析
  performance: false,
};
