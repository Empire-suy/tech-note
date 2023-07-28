# 名称:
- 英文：gcm
- 中文名：git账号管理

解决的问题: 多个git的账号管理

## 目前的需求
- 可以配置不同的git [同一个域下不同的账号，不同的域]
- 全局修改

### 技术栈
vite vue3 electron element-plus

### 界面的设计

- 一个配置的信息的表格 [数据保存在一个text的文件内]
```shell
alias
host:username:userEmail # 需要注意这些信息的格式
sshKey

alias2
...
```
- 

#### 目前的问题
1. 怎么在node下修改系统的配置文件

##### 方案
使用代理的方式 在用户提交的时候进行拦截
目前考虑到的命令是 fetch, pull, push 比较麻烦，可能别的软件在操作的时候会有点问题

直接修改系统的配置，直接暴力
