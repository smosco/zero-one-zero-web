const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './src/' });

const jestConfig = createJestConfig({
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
});

module.exports = jestConfig;
