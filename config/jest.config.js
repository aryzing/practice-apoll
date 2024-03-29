module.exports = {
  moduleNameMapper: {
    // eslint-disable-next-line prettier/prettier
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':'<rootDir>/__mocks__/fileMock.ts',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.ts',
  },
  setupFilesAfterEnv: ['./config/jest.config.testingLibraryJestDom.ts'],
  rootDir: '../',
};
