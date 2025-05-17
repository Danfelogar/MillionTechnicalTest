import {
  CRYPTO_LIST_MOCK,
  MOCK_API_INFO,
  MockCryptoApiRes,
} from '../../../../shared/__mocks__';
import {CryptoServices} from '../../services';

jest.mock('../../../../shared/api', () => ({
  cryptoApi: {
    get: jest.fn((url: string) => MockCryptoApiRes.get(url)),
  },
}));

describe('Testing getCryptoList.ts', () => {
  const service = new CryptoServices();

  test('should return a list of cryptocurrencies', async () => {
    const result = await service.getCryptos({start: '0', limit: '10'});

    expect(result.data).toEqual(CRYPTO_LIST_MOCK);
    expect(result.info).toEqual(MOCK_API_INFO);
  });

  test('should throw an error for unexpected query', async () => {
    await expect(service.getCryptos({start: '999'})).rejects.toThrow(
      'Unexpected error',
    );
  });
});
