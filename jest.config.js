module.exports = {
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
      statements: 75,
      branches: 75,
      functions: 75,
      lines: 75,
    },
  },
};
