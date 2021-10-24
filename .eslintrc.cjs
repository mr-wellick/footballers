module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'google',
    'plugin:import/errors',
    'prettier',
    'plugin:jest/recommended',
  ],
  plugins: ['import', 'jest'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    'quotes': ['warn', 'single'],
    'semi': ['error', 'always'],
    'no-console': 'off',
  },
};
