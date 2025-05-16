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
  nameFiltered: '',
  isFirstRenderOnHome: true,
  isLoading: false,
  infoDataNet: {
    start: '0',
    limit: '10',
  },
  metaDataNet: undefined,
  cryptoList: [],
  cryptoListWithFilter: [],
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
    const {
      setIsLoading,
      infoDataNet,
      cryptoList,
      setIsFirstRenderOnHome,
      setCryptoListWithFilter,
    } = get();
    setIsLoading(true);
    try {
      const apiService = new CryptoServices();
      const res = await new GetCryptoList(apiService).execute({
        start: params.start,
        limit: params.limit,
      });

      const {data, info} = res;

      set({
        cryptoList: !params.start
          ? data.map(CryptoUi.fromNetModel)
          : [...cryptoList, ...data.map(CryptoUi.fromNetModel)],
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
      setCryptoListWithFilter();
    } catch (error) {
      console.error('Error fetching crypto list:', error);
    } finally {
      setIsLoading(false);
      if (setIsFirstRenderOnHome) {
        setIsFirstRenderOnHome(false);
      }
    }
  },
  async getSingleCrypto(id: string) {
    const {setIsLoading, clearSingleCrypto} = get();
    setIsLoading(true);
    try {
      const apiService = new CryptoServices();
      const res = await new GetCryptoById(apiService).execute(id);
      const crypto = CryptoUi.fromNetModelById(res[0]);
      set({singleCrypto: crypto});
    } catch (error) {
      console.error('Error fetching single crypto:', error);
      clearSingleCrypto();
    } finally {
      setIsLoading(false);
    }
  },
  clearSingleCrypto: () => set({singleCrypto: null}),
  setFilterName: (name: string) => set({nameFiltered: name}),
  setCryptoListWithFilter: () => {
    const {cryptoList, nameFiltered} = get();

    if (!nameFiltered || nameFiltered.length === 0) {
      set({cryptoListWithFilter: cryptoList});
      return;
    } else {
      //insensitive search and filter
      const filteredList = cryptoList.filter(crypto =>
        crypto.name.toLowerCase().includes(nameFiltered.toLowerCase()),
      );
      set({cryptoListWithFilter: filteredList});
      return;
    }
  },
}));
