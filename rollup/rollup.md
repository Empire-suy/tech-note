# rollup

### 配置

#### input
使用对象或者数组的方式

format不可以使用iife，支持自动提取公共代码，amd格式不支持直接在浏览器使用

#### output
- file 输出的文件名
- format 输入的格式

### 加载NPM模块
插件 @rollup/plugin-node-resolve

### 加载CommonJS模块
插件 @rollup/plugin-commonjs

### 代码拆分
> 在使用import动态导入的支持
output的format不支持iife，可以使用amd
需要指定dir属性，在输出的时候会产生多个文件

#### 运行
指定其他的配置文件名
```shell
rollup -c '配置文件名'
```

