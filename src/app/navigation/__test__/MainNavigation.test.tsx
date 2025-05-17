import {render, screen} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationMain} from '../MainNavigation';

jest.useFakeTimers();

// Mock the API calls
jest.mock('../../../features/crypto/services/cryptoServices.ts', () => ({
  getCryptos: jest.fn(() => Promise.resolve([])),
}));

jest.mock('../../../features/crypto/screens/HomeScreen.tsx', () => ({
  HomeScreen: () => null,
}));
jest.mock('../../../features/crypto/screens/DetailsScreen.tsx', () => ({
  DetailsScreen: () => null,
}));

describe('testing MainNavigation.tsx', () => {
  test('should render without crashing', async () => {
    const {unmount} = render(
      <NavigationContainer>
        <NavigationMain />
      </NavigationContainer>,
    );

    const mainNavigatorWrapper = screen.getByTestId('main-navigator-wrapper');
    expect(mainNavigatorWrapper).toBeTruthy();
    unmount();
  });
});
