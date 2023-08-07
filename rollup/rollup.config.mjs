import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/index.js',
      format: 'es',
      name: 'vec_utils',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(), // 解析TypeScript
    nodeResolve(), // 查找和打包node_modules中的第三方模块
    commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    babel({ babelHelpers: 'bundled' }), // babel配置,编译es6
  ],
};
