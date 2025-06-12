import {NavigationContainer} from '@react-navigation/native';
import {render, screen} from '@testing-library/react-native';
import {CryptoListComponent} from '../CryptoListComponent';

jest.mock('../../hooks/useCryptos.ts', () => ({
  useCryptos: () => ({
    shouldFetchMore: true,
    filterByName: 'bitcoin', // Asegúrate que tenga longitud > 0
    cryptoListWithFilter: [],
    isLoading: false,
    getCryptoList: jest.fn(),
    handleAutoFetch: jest.fn(),
    clearFilterByName: jest.fn(),
  }),
}));

describe('Testing CryptoListComponent.tsx component', () => {
  test('should find test id', async () => {
    render(
      <NavigationContainer>
        <CryptoListComponent clearFilterByName={() => {}} />
      </NavigationContainer>,
    );

    const findId = screen.getByTestId('crypto-list-component');
    expect(findId).toBeTruthy();
    expect(findId.props.style).toEqual(
      expect.objectContaining({
        width: '100%',
        paddingTop: 10,
      }),
    );
  });

  test('should show footer when shouldFetchMore is true and filter is active', () => {
    render(
      <NavigationContainer>
        <CryptoListComponent clearFilterByName={() => {}} />
      </NavigationContainer>,
    );

    const activityIndicator = screen.queryByTestId('activity-indicator');
    expect(activityIndicator).toBeTruthy();
  });
});
