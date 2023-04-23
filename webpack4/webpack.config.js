const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack');

const env = process.env.NODE_ENV ?? 'development';

module.exports = {
  mode: env,
  // mode: 'production',
  // entry: './src/index.js',
  // output: {
  //   filename: 'bundle.[hash:8].js',
  //   path: path.resolve(__dirname, 'build'),
  // },
  // 多页面应用
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'build'),
  },
  devServer: {
    port: 3000,
    compress: true,
    hot: true,
  },
  devtool: 'source-map',
  watch: false, // 生产模式false
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 500,
    ignored: /node_modules/,
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: true }),
    new CopyWebpackPlugin([
      {
        from: './dll',
        to: './',
      },
    ]),
    // 单页面应用
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: true,
    }),
    // 多页面时HtmlWebpackPlugin需要new多次 配合chunks注入指定的模块 filename指定输入出的文件名
    // new HtmlWebpackPlugin({
    //   template: './public/index.html',
    //   filename: 'index.html',
    //   minify: true,
    //   chunks: ['index'],
    // }),
    // new HtmlWebpackPlugin({
    //   template: './public/index.html',
    //   filename: 'other.html',
    //   minify: true,
    //   chunks: ['other'],
    // }),
    // 多线程配置
    new HappyPack({
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }]],
          },
        },
      ],
    }),
    // extract css to file
    new MiniCssExtractPlugin({
      filename: 'main.[hash:8].css',
    }),
    // clear the last packaged product
    new OptimizeCssAssetsPlugin(),
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    // }),
  ],
  // 不打包
  externals: {
    jQuery: '$',
  },
  module: {
    // noParse: /__dll_react/,
    rules: [
      // {
      //   test: require.resolve('jquery'),
      //   loader: 'expose-loader',
      //   options: {
      //     exposes: ['$', 'jQuery'],
      //   },
      // },
      // 处理html中的图片
      {
        test: /\.(htm|html)$/i,
        loader: 'html-loader',
      },
      // 处理图片文件，可以将图片转为base64
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100 * 1024,
          },
        },
      },
      {
        test: /.*\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
        ],
      },
      {
        test: /.*\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          'less-loader',
        ],
      },
      // 不开启多线程
      // {
      //   test: /.*\.js$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env', '@babel/preset-react'],
      //       plugins: [['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }]],
      //     },
      //   },
      // },
      // 开启多线程
      {
        test: /.*\.js$/,
        use: 'happypack/loader',
        exclude: [/node_modules/],
      },
    ],
  },
};
