import '@testing-library/jest-dom';
//settings for react-native-navigation
import 'react-native-gesture-handler/jestSetup';

// Include this section for mocking react-native-reanimated
import {setUpTests} from 'react-native-reanimated';

setUpTests();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});
