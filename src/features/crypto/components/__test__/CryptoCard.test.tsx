import {render, screen} from '@testing-library/react-native';
import {CryptoCard} from '../CryptoCard';
import {NavigationContainer} from '@react-navigation/native';
import {CRYPTO_ITEM_CARD_MOCK} from '../../../../shared/__mocks__';

describe('Testing CryptoCard.tsx component', () => {
  test('should find test id', async () => {
    render(
      <NavigationContainer>
        <CryptoCard item={CRYPTO_ITEM_CARD_MOCK} />
      </NavigationContainer>,
    );

    const stockItem = await screen.findByTestId('stock-item');
    expect(stockItem).toBeTruthy();
  });

  test('should show dynamic data ', async () => {
    render(
      <NavigationContainer>
        <CryptoCard item={CRYPTO_ITEM_CARD_MOCK} />
      </NavigationContainer>,
    );

    const stockName = await screen.findByText(CRYPTO_ITEM_CARD_MOCK.name);
    const stockCoin = await screen.findByText(
      CRYPTO_ITEM_CARD_MOCK.symbol.toUpperCase(),
    );
    const stockPercentChange1h = await screen.findByText(
      CRYPTO_ITEM_CARD_MOCK.formattedPercentChange1h,
    );
    expect(stockName).toBeTruthy();
    expect(stockCoin).toBeTruthy();
    expect(stockPercentChange1h).toBeTruthy();
  });
});
