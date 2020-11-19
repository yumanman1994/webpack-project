module.exports = {
  // 指定解析器
  parser: 'babel-eslint',
  // 继承 airbnb 配置
  extends: ['eslint-config-airbnb', 'prettier'],
  plugins: ['react', 'prettier', 'react-hooks'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': 'error',
    indent: ['error', 2, { SwitchCase: 1 }],
    'guard-for-in': 'off',
    'global-require': 'off',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'no-unused-expressions': [
      'error',
      {
        allowTernary: true,
        allowShortCircuit: true,
        allowTaggedTemplates: true,
      },
    ],
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-dynamic-require': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-shadow': 'off',
    'no-console': 'off',
    'no-continue': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
    'linebreak-style': ['error', 'unix'],
    'jsx-a11y/alt-text': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/destructuring-assignment': 'off',
    // '@typescript-eslint/camelcase': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    // '@typescript-eslint/no-var-requires': 'off',
    // '@typescript-eslint/no-empty-function': 'off',
    // '@typescript-eslint/no-empty-interface': 'off',
    // '@typescript-eslint/interface-name-prefix': 'off',
    // '@typescript-eslint/triple-slash-reference': 'off',
    // '@typescript-eslint/no-triple-slash-reference': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/explicit-member-accessibility': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/no-use-before-define': [
    //   'error',
    //   {
    //     variables: false,
    //     functions: false,
    //   },
    // ],
    // '@typescript-eslint/no-unused-vars': [
    //   'error',
    //   {
    //     vars: 'all',
    //     args: 'after-used',
    //     ignoreRestSiblings: true,
    //   },
    // ],
  },
};
