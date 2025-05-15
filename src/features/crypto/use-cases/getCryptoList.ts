import {CryptoNetParams, CryptoNetRes} from '../model';
import {CryptoServices} from '../services';

export class GetCryptoList {
  constructor(private apiService: CryptoServices) {}

  async execute(params: CryptoNetParams): Promise<CryptoNetRes> {
    const res = await this.apiService.getCryptos(params);
    return res;
  }
}
