## webpack
#### 使用浏览器调试
运行命令之后在浏览器打开【不需要任何的地址】既可以看到一个node的图标，点击就可以查看debug的详情

```json
{
  "script": {
    "debug": "node --inspect-brk ./node_modules/webpack-cli/bin/cli.js --config ./webpack.config.js"
    // inspect 调试模式
    // brk 首行断点
  }
}
```

#### 在vscode调试
创建在debug的选项下创建一个launch.json
```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "debugger",
      "stopOnEntry": true,
      "console": "integratedTerminal", // 输出的控制台 internalConsole integratedTerminal
      "program": "${workspaceFolder}/node_modules/webpack/bin/webpack.js", // 要执行的文件
      "args": [
          "--config",
          "./webpack.config.js"
      ],
      "env": {
          "NODE_ENV": "development"
      }
    }
  ]
}
```