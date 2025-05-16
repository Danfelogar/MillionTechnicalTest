import {CryptoByIdNet} from '../model';
import {CryptoServices} from '../services';

export class GetCryptoById {
  constructor(private apiService: CryptoServices) {}

  async execute(id: string): Promise<CryptoByIdNet[]> {
    const res = await this.apiService.getCryptoById(id);
    return res;
  }
}
