module.exports = {
    env: {
      node: true,
      es2021: true,
      jest: true,  // Ajoute jest pour éviter les erreurs dans les tests
    },
    extends: [
      'eslint:recommended',
      'plugin:jest/recommended',
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-console': 'off',  // Ajoute d'autres règles si nécessaire
    },
  };
  