import {cryptoApi} from '../../../shared';
import {CryptoByIdRes, CryptoNetParams, CryptoNetRes} from '../model';

export class CryptoServices {
  async getCryptos({
    start = '0',
    limit = '10',
  }: CryptoNetParams): Promise<CryptoNetRes> {
    const queryParams = new URLSearchParams();

    queryParams.append('start', start);
    queryParams.append('start', limit);

    try {
      const res = await cryptoApi.get<CryptoNetRes>(`/tickers/?${queryParams}`);
      return res.data;
    } catch (error) {
      console.error('getCryptos issues:', {error});
      throw new Error(`${error}`);
    }
  }

  async getCryptoById(id: string): Promise<CryptoByIdRes> {
    try {
      const res = await cryptoApi.get<CryptoByIdRes>(`/ticker/?id=${id}`);
      return res.data;
    } catch (error) {
      console.error('getCryptos issues:', {error});
      throw new Error(`${error}`);
    }
  }
}
