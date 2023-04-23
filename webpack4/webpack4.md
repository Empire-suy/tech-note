### 第三方模块（jQuery）
- 全局使用 $ window.$
  - 使用expose-loader
- 通过webpack.ProvidePlugin注入到每个模块（缺点：不能通过window.$获取）
  ```js
  new webpack.ProvidePlugin({
      $: 'jquery',
    }),
  ```
- 使用cdn引入 在externals 进行排除(使用import 引入也不会打包)

### 图片处理
- 在js中创建图片
> file-loader [默认在内部生成一张图片到build目录下]
> url-loader[可以将图片转为base64]
- 在css中使用
- 在html中使用
> html-loader

### 多页面应用
```js
module.exports = {
  entry: {
    entry1: 'entry1-file-path',
    ...
  },
  output: {
    filename: '[name][hash:8].js',
    path: path.resolve(__dirname, 'dist'),
  }
  plugins: [
    // 多个出口需要写多次
    new HtmlWebpackPlugin({
      template: 'template-path',
      filename: '输出模板的名1',
      chunks: ['需要注入的模块']
    }),
    new HtmlWebpackPlugin({
      template: 'template-path',
      filename: '输出模板的名2',
      chunks: ['需要注入的模块']
    })
    ...
  ],
  optimization: {
    // 抽离公共代码[一般在多入口的时候使用]
    splitChunks: {
      cacheGroups: {
        // 公共模块
        common: {
          // 在入口的开始抽离代码
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
        },
        vendor: {
          // 权重 执行的顺序
          priority: 1,
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
        }
      }
    }
  }
  ...
}
```

### 配置source-map 
配置devtool选项可以控制source-map如何生成

### 实时监控watch
watch设置为true，可以配置watchOptions设置webpack自动打包

### 常用的插件 
- clean-webpack-plugin 打包的时候清空打包的文件
- copy-webpack-plugin 把文件复制到打包的目录
- BannerPlugin 给每个chunk文件头部添加banner[具体配置](https://v4.webpack.docschina.org/plugins/banner-plugin)

### resolve配置
- modules 
- alias 别名
- mainFields 优先查找的顺序
- mainFiles 入口文件
- extensions 解析的时候自动补全扩展名

### 定义变量区分环境
定义变量可以通过插件 (webpack.DefinePlugin)[https://v4.webpack.docschina.org/plugins/define-plugin/]
可以通过不同的文件区分不同的环境，配置合并可以通过webpack-merge

### 优化项
- module.noParse import 的时候忽略解析这些文件
- webpack.IgnorePath 打包的时候忽略一些不需要的文件[比如说moment多语言的时候去掉一些不需要的语言文件] 
- dllPlugin 
  - 配置参考
    ```js
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

    ```
- 多线程 [happypack](https://github.com/amireh/happypack#readme)
  ```js
  module.exports = {
    plugins: [
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
    ],
    module: {
      rules: [
        {
          test: /.*\.js$/,
          use: 'happypack/loader',
          exclude: [/node_modules/],
        },
      ]
    }
  }
  ```

### webpack 默认的一些操作
- 在使用import 导入的时候会使用tree shaking
- 作用域提升 scope hosting 默认会自动省略一些计算(没别的??)

### webpack4.0 项目的基本配置
```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack');
const webpack = require('webpack');

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

```

#### dll的基本配置
```js
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

```