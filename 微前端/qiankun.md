#### 主应用
1. 安装qiankun
```shell
pnpm add -D qiankun --filter base
```
2. 注册子应用的位置
```ts
import { registerMicroApps, start } from 'qiankun';

// 直接注册微应用
registerMicroApps([
  {
    name: 'reactWeb', // 必须与 Vite 中 name 完全一致
    entry: '//localhost:9801/main.js', // 明确指定 umd 文件
    container: '#web', // 应用挂载的地方 在主应用中的DOM
    activeRule: '/web',
    // 启用严格沙箱模式
    props: {
      sandbox: {
        strictStyleIsolation: true,
        experimentalStyleIsolation: true,
      },
    },
  },
]);

start({
  prefetch: true,
  singular: false,
  sandbox: {
    experimentalStyleIsolation: true,
  },
});
```

#### 微应用
##### vite工具
1. 安装vite-plugin-qiankun-lite
```shell
pnpm add -D vite-plugin-qiankun-lite --filter app
```
2. 修改vite.config.ts
```ts
import { defineConfig } from 'vite';
import qiankun from 'vite-plugin-qiankun-lite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    qiankun({ name: 'VueWeb', sandbox: true }), // 这里的name需要保持跟registerMicroApps的一致
  ],
  server: {
    port: 9802,
    cors: true,
    origin: '*',
  },
});

```
3. 修改应用的入口文件
```ts
import { createApp, type App } from 'vue';
import './style.css';
import AppComp from './App.vue';

let app: App;
const render = (props: any = {}) => {
  console.log('props.container', props.container);
  const container = props?.container ? props.container : document.getElementById('app');
  app = createApp(AppComp);
  app.mount(container);
};

console.log('window.__POWERED_BY_QIANKUN__', window.__POWERED_BY_QIANKUN__);
if (!window.__POWERED_BY_QIANKUN__) {
  render(); // 作为独立应用启动时
}

export async function bootstrap() {
  console.log('🚀 ~ bootstrap ~ bootstrap:');
}

export async function mount(props: any) {
  console.log('🚀 ~ mount ~ mount:', props);
  render(props); // qiankun的生命周期
}

export async function unmount(props: any) {
  console.log('🚀 ~ unmount ~ unmount:', props);
  app.unmount();
}

// export async function update(props: any) {
//   console.log('🚀 ~ unmount ~ unmount:', props);
//   console.log('update root', root);
// }
```

<!-- 学习要点 -->
一、微前端核心设计原理​
1. ​应用隔离机制​
•
​JS 沙箱​：

•
​原理​：通过重写 window对象的属性（如 addEventListener、setInterval）和代理全局变量（如 document、localStorage），实现子应用间的 JavaScript 隔离。

•
​实现方式​：

•
​快照沙箱​：子应用挂载时保存全局状态快照，卸载时恢复（适合单实例子应用）。

•
​Proxy 沙箱​：通过 ES6 Proxy 动态隔离多个子应用的全局变量（多实例场景）。

•
​学习重点​：阅读 qiankun 的 Sandbox模块源码，理解如何拦截和还原全局副作用。

•
​CSS 隔离​：

•
​动态样式表加载/卸载​：子应用切换时动态插入或移除 <style>标签。

•
​Shadow DOM 与 Scoped CSS​：深入浏览器原生隔离机制的实现差异。

2. ​应用加载与通信​
•
​HTML Entry 原理​：

•
qiankun 通过解析子应用的 HTML 入口文件，动态加载 JS/CSS 资源（而非直接使用 JS Entry）。

•
学习如何通过 fetch和 DOMParser解析 HTML，识别资源依赖并按需加载。

•
​子应用通信（EventBus/SharedState）​​：

•
​设计模式​：观察者模式（globalState）、发布订阅模式（initGlobalState）。

•
​跨应用数据同步​：如何安全共享数据（如 localStorage的命名空间隔离）。

