import {CryptoByIdNet} from '../model';
import {CryptoServices} from '../services';

/**
 * GetCryptoById use case class to fetch cryptocurrency details by ID.
 */
export class GetCryptoById {
  constructor(private apiService: CryptoServices) {}

  /**
   * Executes the use case to get cryptocurrency details by its ID.
   *
   * @param {string} id - The unique identifier of the cryptocurrency.
   * @returns {Promise<CryptoByIdNet[]>} Promise resolving to the cryptocurrency details.
   */
  async execute(id: string): Promise<CryptoByIdNet[]> {
    const res = await this.apiService.getCryptoById(id);
    return res;
  }
}
