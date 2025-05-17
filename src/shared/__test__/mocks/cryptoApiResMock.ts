import {CryptoByIdNet, CryptoNet, CryptoResInfo} from '../../../features';

export const CRYPTO_LIST_MOCK: CryptoNet[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    nameid: 'bitcoin',
    rank: 1,
    price_usd: '50000',
    percent_change_24h: '5',
    percent_change_1h: '0.5',
    percent_change_7d: '10',
    price_btc: '1',
    market_cap_usd: '1000000000',
    volume24: 500000000,
    volume24a: 500000000,
    csupply: '21000000',
    tsupply: '21000000',
    msupply: '21000000',
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    nameid: 'ethereum',
    rank: 2,
    price_usd: '3000',
    percent_change_24h: '3',
    percent_change_1h: '0.2',
    percent_change_7d: '7',
    price_btc: '0.06',
    market_cap_usd: '400000000',
    volume24: 250000000,
    volume24a: 200000000,
    csupply: '120000000',
    tsupply: '120000000',
    msupply: '120000000',
  },
  {
    id: '3',
    symbol: 'BNB',
    name: 'Binance Coin',
    nameid: 'binance-coin',
    rank: 3,
    price_usd: '400',
    percent_change_24h: '2',
    percent_change_1h: '0.1',
    percent_change_7d: '5',
    price_btc: '0.008',
    market_cap_usd: '60000000',
    volume24: 15000000,
    volume24a: 14000000,
    csupply: '150000000',
    tsupply: '170532785',
    msupply: '170532785',
  },
  {
    id: '4',
    symbol: 'XRP',
    name: 'XRP',
    nameid: 'ripple',
    rank: 4,
    price_usd: '1.2',
    percent_change_24h: '1.5',
    percent_change_1h: '0.05',
    percent_change_7d: '3.5',
    price_btc: '0.000024',
    market_cap_usd: '55000000',
    volume24: 12000000,
    volume24a: 11000000,
    csupply: '45404028977',
    tsupply: '99991841593',
    msupply: '100000000000',
  },
];

export const SINGLE_CRYPTO_MOCK: CryptoByIdNet[] = [
  {
    ...CRYPTO_LIST_MOCK[0],
    volume24_native: 500000000,
  },
];

export const MOCK_API_INFO: CryptoResInfo = {
  coins_num: 100,
  time: Date.now(),
};

export const MockCryptoApiRes = {
  get: async <T>(url: string): Promise<{data: T}> => {
    await new Promise(resolve => setTimeout(resolve, 100));

    // error case in getCryptoList
    if (url.includes('start=999')) {
      throw new Error('Unexpected error');
    }

    // success case in getCryptoList
    if (url.startsWith('/tickers')) {
      return {
        data: {
          data: CRYPTO_LIST_MOCK,
          info: MOCK_API_INFO,
        } as T,
      };
    }

    // getCryptoById
    if (url.startsWith('/ticker')) {
      const id = new URLSearchParams(url.split('?')[1]).get('id');
      //success case in getCryptoById
      if (id === '1') {
        return {data: SINGLE_CRYPTO_MOCK as T};
      }
      //error case in getCryptoById
      throw new Error('Crypto not found');
    }

    //generic error case without mock
    throw new Error(`Endpoint not mocked: ${url}`);
  },
};
