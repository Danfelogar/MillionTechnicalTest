import {
  MockCryptoApiRes,
  SINGLE_CRYPTO_MOCK,
} from '../../../../shared/__mocks__';
import {CryptoServices} from '../../services';

jest.mock('../../../../shared/api', () => ({
  cryptoApi: {
    get: jest.fn((url: string) => MockCryptoApiRes.get(url)),
  },
}));

describe('Testing getCryptoById.ts', () => {
  const service = new CryptoServices();

  test('should return a single cryptocurrency by id', async () => {
    const result = await service.getCryptoById('1');

    expect(result).toEqual(SINGLE_CRYPTO_MOCK);
  });

  test('should throw an error for unexpected id', async () => {
    await expect(service.getCryptoById('999')).rejects.toThrow(
      'Crypto not found',
    );
  });
});
