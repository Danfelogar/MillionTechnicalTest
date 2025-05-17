import {cryptoApi} from '../../../shared';
import {CryptoByIdNet, CryptoNetParams, CryptoNetRes} from '../model';

/**
 * CryptoServices class provides methods to fetch cryptocurrency data from the API.
 */
export class CryptoServices {
  /**
   * Fetches a list of cryptocurrencies with pagination parameters.
   *
   * @param {CryptoNetParams} params - Object containing start index and limit for pagination.
   * @returns {Promise<CryptoNetRes>} Promise resolving to the list of cryptocurrencies.
   * @throws Throws an error if the API call fails.
   */
  async getCryptos({
    start = '0',
    limit = '10',
  }: CryptoNetParams): Promise<CryptoNetRes> {
    const queryParams = new URLSearchParams();

    queryParams.append('start', start);
    queryParams.append('limit', limit);

    try {
      const res = await cryptoApi.get<CryptoNetRes>(`/tickers/?${queryParams}`);
      return res.data;
    } catch (error) {
      console.error('getCryptos issues:', {error});
      throw new Error(`${error}`);
    }
  }

  /**
   * Fetches detailed cryptocurrency data by its unique ID.
   *
   * @param {string} id - The ID of the cryptocurrency to fetch.
   * @returns {Promise<CryptoByIdNet[]>} Promise resolving to the cryptocurrency details.
   * @throws Throws an error if the API call fails.
   */
  async getCryptoById(id: string): Promise<CryptoByIdNet[]> {
    try {
      const res = await cryptoApi.get<CryptoByIdNet[]>(`/ticker/?id=${id}`);
      return res.data;
    } catch (error) {
      console.error('getCryptoById issues:', {error});
      throw new Error(`${error}`);
    }
  }
}
