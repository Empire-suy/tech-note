## manjaro

#### 基本配置
[镜像源配置](https://www.51cto.com/article/659897.html)

[安装中文输入法](https://www.truenasscale.com/2022/05/05/1051.html)
> 1. 安装fcitx5
> <br >sudo pacman -S fcitx5 fcitx5-configtool fcitx5-qt fcitx5-gtk fcitx5-chinese-addons fcitx5-material-color
> 2. 修改~/etc/environment
> ```shell
> GTK_IM_MODULE=fcitx
> QT_IM_MODULE=fcitx
> XMODIFIERS=@im=fcitx
> SDL_IM_MODULE=fcitx
> GLFW_IM_MODULE=ibus
> ```
> 3. 修改~/.xprofile
> ```shell
> fcitx5 &
> ```

1. [安装v2raya](https://v2raya.org/docs/prologue/quick-start/)
#### 安装chrome
```sh
sudo yay -S google-chrome
```
  
#### 安装vscode
```sh
yay -S visual-studio-code-bin
```

#### 安装wps
```sh
yay -S wps-office-cn
```

##### 安装deb包
```sh
sudo debtap -Q xxx.deb
sudo pacman -U xxx # 刚转出来的包 安装的位置在 /opt/apps/
# 起别名
sudo vim ~/.zshrc # 全局命令
alias order="nohup sh xxx &"
source ~/.zshrc
```