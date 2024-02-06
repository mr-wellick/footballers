export default {
  testEnvironment: 'node',
  collectCoverageFrom: [
    '**/src/**/*',
    '!**/src/create-db.js',
    '!**/src/server.js',
    '!**/src/footballers/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/test-setup-db.js'],
  coverageThreshold: {
    global: {
      statements: 65,
      branches: 65,
      functions: 65,
      lines: 65,
    },
  },
};
