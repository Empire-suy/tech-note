# NPM

## 搭建本地仓库

### Verdaccio

```shell
安装
npm install --global verdaccio
# 默认配置文件 C:\Users\Empire-suy\AppData\Roaming\verdaccio\config.yaml

# 启动
verdaccio

# 创建用户
npm adduser --registry http://localhost:4873/

# 测试账号 vector pwd: vector

# 发布版本
npm publish --registry http://localhost:4873/

# 从远端删除版本
# 如果是有人在用的包使用 deprecate

npm unpublish --registry http://localhost:4873/
```

### node 版本管理工具
#### fnm

保存数据的位置`C:\Users\Empire-suy\AppData\Roaming\fnm`

