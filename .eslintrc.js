module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    // Desabilitar a regra "eslintno-confusing-arrow"
    'no-confusing-arrow': 'off',

    // Desabilitar a regra "eslintimplicit-arrow-linebreak"
    'implicit-arrow-linebreak': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'eslintno-undef': 'off',
  },
};
