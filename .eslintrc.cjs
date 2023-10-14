/* eslint-disable */
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', 'react-refresh'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'newline-before-return': 'error',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    'react/jsx-curly-spacing': 'warn',
    'react/jsx-equals-spacing': 'warn',
    'react/jsx-wrap-multilines': 'warn',
    'react-refresh/only-export-components': 'warn',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'import/order': 'error',
    'import/extensions': [
      'error',
      {
        '.ts': 'never',
        '.tsx': 'never',
        '.css': 'always',
        '.json': 'always',
      },
    ],
  },
}
