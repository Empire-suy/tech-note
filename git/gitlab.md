## gitlab
### 步骤

1. 依赖安装
```shell
apt-get install curl openssh-server ca-certificates postfix
```

2. 查找合适的版本 复制到shell中
```shell
https://packages.gitlab.com/gitlab/gitlab-ce

wget --content-disposition https://packages.gitlab.com/gitlab/gitlab-ce/packages/ubuntu/focal/gitlab-ce_17.7.0-ce.0_amd64.deb/download.deb

# 执行安装
dpkg -i gitlab-ce.deb
```
3. 配置
```shell
vim /etc/gitlab/gitlab.rb

# 如果需要提供给外面访问external_url 需要配置成域名或者ip地址的形式

gitlab-ctl reconfigure

# 如果遇到lock的问题
rm /var/lib/dpkg/lock*
```

4. 初始密码
```shell
cat /etc/gitlab/initial_root_password
```

## gitlab-runner
### 步骤
1. 安装
```shell
# arch 为amd64 arm64
curl -LJO "https://s3.dualstack.us-east-1.amazonaws.com/gitlab-runner-downloads/latest/deb/gitlab-runner_${arch}.deb"
```

注意！！在wsl下需要安装docker，并且在使用的时候需要将docker保持启动的状态

### gitlab-ci.yml
配置的时候gitlab和gitlab-runner需要配置为ip可以访问的

```shell
# gitlab配置文件
/etc/gitlab/gitlab.rb

# gitlab-runner文件
/etc/gitlab-runner/config.toml
```
