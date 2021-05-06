const OFF = 0;
// const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  globals: {
    NodeJS: true,
    require: true,
    process: true,
    $request: true,
    $message: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      },
      typescript: {},
    },
    // 自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  plugins: ['react', 'unicorn', 'promise', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'] }],
    // 去除src下项目文件中，import 引入文件时，没加文件后缀提醒
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-use-before-define': 'off', // 关闭文件中引入 React，但未使用 React 的报错
    'react/jsx-props-no-spreading': 'off', // 关闭使用扩展运算符 ... 时导致的报错
    '@typescript-eslint/no-use-before-define': 'off', // 去除项目中引入 React，未使用 React 的报错
    '@typescript-eslint/no-var-requires': OFF, // 关闭webpack.commont.js中,文件顶部（类似 “const path = require('path')”） 中 require 的报错
    'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }], // 关闭webpack.commont.js中,文件顶部（类似 “const path = require('path')”） 中 require 的报错
    'global-require': OFF, // 关闭webpack.commont.js中，plugins中（类似 ”require('postcss-flexbugs-fixes')“）使用 require 的报错。
    '@typescript-eslint/explicit-module-boundary-types': OFF, // 关闭src下项目文件中，使用函数的报错
    'react/prop-types': OFF, // 关闭类型校验
    'no-console': OFF, // 关闭 console 警告
    'unicorn/prevent-abbreviations': OFF, // 关闭src下项目中，变量的强制行规则命名
    '@typescript-eslint/no-explicit-any': OFF, // 关闭ts 中设置any类型 提醒
    'react-hooks/exhaustive-deps': 0, // 关闭react hook中，useEffect 中使用空数组依赖
    'no-restricted-syntax': 0,
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: false, // 项目下文件名为驼峰格式
        },
      },
    ],

    // 待测试
    'no-unused-vars': [2, { vars: 'all', args: 'none' }], // 不能有声明后未被使用的变量或参数
    'import/prefer-default-export': OFF, // 关闭 export 导出单个文件的报错
  },
};
