module.exports = {
  preset: 'react-native',
  testEnvironment: 'jsdom',
  moduleDirectories: [
    'node_modules',
    'src/shared/__mocks__', // a utility folder
    __dirname, // the root directory
  ],
  moduleNameMapper: {
    // '^zustand$': '<rootDir>/src/shared/__mocks__/zustand.ts', // Mock zustand(update: this is recommended by zustand but for this project we are not using it)
    '@react-native-vector-icons/evil-icons':
      '<rootDir>/src/shared/__mocks__/EvilIconsMock.tsx', // Mock EvilIcons
  },
  setupFiles: [
    '<rootDir>/src/shared/__mocks__/globalMocks.ts', //file with global mocks
  ],
  setupFilesAfterEnv: ['<rootDir>/src/shared/__test__/setup-jest.ts'], // Setup file for Jest
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  //ignore modules with ECMAScript
  // jest.config.js
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|react-native-config|@react-navigation|zustand|@react-native-vector-icons)',
  ],
  // critical for not crashing on react-native
  modulePathIgnorePatterns: ['<rootDir>/src/shared/__mocks__'],
};
