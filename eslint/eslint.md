# Eslint

### 配置文件
```js
module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-var': 'error',
  },
  // plugins: ["import"]
};

```

### 忽略文件
.eslintignore