import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import jsx from 'acorn-jsx';
import postcss from 'rollup-plugin-postcss';

const overrides = {
  compilerOptions: {
    noUnusedParameters: true,
    noUnusedLocals: true,
    strictNullChecks: true,
    moduleResolution: 'node',
    declaration: false, //抽离声明代码 *.d.js
    allowSyntheticDefaultImports: true,
    // 输出多个格式的时候会保存，使用tsc进行类型创建或者输出多个config
    declarationDir: undefined,
  },
};

export default {
  input: 'src/index.ts',
  acornInjectPlugins: [jsx()],
  plugins: [
    resolve(),
    postcss({
      extract: true, // 独立导出css文件 ，使用组件时需要单独引入
      namedExports: true,
      minimize: true,
      modules: true,
      extensions: ['.less', '.css'],
    }), // 处理css、less 文件
    commonjs(),
    typescript({ jsx: 'preserve', ...overrides }),
    babel({
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'],
    }),
  ],
  external: ['react', 'react-dom'],
  output: [
    // {
    //   dir: 'dist/umd/',
    //   format: 'umd',
    //   globals: {
    //     react: 'React',
    //   },
    //   name: '_vec',
    //   plugins: [
    //     getBabelOutputPlugin({
    //       presets: ['@babel/preset-env'],
    //       allowAllFormats: true,
    //     }),
    //   ],
    // },
    {
      dir: 'dist/es/',
      format: 'es',
      globals: {
        react: 'React',
      },
      sourcemap: true,
      plugins: [
        getBabelOutputPlugin({
          presets: ['@babel/preset-env'],
          allowAllFormats: true,
        }),
      ],
    },
  ],
};