3. ​路由与生命周期​
•
​路由劫持​：qiankun 如何通过重写 history.pushState实现主从应用路由同步。

•
​生命周期钩子​：bootstrap、mount、unmount的触发时机与设计意义（参考 single-spa规范）。

二、性能优化与高级场景​
1. ​资源加载优化​
•
​预加载子应用​：利用 prefetch提前加载子应用静态资源。

•
​按需加载​：结合 Webpack 的 魔法注释（/* webpackPrefetch: true */）或 Vite 的 动态导入。

2. ​依赖共享（Module Federation）​​
•
​原理​：通过 Webpack 5 的 ModuleFederationPlugin共享公共依赖（如 React、Vue），避免重复加载。

•
​与 qiankun 结合​：主应用和子应用如何协商依赖版本（如 shared: { react: { singleton: true } }）。

3. ​复杂场景设计​
•
​嵌套微前端​：子应用中再嵌套子应用（需处理路由冲突、沙箱嵌套）。

•
​跨技术栈组件调用​：React 子应用调用 Vue 组件的方案（如通过 Web Components桥接）。

三、底层技术与浏览器原理​
1. ​浏览器相关 API​
•
​Shadow DOM​：理解 attachShadow和样式隔离的局限性。

•
​Custom Events​：跨应用通信时如何利用 window.dispatchEvent。

•
​MutationObserver​：监听 DOM 变化以实现动态资源加载。

2. ​构建工具适配​
•
​Vite 插件开发​：如何为 qiankun 子应用定制 Vite 插件（如修改 base路径、处理 CSS 隔离）。

•
​Webpack 配置​：输出格式（umd/system）对微前端加载的影响。

四、安全与异常处理​
1. ​安全防护​
•
​XSS 防御​：子应用 HTML Entry 如何过滤恶意脚本。

•
​CSRF 防范​：主从应用共享 Cookie 时的安全策略。

2. ​错误隔离与降级​
•
​子应用崩溃防护​：如何通过 try-catch和 window.onerror防止单个子应用崩溃影响主应用。

•
​降级方案​：子应用加载失败时显示备用页面或回退到独立部署模式。

五、扩展学习与源码分析​
1. ​阅读 qiankun 源码​
•
​核心模块​：

•
src/sandbox：沙箱实现（快照/Proxy）。

•
src/loader：资源加载与 HTML Entry 解析。

•
src/start：路由劫持与生命周期管理。

•
​调试技巧​：通过 npm link本地调试 qiankun 源码。

2. ​对比其他微前端方案​
•
​single-spa​：理解 qiankun 的“上层框架”定位（single-spa 的增强版）。

•
​Module Federation​：Webpack 5 的微模块化方案与 qiankun 的差异。

•
​无界/EMP​：其他国产微前端框架的设计思路。

六、实践建议​
1.
​动手实现一个简易微前端框架​：

•
尝试用 200 行代码实现基本的沙箱、资源加载和生命周期管理。

2.
​性能监控​：

•
使用 window.performance测量子应用加载时间，优化关键路径。

3.
​复杂场景模拟​：

•
设计一个主应用（React）嵌套 Vue/Angular 子应用，并实现跨技术栈状态共享。一、微前端核心设计原理​
1. ​应用隔离机制​
•
​JS 沙箱​：

•
​原理​：通过重写 window对象的属性（如 addEventListener、setInterval）和代理全局变量（如 document、localStorage），实现子应用间的 JavaScript 隔离。

•
​实现方式​：

•
​快照沙箱​：子应用挂载时保存全局状态快照，卸载时恢复（适合单实例子应用）。

•
​Proxy 沙箱​：通过 ES6 Proxy 动态隔离多个子应用的全局变量（多实例场景）。

•
​学习重点​：阅读 qiankun 的 Sandbox模块源码，理解如何拦截和还原全局副作用。

•
​CSS 隔离​：

