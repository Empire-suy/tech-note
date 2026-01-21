# three.js

#### 问题
1. alphaMap 材质遮挡问题
```ts
// 解决方案
// 1. alphaTest (可能有部分区域没有处理好)
material.alphaTest = 0.001;

// 2.depthTest 可看到后面的内容 需要注意使用场景
material.depthTest = false;

// 3. depthWrite
material.depthWrite = false;
material.blending = THREE.AdditiveBlending;
```

#### shadow优化
```ts
```

#### light优化
```ts
```

#### shadow
##### 依赖
```shell
npm i vite-plugin-glsl --save-dev # 解析shader文件

# 添加插件
import glsl from 'vite-plugin-glsl';

defineConfig({
  plugins: [glsl()]
})

# 类型声明
/// <reference types="vite-plugin-glsl/ext" />

# 使用像普通的文件那样导入
```
##### 创建
```ts
```
