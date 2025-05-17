import {CryptoNetParams, CryptoNetRes} from '../model';
import {CryptoServices} from '../services';

/**
 * GetCryptoList use case class to fetch a list of cryptocurrencies with optional parameters.
 */
export class GetCryptoList {
  constructor(private apiService: CryptoServices) {}

  /**
   * Executes the use case to get a list of cryptocurrencies.
   *
   * @param {CryptoNetParams} params - Parameters to control pagination like start and limit.
   * @returns {Promise<CryptoNetRes>} Promise resolving to the list of cryptocurrencies.
   */
  async execute(params: CryptoNetParams): Promise<CryptoNetRes> {
    const res = await this.apiService.getCryptos(params);
    return res;
  }
}
