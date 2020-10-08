module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['**/src/**/*'],
  setupFilesAfterEnv: ['<rootDir>/test-setup-db.js'],
  coverageThreshold: {
    global: {
      statements: 8.57,
      branches: 0,
      functions: 0,
      lines: 0
    }
  }
};
