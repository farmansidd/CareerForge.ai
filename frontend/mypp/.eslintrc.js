module.exports = {
  extends: ['react-app', 'react-app/jest'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parserOptions: {
        project: ['D:\\Final project\\frontend\\mypp\\tsconfig.json'],
        createDefaultProgram: true,
      },
      rules: {
        // Add any TypeScript-specific rules here if needed
      },
    },
  ],
};