module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(tone|@tonejs)/)'
  ],
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.js'],
  setupFilesAfterEnv: ['./jest.setup.js']
};
