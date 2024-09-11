// eslint.config.js
import eslint from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import stylistic from '@stylistic/eslint-plugin'

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'public',
    ],
  },
  eslint.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
    braceStyle: '1tbs',
    arrowParens: 'false',
  }),
  /**
   * javascript 规则
   */
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'no-undef': 'warn',
      'semi': 'off',
      'no-console': 'warn',
      ...eslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      // ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/prop-types': 'off',
      'no-unused-vars': 'warn',
      'no-duplicate-imports': 'error',
      'default-param-last': 'warn',
      // 强制回调嵌套不超过三层
      'max-nested-callbacks': ['warn', { max: 3 }],
      // 强制嵌套不超过四层
      'max-depth': 'warn',
      // 禁止使用console
      // 禁止在代码块里面声明与外面变量名相同的变量
      'no-shadow': 'off',
      // 不允许将导入、导出和解构的分配重命名为相同的名称
      'no-useless-rename': 'error',
      // 需要 let 或 const 而不是 var
      'no-var': 'warn',
      // 要求在文件末尾换行
      'eol-last': ['error', 'always'],
      // 要求尽可能使用单引号
      // 要求在立即执行函数周围加上括号
      'wrap-iife': ['warn', 'inside', { functionPrototypeMethods: true }],
      // 控制语句强制大括号
    },
  },

  /**
   * 全局配置
   */
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,

        /** 追加一些其他自定义全局规则 */
        wx: true,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },

  },
]
