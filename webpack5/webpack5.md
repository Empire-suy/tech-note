## webpack5
loader 的执行顺序 从右到左(从下到上)

对于其他的资源需要在loader配置[输出文件到指定位置]
如果配置文件不在根目录下，配置的绝对路径需要修改为相对与配置文件所在的路径

### 抽离样式
插件 mini-css-extract-plugin
使用
```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

new MiniCssExtractPlugin({
  filename: 'static/style/main.[hash:8].css' // 输入的文件名
})
```

### 样式兼容性
使用postcss，loader的位置 css-loader后面其他的loader之前

**安装**
```js
pnpm add postcss postcss-loader postcss-preset-env -D
```

**配置文件**
- postcss.config.js
```js
module.exports = {
  plugins: [
    'postcss-preset-env',
  ],
};
```

**兼容的浏览器版本**
在package.json 中添加browserslist字段,常用配置
```json
{
  "browserslist": [
    "last 2 version",
    "> 1%",
    "not dead"
  ]
}
```

### 样式压缩
使用插件 css-minimizer-webpack-plugin

### devtool
开发模式[只有行]
cheap-module-source-map
生产模式 [有行也有列]
source-map

### HMR
手动替换
```js
if (module.hot) {
  module.hot.accept('....js', cb)
}
```
在使用vue或者react的时候，可以使用vue-loader/react-hot-loader

### oneOf
只匹配一个loader

### includes/exclude
处理或者不处理某些文件

### 缓存
- babel-loader
  ```js
  {
    options: {
      cacheDirectory: true,
      cacheCompression: false,
    }
  }
  ```
- eslint
  ```js
  new EslintWebpackPlugin({
    context: path.resolve(__dirname, './src'),
    exclude: "node_modules",
    cache: true, // 开启缓存
    cacheLocation: path.resolve(__dirname, './node_modules/.cache/eslint-webpack-plugin/.eslintcache') // 缓存的位置
  })
  ```

### 多线程
使用thread-loader 如果在压缩js的时候也使用，需要手动导入terser插件并配置
使用webpack内置的插件 terser-webpack-plugin
```js
{
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './src'),
        use: [
          // 开启多进程
          {
            loader: 'thread-loader',
            options: {
              workers: threads,
            },
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
        ],
      },
    ]
  },
  optimization: {
     minimizer: [
      new CssMinimizerWebpackPlugin(), // 生产模式开启css压缩
      new TerserPlugin({ parallel: threads }), // 压缩js
    ],
  }
}
```
### babel 优化
抽离公共代码，减少打包的体积
```js [babel.config.js]
module.exports = {
  plugins: [
    '@babel/plugin-transform-runtime',
    // 转译class [需要安装@babel/runtime]
    '@babel/plugin-proposal-class-properties',
  ],
  presets: ['@babel/preset-env'],
};

```

### 图片优化
- 安装
```js
// 无损压缩
pnpm add image-minimizer-webpack-plugin imagemin imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev
// 有损压缩 []
pnpm add image-minimizer-webpack-plugin imagemin imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo
``` 

- 使用
```js
new ImageMinimizerPlugin({
  minimizer: {
    implementation: ImageMinimizerPlugin.imageminMinify,
    options: {
      // Lossless optimization with custom option
      // Feel free to experiment with options for better result for you
      // 如果是有损压缩，把下面几个压缩包换成对应的即可
      plugins: [
        ['gifsicle', { interlaced: true }]
        ['jpegtran', { progressive: true }],
        ['optipng', { optimizationLevel: 5 }],
        // Svgo configuration here https://github.com/svg/svgo#configuration
        [
          'svgo',
          {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                    addAttributesToSVGElement: {
                      params: {
                        attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                      },
                    },
                  },
                },
              },
            ],
          },
        ],
      ],
    },
  },
}),
```

### 提取公共代码
```js
{
  optimization: {
    // 代码分割，抽离公共代码
    splitChunks: {
      chunks: 'all',
    },
  },
}
```

### 动态导入
使用的时候使用import进行导入
- 动态导入的时候给文件起名
```js
// 使用的时候[魔法命名]
import(/* webpackChunkName: "filename" */ "path")

// 在output中配置
{
  output: {
    chunkFilename: 'path/[name].js' // 这里要相对路径 相对于打包的路径
  }
}
```

### preload/prefetch
插件 @vue/preload-webpack-plugin
```js
{
  plugins: [
    new PreloadWebpackPlugin({
      // rel: 'preload',
      // as: 'script',
      rel: 'prefetch',
    }),
  ]
}
```

### 高级缓存
```js
{
  optimization: {
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
}
```

### 兼容低版本语法
```js
// babel.config.js
module.exports = {
  plugins: [
    '@babel/plugin-transform-runtime',
    // 转译class [需要安装@babel/runtime]
    '@babel/plugin-proposal-class-properties',
  ],
  presets: [
    ['@babel/preset-env', { useBuiltIns: 'usage', corejs: { version: '3.8', proposals: true } }],
  ],
};

```
### 脚手架
#### React-cli


#### vue-cli