•
​动态样式表加载/卸载​：子应用切换时动态插入或移除 <style>标签。

•
​Shadow DOM 与 Scoped CSS​：深入浏览器原生隔离机制的实现差异。

2. ​应用加载与通信​
•
​HTML Entry 原理​：

•
qiankun 通过解析子应用的 HTML 入口文件，动态加载 JS/CSS 资源（而非直接使用 JS Entry）。

•
学习如何通过 fetch和 DOMParser解析 HTML，识别资源依赖并按需加载。

•
​子应用通信（EventBus/SharedState）​​：

•
​设计模式​：观察者模式（globalState）、发布订阅模式（initGlobalState）。

•
​跨应用数据同步​：如何安全共享数据（如 localStorage的命名空间隔离）。

3. ​路由与生命周期​
•
​路由劫持​：qiankun 如何通过重写 history.pushState实现主从应用路由同步。

•
​生命周期钩子​：bootstrap、mount、unmount的触发时机与设计意义（参考 single-spa规范）。

二、性能优化与高级场景​
1. ​资源加载优化​
•
​预加载子应用​：利用 prefetch提前加载子应用静态资源。

•
​按需加载​：结合 Webpack 的 魔法注释（/* webpackPrefetch: true */）或 Vite 的 动态导入。

2. ​依赖共享（Module Federation）​​
•
​原理​：通过 Webpack 5 的 ModuleFederationPlugin共享公共依赖（如 React、Vue），避免重复加载。

•
​与 qiankun 结合​：主应用和子应用如何协商依赖版本（如 shared: { react: { singleton: true } }）。

3. ​复杂场景设计​
•
​嵌套微前端​：子应用中再嵌套子应用（需处理路由冲突、沙箱嵌套）。

•
​跨技术栈组件调用​：React 子应用调用 Vue 组件的方案（如通过 Web Components桥接）。

三、底层技术与浏览器原理​
1. ​浏览器相关 API​
•
​Shadow DOM​：理解 attachShadow和样式隔离的局限性。

•
​Custom Events​：跨应用通信时如何利用 window.dispatchEvent。

•
​MutationObserver​：监听 DOM 变化以实现动态资源加载。

2. ​构建工具适配​
•
​Vite 插件开发​：如何为 qiankun 子应用定制 Vite 插件（如修改 base路径、处理 CSS 隔离）。

•
​Webpack 配置​：输出格式（umd/system）对微前端加载的影响。

四、安全与异常处理​
1. ​安全防护​
•
​XSS 防御​：子应用 HTML Entry 如何过滤恶意脚本。

•
​CSRF 防范​：主从应用共享 Cookie 时的安全策略。

2. ​错误隔离与降级​
•
​子应用崩溃防护​：如何通过 try-catch和 window.onerror防止单个子应用崩溃影响主应用。

•
​降级方案​：子应用加载失败时显示备用页面或回退到独立部署模式。

五、扩展学习与源码分析​
1. ​阅读 qiankun 源码​
•
​核心模块​：

•
src/sandbox：沙箱实现（快照/Proxy）。

•
src/loader：资源加载与 HTML Entry 解析。

•
src/start：路由劫持与生命周期管理。

•
​调试技巧​：通过 npm link本地调试 qiankun 源码。

2. ​对比其他微前端方案​
•
​single-spa​：理解 qiankun 的“上层框架”定位（single-spa 的增强版）。

•
​Module Federation​：Webpack 5 的微模块化方案与 qiankun 的差异。

•
​无界/EMP​：其他国产微前端框架的设计思路。

六、实践建议​
1.
​动手实现一个简易微前端框架​：

•
尝试用 200 行代码实现基本的沙箱、资源加载和生命周期管理。

2.
​性能监控​：

•
使用 window.performance测量子应用加载时间，优化关键路径。

3.
​复杂场景模拟​：

•
设计一个主应用（React）嵌套 Vue/Angular 子应用，并实现跨技术栈状态共享。