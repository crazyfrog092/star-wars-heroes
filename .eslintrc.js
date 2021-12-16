module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:vue/vue3-recommended',
    'plugin:nuxt/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'max-len': ['off'],
    'vue/multi-word-component-names': ['off'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'import/extensions': ['off'],
    'import/no-unresolved': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    'no-param-reassign': ['off'],
  },
  settings: {
    'import/resolver': {
      nuxt: {
        extensions: ['.js', '.vue'],
      },
    },
  },
};
