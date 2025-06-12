import {render, screen} from '@testing-library/react-native';
import {DetailsScreen} from '../DetailsScreen';
import {ReactNode} from 'react';

jest.mock('../../hooks/useSingleCrypyo.ts', () => ({
  useSingleCrypto: jest.fn().mockReturnValue({
    isLoading: false,
    singleCrypto: {name: 'Bitcoin', id: '1'},
    infoDetailsConfig: [],
    clearSingleCrypto: jest.fn(),
  }),
}));

jest.mock('../../../../shared', () => ({
  BrandWrapper: ({children}: {children: ReactNode}) => children,
  ButtonGeneric: () => null,
  CustomImage: () => null,
  heightFullScreen: 100,
  widthFullScreen: 100,
}));

describe('DetailsScreen', () => {
  const route = {
    params: {
      id: '1',
    },
  };
  const navigation = {
    goBack: jest.fn(),
  };

  test('should receive correct id param', () => {
    render(
      <DetailsScreen route={route as any} navigation={navigation as any} />,
    );
    const {useSingleCrypto} = require('../../hooks/useSingleCrypyo');
    expect(useSingleCrypto).toHaveBeenCalledWith({id: '1'});
  });

  test('should render loading indicator when isLoading is true', async () => {
    // Modificar el mock para este test específico
    const {useSingleCrypto} = require('../../hooks/useSingleCrypyo');
    useSingleCrypto.mockReturnValue({
      isLoading: true,
      singleCrypto: {name: 'Bitcoin', id: '1'},
      infoDetailsConfig: [],
      clearSingleCrypto: jest.fn(),
    });

    render(
      <DetailsScreen route={route as any} navigation={navigation as any} />,
    );
    expect(screen.getByTestId('loading-indicator-details-screen')).toBeTruthy();
  });
});
