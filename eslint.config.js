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
    arrowParens: 'always',
  }),
  /**
   * javascript 规则
   */
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'no-undef': 'error',
      'semi': 'off',
      'no-console': 'warn',
      'no-unused-vars': [
        'warn',
        {
          //  仅检查是否使用了本地声明的变量，但允许未使用全局变量。
          vars: 'local',
          //  将不检查最后使用的参数之前出现的未使用的位置参数，但将检查最后使用的参数之后的所有命名参数和所有位置参数
          args: 'after-used',
        },
      ],
      ...eslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      // ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  /**
   * 全局配置
   */
  {
    languageOptions: {
      globals: {
        ...globals.browser,

        /** 追加一些其他自定义全局规则 */
        wx: true,
        ecmaFeatures: { jsx: true }
      },
      
    },
  },
]
