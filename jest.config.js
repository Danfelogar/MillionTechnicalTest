module.exports = {
  preset: 'react-native',
  testEnvironment: 'jsdom',
  moduleDirectories: [
    'node_modules',
    'src/shared/__test__', // a utility folder
    __dirname, // the root directory
  ],
  moduleNameMapper: {
    // '^zustand$': '<rootDir>/src/shared/__test__/mocks/zustand.ts', // Mock zustand(update: this is recommended by zustand but for this project we are not using it)
    '@react-native-vector-icons/evil-icons':
      '<rootDir>/src/shared/__test__/mocks/EvilIconsMock.tsx', // Mock EvilIcons
  },
  setupFilesAfterEnv: ['<rootDir>/src/shared/__test__/setup-jest.ts'], // Setup file for Jest
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  //ignore modules with ECMAScript
  // jest.config.js
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|react-native-config|@react-navigation|zustand|@react-native-vector-icons)',
  ],
};
