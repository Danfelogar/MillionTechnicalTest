import {create} from 'zustand';
import {CryptoState, CryptoWithoutActions} from './interface';
import {
  CryptoNetParams,
  CryptoServices,
  CryptoUi,
  GetCryptoById,
  GetCryptoList,
} from '../../features';

const INITIAL_STATE: CryptoWithoutActions = {
  isFirstRenderOnHome: true,
  isLoading: false,
  infoDataNet: {
    start: '0',
    limit: '20',
  },
  metaDataNet: undefined,
  cryptoList: [],
  singleCrypto: null,
};

export const useCryptoState = create<CryptoState>((set, get) => ({
  ...INITIAL_STATE,
  //actions
  setIsFirstRenderOnHome: (val?: boolean) => {
    set({isFirstRenderOnHome: val ?? false});
  },
  setIsLoading: (val: boolean) => {
    set({isLoading: val});
  },
  getCryptoList: async (params: CryptoNetParams) => {
    const {setIsLoading, infoDataNet} = get();
    setIsLoading(true);
    try {
      const apiService = new CryptoServices();
      const res = await new GetCryptoList(apiService).execute({
        start: params.start,
        limit: params.limit,
      });

      const {data, info} = res;

      set({
        cryptoList: data.map(crypto => CryptoUi.fromNetModel(crypto)),
        metaDataNet: {
          coins_num: info.coins_num,
          time: info.time,
        },
        infoDataNet: {
          start: params.start ?? infoDataNet.start,
          limit: params.limit ?? infoDataNet.limit,
        },
        maxNumOfPages: Math.ceil(
          info.coins_num /
            parseInt(params.limit ?? String(infoDataNet.limit), 10),
        ),
      });
    } catch (error) {
      console.error('Error fetching crypto list:', error);
    } finally {
      setIsLoading(false);
    }
  },
  async getSingleCrypto(id: string) {
    const {setIsLoading, clearSingleCrypto} = get();
    setIsLoading(true);
    try {
      const apiService = new CryptoServices();
      const res = await new GetCryptoById(apiService).execute(id);
      const crypto = CryptoUi.fromNetModelById(res.data[0]);
      set({singleCrypto: crypto});
    } catch (error) {
      console.error('Error fetching single crypto:', error);
      clearSingleCrypto();
    } finally {
      setIsLoading(false);
    }
  },
  clearSingleCrypto: () => set({singleCrypto: null}),
}));
