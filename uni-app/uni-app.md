## 目录结构

pages 页面存放目录
static 静态文件资源目录
App.vue 应用入口文件  和小程序app.js 类似
main.js 应用入口文件 注册Vue等
manifest.json 项目配置
pages.json 页面配置

common 存放公用的文件
components 自定义组件目录
store vuex目录
unpackage 编译后的文件存放目录

### 生命周期

#### 应用的生命周期

在App.vue中

```js
  onLaunch: function() {
    // 登录的声明周期，全局处理
    console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
```

#### 页面的生命周期

```js
// 生命周期
  onLoad() {
    console.log('page onLoad')
  },
  onReady() {
    console.log('page onReady')
  },
  // onShow 出现的比onReady要早
  onShow() {
    console.log('page show')
  },
  onHide() {
    console.log('page hide')
  },
  onUnload() {
    console.log('page unload')
  }
```

#### 组件的生命周期

beforeCreate
created
mounted
destoryed

#### uview ui组件库

##### 请求

originalData: false, // 是否在拦截器中返回服务端的原始数据[默认为false 需要修改为true 否则非200的响应会在响应拦截之前被内部处理掉 导致外部无法处理]
