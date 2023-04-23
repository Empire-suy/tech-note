## debugger

debugger webpack 项目
```js
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