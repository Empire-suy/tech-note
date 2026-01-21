### SSE

#### 前端实现
1. EventSource
```js

```

2. fetch

##### webpack导致无法实时响应的问题
1. 关掉gzip
```js
devServer {
  compress: false
}
```
2. 手动修改代理


#### 后端代码
```js
const express = require('express');
const app = express();

app.set()
```
