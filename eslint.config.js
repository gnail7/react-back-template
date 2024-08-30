import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "no-undef": "error",
      "semi": "error",
      'prettier/prettier': 'warn',
      'no-unused-vars': [
      'warn',
      {
        //  仅检查是否使用了本地声明的变量，但允许未使用全局变量。
        vars: 'local',
        //  将不检查最后使用的参数之前出现的未使用的位置参数，但将检查最后使用的参数之后的所有命名参数和所有位置参数
        args: 'after-used',
      },
    ],
      // 禁止重复模块导入
      'no-duplicate-imports': 'error',
      // 禁止在定义变量之前使用变量
      // 'no-use-before-define': ['error', { functions: false }],
      // 默认参数应在最后
      'default-param-last': 'warn',
      // 一个方法默认不超过50行
      'max-lines-per-function': [
        'error',
        {
          // 忽略空行
          skipBlankLines: true,
          // 忽略注释
          skipComments: true,
        },
      ],
      // 强制回调嵌套不超过三层
      'max-nested-callbacks': ['warn', { max: 3 }],
      // 强制嵌套不超过四层
      'max-depth': 'warn',
      // 禁止使用console
      'no-console': 'warn',
      // 禁止在代码块里面声明与外面变量名相同的变量
      'no-shadow': 'off',
      // 不允许将导入、导出和解构的分配重命名为相同的名称
      'no-useless-rename': 'error',
      // 需要 let 或 const 而不是 var
      'no-var': 'warn',
      // 要求在文件末尾换行
      'eol-last': ['error', 'always'],
      // 要求尽可能使用单引号
      quotes: ['warn', 'single'],
      // 要求在立即执行函数周围加上括号
      'wrap-iife': ['warn', 'inside', { functionPrototypeMethods: true }],
      // 控制语句强制大括号
      curly: ['error'],
    },
  },
]
