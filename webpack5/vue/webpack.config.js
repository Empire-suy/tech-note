const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const isProdEnv = process.env.NODE_ENV === 'production';
const path = require('path');
const { DefinePlugin } = require('webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
const { VueLoaderPlugin } = require('vue-loader');
const ElementPlus = require('unplugin-element-plus/webpack');

const getStyleLoader = (pre) => {
  return [
    isProdEnv ? MiniCssExtractPlugin.loader : 'vue-style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env'],
        },
      },
    },
    pre
      ? {
          loader: pre,
          options:
            // 自定义Element-plus主题
            pre === 'sass-loader'
              ? {
                  additionalData: `@use "@/styles/element/index.scss" as *;`,
                }
              : {},
        }
      : pre,
  ].filter(Boolean);
};

module.exports = {
  mode: isProdEnv ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    clean: true,
    filename: '[name].[contenthash:10].js',
    chunkFilename: '[name].[contenthash:10].chunk.js',
    // 通过type: asset 形式导入的
    assetModuleFilename: 'static/media/[hash:10][ext][query]',
    path: isProdEnv ? path.resolve(__dirname, '../dist') : undefined,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, '../public/index.html') }),
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules',
      cache: true,
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslint-webpack-plugin/.eslintcache'),
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
            from: path.resolve(__dirname, '../public'),
            to: path.resolve(__dirname, '../dist'),
            globOptions: {
              ignore: ['**/index.html'],
            },
          },
        ],
      }),
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // TODO: 定制主题失败
    // ElementPlus({
    //   useSource: true,
    // }),
  ].filter(Boolean),
  module: {
    rules: [
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
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/vue-loader'),
          cacheCompression: false,
        },
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
  devtool: isProdEnv ? 'source-map' : 'cheap-module-source-map',
  optimization: {
    minimize: isProdEnv,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vue: {
          test: /[\\/]node_modules[\\/]vue(.*)?[\\/]/,
          name: 'vue-chunk',
          priority: 40,
        },
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: 'antd-chunk',
          priority: 30,
        },
        elementPlus: {
          test: /[\\/]node_modules[\\/]element-plus[\\/]/,
          name: 'element-plus-chunk',
          priority: 20,
        },
        libs: {
          test: /[\\/]node_modules[\\/]/,
          name: 'libs-chunk',
          priority: 5,
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}.js`,
    },
    minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()],
  },
  // 关闭性能分析
  performance: false,
  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
};
